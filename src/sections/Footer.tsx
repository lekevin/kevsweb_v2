const Footer = () => {
  const items = [
    [
      "Sketched in ",
      <a
        key="figma"
        href="https://www.figma.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-red-600 hover:opacity-80"
      >
        Figma
      </a>,
      ", brought to life in ",
      <a
        key="vscode"
        href="https://code.visualstudio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-red-600 hover:opacity-80"
      >
        Visual Studio Code
      </a>,
      ", and stitched together with care.",
      " Crafted with ",
      <a
        key="react"
        href="https://react.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-red-600 hover:opacity-80"
      >
        React
      </a>,
      ", ",
      <a
        key="vite"
        href="https://vite.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-red-600 hover:opacity-80"
      >
        Vite
      </a>,
      ", ",
      <a
        key="express"
        href="https://expressjs.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-red-600 hover:opacity-80"
      >
        Express
      </a>,
      ", and ",
      <a
        key="tailwind"
        href="https://tailwindcss.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-red-600 hover:opacity-80"
      >
        Tailwind CSS
      </a>,
      ", then deployed through ",
      <a
        key="heroku"
        href="https://heroku.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-red-600 hover:opacity-80"
      >
        Heroku
      </a>,
      ". ",
      "Typeset in ",
      <a
        key="montserrat"
        href="https://fonts.google.com/specimen/Montserrat"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-red-600 hover:opacity-80"
      >
        Montserrat
      </a>,
      ".",
    ],
  ];

  return (
    <footer className="w-full bg-customBlack text-center text-sm text-zinc-500 px-6 py-10">
      <div className="sm:w-[35vw] mx-auto opacity-60">
        {items.map((line, idx) => (
          <p key={idx} className="mb-2 last:mb-0">
            {line}
          </p>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
