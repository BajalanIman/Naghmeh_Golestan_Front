const Mainworkshop = () => {
  return (
    <div className="bg-white flex flex-col md:h-80 px-6 sm:px-0 relative md:overflow-hidden">
      {/* DATE CARD */}
      <div
        className="
          w-full mr-24 mt-4
          h-56
          md:mt-0
          md:absolute md:top-0 md:left-24
          md:w-72 md:h-72

          rounded-lg bg-gray-700 shadow-black shadow-lg
          flex flex-col justify-center items-center
        "
      >
        <h1 className="text-[#F8D41B] font-sans text-sm md:text-xl">May</h1>

        <h1 className="text-[#F8D41B] font-sans font-bold text-4xl md:text-8xl">
          27
        </h1>

        <h1 className="text-[#F8D41B] font-sans text-sm md:text-xl">2026</h1>
      </div>

      {/* spacing only for desktop where absolute card overlaps */}
      <div className="hidden md:block h-24 md:h-1/6"></div>

      {/* CONTENT */}
      <div className="bg-[#F8D41B] flex flex-col md:flex-row flex-1">
        {/* left spacer only desktop */}
        <div className="hidden md:block md:w-1/3"></div>

        {/* text */}
        <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4 px-4 md:pr-8 pt-6 pb-6 lg:pb-0 md:pt-5">
          <h1 className="font-bold text-violet-900 text-xl md:text-2xl">
            The Hambach Festival
          </h1>

          <span className="text-violet-900 text-sm md:text-xl leading-relaxed">
            In an attempt to put the genie of reform and nationalism back into
            the bottle, the rulers of the various states of the German
            Confederation deployed a range of repressive measures – bans,
            censorship, spies and draconian punishments – to buttress their
            restored rule after the fall of Napoleon. [...]
          </span>

          <span className="text-violet-900 font-bold text-sm md:text-base">
            Continue reading
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mainworkshop;
