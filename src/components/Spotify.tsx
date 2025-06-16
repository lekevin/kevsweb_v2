import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
    return (
      <div className="w-full max-w-screen-md mx-auto px-4">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-screen-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2">
        <div className="pr-5 whitespace-nowrap font-semibold pb-2 sm:pb-0">
          Listening to
        </div>
        <a
          href={track.spotify_url}
          target="_blank"
          className="shrink-0 rounded-xl hover:ring ring-zinc-700 hover:scale-105 duration-300"
        >
          {children}
        </a>
      </div>
    </div>
  );

  if (track.is_playing) {
    return (
      <Wrapper>
        <div className="relative p-2 bg-zinc-900 rounded-xl w-full overflow-hidden">
          <div className="flex items-center gap-4">
            <img
              src={track.album_art}
              className="w-16 h-16 border-4 rounded-lg border-zinc-800"
            />

            <div className="flex flex-col overflow-hidden w-full">
              <div className="flex items-center justify-start">
                <p className="text-sm text-zinc-400 pr-5">Now Playing:</p>
                <div className="flex items-end gap-[2px] h-4 w-4 shrink-0">
                  <span className="w-[3px] bg-green-400 animate-eq1 rounded-sm"></span>
                  <span className="w-[3px] bg-green-400 animate-eq2 rounded-sm"></span>
                  <span className="w-[3px] bg-green-400 animate-eq3 rounded-sm"></span>
                </div>
              </div>

              <p className="text-lg font-semibold text-zinc-300 truncate whitespace-nowrap overflow-hidden max-w-full">
                {track.title}
              </p>

              <p className="text-sm text-zinc-600 truncate max-w-full">
                {track.artist}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

if (track.last_played) {
  const fromNow = dayjs(track.played_at).fromNow();
  return (
    <Wrapper>
      <div className="relative p-2 bg-zinc-900 rounded-xl w-full overflow-hidden">
        <div className="flex items-center gap-4">
          <img
            src={track.album_art}
            className="w-16 h-16 border-4 rounded-lg border-zinc-800"
          />

          <div className="flex flex-col overflow-hidden w-full">
            <div className="flex items-center justify-start">
              <p className="text-sm text-zinc-400 pr-5">
                Played {fromNow}:
              </p>
              <div className="flex items-end gap-[2px] h-4 w-4 shrink-0 opacity-0">
                <span className="w-[3px] bg-green-400 animate-eq1 rounded-sm"></span>
                <span className="w-[3px] bg-green-400 animate-eq2 rounded-sm"></span>
                <span className="w-[3px] bg-green-400 animate-eq3 rounded-sm"></span>
              </div>
            </div>

            <p className="text-lg font-semibold text-zinc-300 truncate whitespace-nowrap overflow-hidden max-w-full">
              {track.title}
            </p>

            <p className="text-sm text-zinc-600 truncate max-w-full">
              {track.artist}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}


  return (
    <div className="w-full max-w-screen-md mx-auto px-4">
      <p className="text-white">Not playing anything right now.</p>
    </div>
  );
}
