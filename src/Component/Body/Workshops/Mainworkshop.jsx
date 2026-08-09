import { Link } from "react-router-dom";

const Mainworkshop = ({
  workshop,
  HomepageMainWorkshopTitle,
  HomepageMainWorkshopText,
  ContinueReading,
}) => {
  const workshopDate = workshop?.date ? new Date(workshop.date) : null;

  const month = workshopDate
    ? workshopDate.toLocaleString("en", {
        month: "long",
      })
    : "";

  const day = workshopDate ? workshopDate.getDate() : "";

  const year = workshopDate ? workshopDate.getFullYear() : "";

  const title = workshop?.title || HomepageMainWorkshopTitle;

  const text = workshop?.explanation || HomepageMainWorkshopText || "";

  const targetUrl = workshop?.slug
    ? `/workshops/${workshop.slug}`
    : "/workshops";

  return (
    <div className="bg-[#F1EFEE] flex flex-col md:h-80 px-6 sm:px-0 relative md:overflow-hidden">
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
          src={
            workshop?.image ||
            "https://res.cloudinary.com/r4pnipqe/image/upload/v1785709866/About_us_3_de8kau.png"
          }
          className="w-full h-full object-cover rounded-t-lg lg:rounded-lg"
          alt={title}
        />

        <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

        <div className="absolute inset-0 w-full h-full flex justify-center items-center flex-col text-[#ECEAD3]">
          <h1 className="font-sans text-sm md:text-xl">{month}</h1>

          <h1 className="font-sans font-bold text-4xl md:text-8xl">{day}</h1>

          <h1 className="font-sans text-sm md:text-xl">{year}</h1>
        </div>
      </div>

      <div className="hidden md:block h-24 md:h-1/6"></div>

      {/* CONTENT */}
      <div className="text-[#ECEAD3] bg-[#1B6269] flex flex-col md:flex-row flex-1">
        <div className="hidden md:block md:w-1/3"></div>

        <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4 px-4 md:pr-8 pt-6 pb-6 lg:pb-0 md:pt-5">
          <h1 className="font-bold text-xl md:text-2xl">{title}</h1>

          <span className="text-sm md:text-xl leading-relaxed">
            {text.length > 400 ? `${text.slice(0, 400)}...` : text}
          </span>

          <Link to={targetUrl}>
            <span className="font-bold text-sm md:text-base hover:underline">
              {ContinueReading}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mainworkshop;
