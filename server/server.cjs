const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || process.env.REFRESH_TOKEN;

const missingEnv = [
  ["SPOTIFY_CLIENT_ID", CLIENT_ID],
  ["SPOTIFY_CLIENT_SECRET", CLIENT_SECRET],
  ["SPOTIFY_REFRESH_TOKEN", REFRESH_TOKEN],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

const allowedOrigins = [
  "https://v2.lekevin.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.static(path.join(__dirname, "../dist")));

// Spotify access tokens live for an hour. Cache until just before expiry so a
// burst of page loads doesn't trip Spotify's rate limit on the token endpoint.
let cachedToken = null;
let cachedTokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < cachedTokenExpiresAt) {
    return cachedToken;
  }

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  cachedToken = response.data.access_token;
  cachedTokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000;

  return cachedToken;
}

function albumArt(album) {
  if (!album || !Array.isArray(album.images) || album.images.length === 0) {
    return null;
  }
  return album.images[0].url;
}

app.get("/now-playing", async (req, res) => {
  if (missingEnv.length > 0) {
    return res
      .status(500)
      .json({ error: `Missing environment variables: ${missingEnv.join(", ")}` });
  }

  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      }
    );

    if (response.status === 401) {
      // Token went stale mid-flight; drop the cache so the next call re-fetches.
      cachedToken = null;
      cachedTokenExpiresAt = 0;
    }

    const playing = response.data;
    const isActivelyPlayingATrack =
      response.status === 200 &&
      playing &&
      playing.is_playing === true &&
      playing.item &&
      playing.item.type === "track";

    if (isActivelyPlayingATrack) {
      return res.json({
        is_playing: true,
        last_played: false,
        title: playing.item.name,
        artist: playing.item.artists.map((a) => a.name).join(", "),
        album_art: albumArt(playing.item.album),
        spotify_url: playing.item.external_urls.spotify,
      });
    }

    const recent = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      }
    );

    if (recent.status !== 200) {
      console.error("Spotify recently-played error:", recent.status, recent.data);
      return res.status(502).json({ error: "Failed to get recently played" });
    }

    const lastPlayed = recent.data && recent.data.items && recent.data.items[0];

    if (!lastPlayed || !lastPlayed.track) {
      return res.json({ is_playing: false, last_played: false });
    }

    return res.json({
      is_playing: false,
      last_played: true,
      title: lastPlayed.track.name,
      artist: lastPlayed.track.artists.map((a) => a.name).join(", "),
      album_art: albumArt(lastPlayed.track.album),
      spotify_url: lastPlayed.track.external_urls.spotify,
      played_at: lastPlayed.played_at,
    });
  } catch (err) {
    const detail = err.response?.data;
    console.error("Spotify API error:", detail || err.message);

    // A revoked or scope-less refresh token is the usual culprit, and the
    // generic 500 hid it. Say so explicitly in the logs.
    if (detail && detail.error === "invalid_grant") {
      console.error(
        "Refresh token rejected by Spotify. Run `npm run spotify:token` to mint a new one."
      );
    }

    res.status(500).json({ error: "Failed to get current track" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (missingEnv.length > 0) {
    console.warn(
      `Spotify disabled — missing env vars: ${missingEnv.join(", ")}. ` +
        `Copy .env.example to .env and fill it in.`
    );
  }
});
