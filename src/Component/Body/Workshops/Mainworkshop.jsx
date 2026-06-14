import { Link } from "react-router-dom";
const Mainworkshop = ({
  HomepageMainWorkshopTitle,
  HomepageMainWorkshopText,
  ContinueReading,
}) => {
  return (
    <div className="bg-white flex flex-col md:h-80 px-6 sm:px-0 relative md:overflow-hidden">
      {/* DATE CARD */}
      <div
        className="
          relative
          lg:rounded-lg
          w-full mr-24 mt-4
          h-56
          md:mt-0
          md:absolute md:top-0 md:left-24
          md:w-72 md:h-72
           shadow-black lg:shadow-lg
        "
      >
        <img
          src="https://wallpaperaccess.com/full/1315404.jpg"
          className="w-full h-full object-cover rounded-t-lg lg:rounded-lg"
        />
        <div className="absolute inset-0 bg-black/50  rounded-lg"></div>
        <div className="absolute inset-0 w-full h-full flex justify-center items-center flex-col">
          <h1 className="text-[#ECEAD3] font-sans text-sm md:text-xl">May</h1>

          <h1 className="text-[#ECEAD3] font-sans font-bold text-4xl md:text-8xl">
            27
          </h1>

          <h1 className="text-[#ECEAD3] font-sans text-sm md:text-xl">2026</h1>
        </div>
      </div>

      {/* spacing only for desktop where absolute card overlaps */}
      <div className="hidden md:block h-24 md:h-1/6"></div>

      {/* CONTENT */}
      <div className="bg-[#ECEAD3] flex flex-col md:flex-row flex-1">
        {/* left spacer only desktop */}
        <div className="hidden md:block md:w-1/3"></div>

        {/* text */}
        <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4 px-4 md:pr-8 pt-6 pb-6 lg:pb-0 md:pt-5">
          <h1 className="font-bold text-violet-900 text-xl md:text-2xl">
            {HomepageMainWorkshopTitle}
          </h1>

          <span className="text-violet-900 text-sm md:text-xl leading-relaxed">
            {HomepageMainWorkshopText?.length > 400
              ? `${HomepageMainWorkshopText.slice(0, 400)}...`
              : HomepageMainWorkshopText}
          </span>
          <Link to="/workshops">
            <span className="text-violet-900 font-bold text-sm md:text-base">
              {ContinueReading}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mainworkshop;
