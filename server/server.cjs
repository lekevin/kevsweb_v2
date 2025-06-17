const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

const allowedOrigins = [
  'https://v2.lekevin.com',
  'https://randomname.herokuapp.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function refreshAccessToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.REFRESH_TOKEN,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}

app.get("/now-playing", async (req, res) => {
  try {
    const accessToken = await refreshAccessToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      }
    );

    if (response.status === 204 || !response.data || !response.data.item || response.data.is_playing === false) {
      const recent = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const lastPlayed = recent.data.items[0];

      return res.json({
        is_playing: false,
        last_played: true,
        title: lastPlayed.track.name,
        artist: lastPlayed.track.artists.map((a) => a.name).join(", "),
        album_art: lastPlayed.track.album.images[0].url,
        spotify_url: lastPlayed.track.external_urls.spotify,
        played_at: lastPlayed.played_at,
      });
    }

    const data = response.data;

    res.json({
      is_playing: true,
      last_played: false,
      title: data.item.name,
      artist: data.item.artists.map((a) => a.name).join(", "),
      album_art: data.item.album.images[0].url,
      spotify_url: data.item.external_urls.spotify,
    });
  } catch (err) {
    console.error("Spotify API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get current track" });
  }
});
