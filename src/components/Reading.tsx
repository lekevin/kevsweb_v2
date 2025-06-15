const Reading = () => {
  return (
    <div className="w-full max-w-screen-md">
      <div className="flex flex-col min-w-[260px]">
        <div className="flex flex-wrap items-end gap-4">
          <div className=" text-zinc-400 opacity-55 font-semibold pr-5">
            Reading
          </div>
          <div className="flex gap-10 flex-wrap">
            {[
              { src: "src/assets/2wmorrie.jpg", alt: "Tuesdays with Morrie" },
              { src: "src/assets/meaninglife.jpg", alt: "The Meaning of Life" },
              { src: "src/assets/shape.jpg", alt: "The Shape of Design" },
            ].map((book, index) => (
              <div
                key={index}
                className="relative w-16 sm:w-20 overflow-visible"
              >
                <a href="#" target="_blank" className="group block w-full h-full">
                  <img
                    src={book.src}
                    alt={book.alt}
                    className="w-16 sm:w-20 h-full rounded hover:opacity-100 hover:scale-125 duration-300 hover:ring ring-zinc-500"
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
