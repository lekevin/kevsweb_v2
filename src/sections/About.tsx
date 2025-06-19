import Experience from "../components/Experience";
import Education from "../components/Education";
import Currently from "../components/Currently";

const About = () => {
  return (
    <div
      id="about"
      className="min-h-dvh min-w-screen bg-customBlack flex flex-col text-zinc-600 tracking-wide font-normal items-center"
    >
      <div className="font-base text-4xl mb-10 pt-20">
        <span className="font-base text-red-600">A</span>bout
      </div>
      <div className=" w-[65vw]">
        <Experience />
        <Education />
        <Currently />
      </div>
    </div>
  );
};

export default About;
