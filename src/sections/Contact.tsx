import { useState, useEffect } from "react";

const Contact = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-customBlack text-white flex flex-col items-center justify-start pb-20">
      <h2 className="text-4xl text-zinc-600">
        <span id="contact" className="text-red-600">
          C
        </span>
        ontact
      </h2>

      <div className="w-full max-w-[65vw] flex flex-col lg:flex-row lg:justify-between lg:gap-10 p-10">
        <form className="w-full lg:max-w-[50rem] space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">
              WHAT’S YOUR NAME?
            </label>
            <input
              type="text"
              className="w-full border-b border-zinc-500 bg-transparent py-2 text-white placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">
              WHAT’S YOUR EMAIL?
            </label>
            <input
              type="email"
              className="w-full border-b border-zinc-500 bg-transparent py-2 text-white placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">
              YOUR MESSAGE
            </label>
            <textarea
              rows={4}
              className="w-full border-b border-zinc-500 bg-transparent py-2 text-white resize-none placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-300 text-black font-semibold py-3 rounded-full hover:bg-zinc-400 transition"
          >
            SEND
          </button>
        </form>

        <div className="flex flex-col space-y-8 justify-center text-sm">
          <div>
            <h4 className="font-bold text-zinc-300 mb-1 pt-10">
              CONTACT DETAILS
            </h4>
            <a href="mailto:email@lekevin.com">
              <p className="text-zinc-400 hover:text-red-600">email@lekevin.com</p>
            </a>
          </div>
          <div>
            <h4 className="font-bold text-zinc-300 mb-1">LOCATION</h4>
            <p className="text-zinc-400">San Francisco, California</p>
            <p className="text-red-600">{time}</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-300 mb-1">LINKS</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#">Resume</a>
              </li>
              <li>
                <a
                  href="https://www.github.com/lekevin/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://www.linkedin.com/in/lekevinn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
