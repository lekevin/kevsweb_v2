import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import github from "../assets/github.png";

const works = [
  {
    title: "MemeFinder",
    img: img1,
    href: "https://memefinder.lekevin.com",
  },
  {
    title: "Google Keep",
    img: img2,
    href: "https://google-keep-react-eight.vercel.app",
  },
  {
    title: "Slayssistant",
    img: img3,
    href: "https://slayssistant.lekevin.com",
  },
];

const Works = () => {
  return (
    <div id="works" className="min-w-screen bg-customBlack flex flex-col text-zinc-600 tracking-wide font-normal items-center pb-20 pt-10">
      <div className="font-base text-4xl mb-10">
        <span className="font-base text-red-600 pt-8">W</span>orks
      </div>
      <div className="flex flex-wrap justify-center items-start lg:border-t-[1px]">
        {works.map((work, index) => (
          <a
            key={index}
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            className=
              "group relative flex flex-col items-start space-y-2 pt-8 lg:pl-8 lg:ml-8"
            
          >
            {index !== 0 && (
              <span className="absolute top-6 bottom-6 -left-4 w-px bg-white opacity-50 hidden lg:block" />
            )}

            <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded transition-all">
              <img
                src={work.img}
                alt={work.title}
                className="object-cover w-full h-full group-hover:scale-105 duration-300"
              />
            </div>
            <p className="text-xl text-zinc-400 group-hover:text-white transition-all">
              {work.title}
            </p>
            <span className="absolute inset-x-0 bottom-0 h-[1px] bg-white origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </a>
        ))}
      </div>

      <a
        href="https://github.com/lekevin"
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-70 transition duration-300 pt-20 "
      >
        <img
          src={github}
          className="w-12 h-12 invert brightness-0 hover:opacity-70 hover:scale-95 transition-transform duration-500 cursor-pointer"
        />
      </a>
    </div>
  );
};

export default Works;
