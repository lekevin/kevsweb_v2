import React from "react";

const works = [
  {
    title: "lekev.in",
    img: "src/assets/1.png",
    href: "https://v1.lekevin.com",
  },
  {
    title: "Google Keep",
    img: "src/assets/2.png",
    href: "https://google-keep-react-eight.vercel.app",
  },
  {
    title: "Inventory App",
    img: "src/assets/3.png",
    href: "#",
  },
];

const Works = () => {
  return (
    <div className="min-h-screen min-w-screen bg-customBlack flex flex-col text-zinc-600 tracking-wide font-normal items-center">
      <div className="font-base text-4xl mb-10">
        <span className="font-base text-red-600">W</span>orks
      </div>
      <div className="flex flex-wrap justify-center items-start lg:border-t-[1px]">
        {works.map((work, idx) => (
          <a
            key={idx}
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "group flex flex-col items-start space-y-2 pt-8",
              idx !== 0 && "lg:border-l lg:border-white lg:pl-8 lg:ml-8",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded overflow-hidden hover:border-red-900 transition-all">
              <img
                src={work.img}
                alt={work.title}
                className="object-cover w-full h-full group-hover:scale-105 duration-300"
              />
            </div>
            <p className="text-xl text-zinc-400 group-hover:text-white transition-all">
              {work.title}
            </p>
          </a>
        ))}
      </div>

      <a
        href="https://github.com/lekevin"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 opacity-70 hover:opacity-100 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
          className="hover:scale-110 transition-transform duration-300"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.52-3.88-1.52-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.72 1.27 3.38.97.1-.76.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.91-.39c.99 0 1.99.13 2.91.39 2.22-1.5 3.19-1.18 3.19-1.18.63 1.63.23 2.83.11 3.13.74.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.7.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A10.99 10.99 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
        </svg>
      </a>
    </div>
  );
};

export default Works;
