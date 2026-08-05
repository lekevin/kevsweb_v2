# kevsweb_v2

Second iteration of my personal site — [lekevin.com](https://lekevin.com).

A React + Vite single-page site with a small Express server that proxies the
Spotify API, so the "Currently" section can show what I'm listening to without
exposing API credentials to the browser.

## Stack

| Layer    | Tech                                        |
| -------- | ------------------------------------------- |
| Frontend | React 19, TypeScript, Vite 6, Tailwind 4    |
| Backend  | Express 4 (serves `dist/` + `/now-playing`) |
| Hosting  | Heroku                                      |

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- A Spotify account and a registered app in the
  [Spotify developer dashboard](https://developer.spotify.com/dashboard)

## Getting started

```bash
npm install
```

Copy the environment template and fill in your Spotify credentials:

```bash
cp .env.example .env
```

`.env` is gitignored — never commit it.

### Spotify credentials

1. Create an app at
   [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard).
   Copy the **Client ID** and **Client Secret** into `.env`.
2. In the app's settings, add `http://127.0.0.1:8888/callback` under
   **Redirect URIs** and save. Spotify rejects `localhost` here — it requires
   the explicit loopback IP.
3. Mint a refresh token:

   ```bash
   npm run spotify:token
   ```

   Open the printed URL, approve access, and paste the resulting
   `SPOTIFY_REFRESH_TOKEN` into `.env`.

The token is requested with the `user-read-currently-playing` and
`user-read-recently-played` scopes. Both are required — the first reads the
active track, the second powers the "played X ago" fallback.

Refresh tokens do not expire on a timer, but they are revoked if you rotate the
client secret or remove the app from your Spotify account. When that happens,
re-run `npm run spotify:token`.

### Running locally

Local development needs both processes. In one terminal, start the API server:

```bash
npm start
```

In a second terminal, start Vite:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/now-playing`
to the Express server on port 3000 (configured in
[vite.config.ts](vite.config.ts)), so the frontend calls the same relative path
in development and production. Without that proxy, `/now-playing` would hit
Vite's SPA fallback and return `index.html` instead of JSON.

To preview a production build instead:

```bash
npm run build
```

Then `npm start` serves the built `dist/` from Express on
[http://localhost:3000](http://localhost:3000).

## Scripts

| Script                  | What it does                                      |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Vite dev server on port 5173 with HMR             |
| `npm start`             | Express server on port 3000 (API + built `dist/`) |
| `npm run build`         | Type-check and build to `dist/`                   |
| `npm run preview`       | Preview the built bundle via Vite                 |
| `npm run lint`          | ESLint over the repo                              |
| `npm run spotify:token` | OAuth helper to mint a Spotify refresh token      |

## Environment variables

| Variable                | Required | Notes                                      |
| ----------------------- | -------- | ------------------------------------------ |
| `SPOTIFY_CLIENT_ID`     | Yes      | From the Spotify developer dashboard       |
| `SPOTIFY_CLIENT_SECRET` | Yes      | From the Spotify developer dashboard       |
| `SPOTIFY_REFRESH_TOKEN` | Yes      | From `npm run spotify:token`               |
| `PORT`                  | No       | Defaults to 3000; Heroku sets this for you |

`SPOTIFY_REFRESH_TOKEN` is also accepted as `REFRESH_TOKEN` for backwards
compatibility with older deployments.

If any required variable is missing, the server still boots and serves the site.
It logs a warning at startup, and `/now-playing` returns a 500 naming the
missing variables rather than failing silently.

## API

### `GET /now-playing`

Returns the currently playing track, or the most recently played one if nothing
is active.

```jsonc
// actively playing
{
  "is_playing": true,
  "last_played": false,
  "title": "Track name",
  "artist": "Artist one, Artist two",
  "album_art": "https://i.scdn.co/image/...",
  "spotify_url": "https://open.spotify.com/track/..."
}
```

```jsonc
// nothing playing — falls back to recently played, adds played_at
{
  "is_playing": false,
  "last_played": true,
  "title": "Track name",
  "artist": "Artist name",
  "album_art": "https://i.scdn.co/image/...",
  "spotify_url": "https://open.spotify.com/track/...",
  "played_at": "2026-08-05T05:28:26.660Z"
}
```

When there is no listening history at all, both flags are `false` and no track
fields are present. `album_art` is `null` if Spotify returns no images. Only
tracks are reported — while a podcast episode or an ad is playing, the endpoint
falls back to the last played track.

Access tokens are cached in memory until a minute before they expire, so a burst
of page loads doesn't hammer Spotify's token endpoint. The frontend polls this
endpoint once a minute and renders `played_at` as relative time via dayjs.

## Deployment

Heroku builds via `heroku-postbuild` (which runs `npm run build`) and boots with
`npm start`. Set the Spotify variables on the app before deploying:

```bash
heroku config:set SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... SPOTIFY_REFRESH_TOKEN=...
```

CORS allows the production domains plus `localhost:5173` and `localhost:3000`
for development. New origins go in `allowedOrigins` in
[server/server.cjs](server/server.cjs).

## Troubleshooting

**"Not playing anything right now" when music is actually playing.** Check the
server logs. `invalid_grant` means the refresh token was revoked — re-run
`npm run spotify:token`. A `403` means the token is missing a required scope,
same fix.

**`/now-playing` returns HTML instead of JSON.** The Express server isn't
running, so Vite falls through to the SPA catch-all. Start it with `npm start`.

**The section is stuck on "Loading..."** The fetch never resolved. Check the
browser console and confirm the Express server is up on port 3000.
