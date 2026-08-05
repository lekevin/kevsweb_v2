/**
 * One-off helper to mint a Spotify refresh token.
 *
 *   1. Add http://127.0.0.1:8888/callback as a Redirect URI in your Spotify app
 *      dashboard (Settings -> Redirect URIs). Spotify rejects "localhost" here;
 *      it requires the explicit loopback IP.
 *   2. Put SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET in .env
 *   3. npm run spotify:token, then open the printed URL and approve.
 *
 * The refresh token it prints goes in .env as SPOTIFY_REFRESH_TOKEN.
 */
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env first.");
  process.exit(1);
}

const state = crypto.randomBytes(16).toString("hex");
const app = express();

app.get("/callback", async (req, res) => {
  if (req.query.error) {
    res.send(`Authorization failed: ${req.query.error}`);
    console.error("Authorization failed:", req.query.error);
    return process.exit(1);
  }

  if (req.query.state !== state) {
    res.send("State mismatch — start over.");
    console.error("State mismatch, aborting.");
    return process.exit(1);
  }

  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: REDIRECT_URI,
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

    res.send("Done — check your terminal, then close this tab.");
    console.log("\nAdd this to your .env:\n");
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    process.exit(0);
  } catch (err) {
    res.send("Token exchange failed — check your terminal.");
    console.error("Token exchange failed:", err.response?.data || err.message);
    process.exit(1);
  }
});

app.listen(PORT, () => {
  const url =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      state,
      // Force the consent screen so re-running always returns a fresh token.
      show_dialog: "true",
    }).toString();

  console.log("\nOpen this URL in your browser and approve access:\n");
  console.log(url + "\n");
});
