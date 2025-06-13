const Reading = () => {
  return (
    <div className="w-full max-w-screen-md">
      <div className="flex sm:flex-row items-start sm:items-end gap-2">
        <div className="pr-5 whitespace-nowrap font-semibold pb-2 sm:pb-0">
          <p className="text-xl font-semibold text-zinc-600 py-3">Reading</p>
          <div className="flex gap-4">
            <img
              src="src/assets/2wmorrie.jpg"
              className="w-16 sm:w-20 h-auto rounded shadow-md"
            />
            <img
              src="src/assets/meaninglife.jpg"
              className="w-16 sm:w-20 h-auto rounded shadow-md"
            />
            <img
              src="src/assets/shape.jpg"
              className="w-16 sm:w-20 h-auto rounded shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reading;
