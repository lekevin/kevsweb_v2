import NowPlaying from "../components/Spotify";
import Reading from "../components/Reading";

const Currently = () => {
  return (
    <>
      <div className="text-3xl font-medium pt-5 pb-10">
        Currently<span className="text-white font-semibold">.</span>
      </div>
      <div className="flex flex-col sm:flex-row text-xl justify-between">
        <NowPlaying />
        <Reading />
      </div>
    </>
  );
};

export default Currently;
