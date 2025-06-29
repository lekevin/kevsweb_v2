import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import cv from '../assets/cv.png';
import email from '../assets/email.png';
import heart from '../assets/heart.png';

const Hero = () => {
  return (
    <section id="home" className="min-h-dvh flex flex-col items-center justify-center text-white opacity-80 text-center relative pb-30 ">
      <div className="max-w-3xl sm:max-w-6xl sm:mt-24">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 pt-22 sm:pt-0">
          Hello, I’m Kevin
        </h1>

        <p className="sm:text-2xl leading-relaxed opacity-90 mb-8 px-6">
          Tech enthusiast and perpetual explorer of the spaces where design
          meets functionality. When not writing code, I’m reading about
          philosophy and psychology—fueled by caffeine and persistence, I’m
          constantly chasing ideas that light up both the terminal and the
          imagination.
        </p>

        <div className="w-[60vw] max-w-md mx-auto h-px bg-white/50 mb-4" />

        <div className="flex justify-center gap-[4vw] sm:gap-[2vw] text-xl">
          <a
            href="http://github.com/lekevin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={github}
              className="w-8 h-8 invert brightness-0 hover:opacity-70 hover:scale-95 transition-transform duration-500 cursor-pointer"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/lekevinn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedin}
              className="w-8 h-8 invert brightness-0 hover:opacity-70 hover:scale-95 transition-transform duration-500 cursor-pointer"
            />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <img
              src={cv}
              className="w-8 h-8 invert brightness-0 hover:opacity-70 hover:scale-95 transition-transform duration-500 cursor-pointer"
            />
          </a>
          <a href="mailto:email@lekevin.com">
            <img
              src={email}
              className="w-8 h-8 invert brightness-0 hover:opacity-70 hover:scale-95 transition-transform duration-500 cursor-pointer"
            />
          </a>
          <a
            href="https://medium.com/@aa.xien/the-purpose-of-life-is-to-experience-a224ce6f6a6c"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={heart}
              className="w-8 h-8 invert brightness-0 hover:opacity-70 hover:scale-95 transition-transform duration-500 hover: cursor-pointer"
            />
          </a>
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </a>
    </section>
  );
};

export default Hero;
