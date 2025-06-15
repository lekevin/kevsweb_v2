import NowPlaying from "../components/Spotify";
import Reading from "../components/Reading";

const Currently = () => {
  return (
    <>
      <div className="text-3xl font-medium pt-5">
        Currently<span className="text-white font-semibold">.</span>
      </div>
      <div className="flex flex-wrap gap-8 items-end w-full max-w-screen-lg justify-between py-4 text-xl">
        <div className="flex flex-col min-w-[260px]">
          <NowPlaying />
        </div>
        <div>
          <Reading />
        </div>
      </div>
    </>
  );
};

export default Currently;
