import { useState } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => setMenuMounted(false), 300);
    } else {
      setMenuMounted(true);
      setTimeout(() => setMenuOpen(true), 10);
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full text-white">
      <nav className="hidden sm:flex justify-center gap-8 font-medium text-lg tracking-wider opacity-80 pt-6">
        {["HOME", "ABOUT", "WORKS", "CONTACT"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="hover:scale-95 hover:opacity-70 transition-transform duration-300"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="sm:hidden absolute top-4 right-5 z-50">
        <button
          onClick={toggleMenu}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-md focus:outline-none opacity-60"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 origin-center ${
              menuOpen ? "translate-y-1" : "-translate-y-1"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 origin-center ${
              menuOpen ? "-translate-y-1" : "translate-y-1"
            }`}
          />
        </button>

        {menuMounted && (
          <nav
            className={`absolute top-full right-0 flex flex-col items-end px-5 transition-opacity duration-300 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {["Home", "About", "Works", "Contact"].map((label, idx) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className={`group relative inline-block uppercase origin-right py-2 will-change-[transform,opacity] animate-rollIn [animation-delay:${idx * 0.2}s]`}
                style={{ opacity: 0, transform: "rotateY(-90deg)" }}
              >
                <span className="text-medium font-medium tracking-wider block relative">
                  {label}
                  <span
                    className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"
                    aria-hidden="true"
                  />
                </span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
