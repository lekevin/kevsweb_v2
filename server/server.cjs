const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

// app.method(path, handler)

// app.get("/now-playing", async (req, res) => {
//   res.json({ message: "test" });
// });

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
    const { data, status } = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (status === 204 || data === "") {
      return res.json({ is_playing: false });
    }

    res.json({
      is_playing: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a) => a.name).join(", "),
      album_art: data.item.album.images[0].url,
      spotify_url: data.item.external_urls.spotify,
    });
  } catch (err) {
    console.error("Spotify API error:", err.message);
    res.status(500).json({ error: "Failed to get current track" });
  }
});
