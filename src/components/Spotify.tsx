import { useEffect, useState } from "react";

export default function NowPlaying() {
  type Track = {
    is_playing: boolean;
    title: string;
    artist: string;
    album_art: string;
    spotify_url: string;
    last_played: boolean;
    played_at: string;
  };

  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/now-playing")
      .then((res) => res.json())
      .then((data) => setTrack(data));
  }, []);

if (!track) {
  return <p className="text-white">Loading...</p>; // case: still fetching
}

if (track.is_playing) {
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-xl shadow-lg text-white max-w-md">
      <img src={track.album_art} alt="Album cover" className="w-16 h-16 rounded" />
      <div>
        <p className="text-sm text-zinc-400">Now Playing</p>
        <p className="text-lg font-semibold">{track.title}</p>
        <p className="text-sm text-zinc-300">{track.artist}</p>
        <a
          href={track.spotify_url}
          target="_blank"
          className="text-xs underline text-green-400"
        >
          Open in Spotify
        </a>
      </div>
    </div>
  );
}

if (track.last_played) {
  return (
    <div>
      <p className="text-white">Last played:</p>
      <p>{track.title} — {track.artist}</p>
      <p className="text-white">Played at: {track.played_at}</p>
    </div>
  );
}

// Fallback case
return <p className="text-white">Not playing anything right now.</p>;
}