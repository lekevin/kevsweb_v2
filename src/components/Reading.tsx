import tueswmorrie from "../assets/2wmorrie.jpg";
import meaninglife from "../assets/meaninglife.jpg";
import shape from "../assets/shape.jpg";

const Reading = () => {
  const books = [
    {
      src: tueswmorrie,
      alt: "Tuesdays with Morrie",
      href: "https://morrieandme.com/inspiration/tuesdays-with-morrie/",
    },
    {
      src: meaninglife,
      alt: "The Meaning of Life",
      href: "https://www.theschooloflife.com/shop/tsol-press-the-meaning-of-life/",
    },
    {
      src: shape,
      alt: "The Shape of Design",
      href: "https://shapeofdesignbook.com",
    },
  ];

  return (
    <div className="w-full max-w-screen-md">
      <div className="flex flex-col min-w-[260px]">
        <div className="flex flex-wrap items-end gap-4">
          <div className="text-zinc-400 opacity-55 font-semibold pr-5">
            Reading
          </div>

          <div className="flex flex-wrap gap-10">
            {books.map(({ src, alt, href }, index) => (
              <div key={index} className="relative w-16 sm:w-20 overflow-visible">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full h-full"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="w-16 sm:w-20 h-full rounded hover:opacity-100 hover:scale-110 duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reading;
