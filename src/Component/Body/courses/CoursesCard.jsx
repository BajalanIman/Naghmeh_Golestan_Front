import { Link } from "react-router-dom";
import { CalendarClock, HandCoins } from "lucide-react";

const CoursesCard = ({
  id,
  slug,
  title,
  explanation,
  date,
  image,
  price,
  currency,
  isFree,
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString()
    : "Date not available";

  const formattedPrice = isFree
    ? "Free"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "EUR",
      }).format(Number(price || 0));

  return (
    <Link to={`/courses/${slug || id}`}>
      <div className="lg:max-w-sm overflow-hidden rounded-xl hover:cursor-pointer">
        <div className="relative">
          <div className="absolute w-full sm:w-80 lg:w-full h-full bg-black rounded-xl opacity-40 flex justify-center items-center"></div>

          <img
            className="w-full sm:w-80 lg:w-full h-56 rounded-xl object-cover"
            src={image}
            alt={title || "Course"}
          />

          <p className="absolute top-24 left-6 text-xl font-bold text-white">
            {title || "Course"}
          </p>
        </div>

        <div className="py-2 text-gray-900">
          <p className="text-base font-bold">
            {explanation?.length > 100
              ? `${explanation.slice(0, 100)}...`
              : explanation}
          </p>
        </div>

        <div className="flex flex-col">
          <div className="text-violet-900 flex flex-row gap-1">
            <CalendarClock className="w-3" />

            <span className="text-xs pt-1">{formattedDate}</span>
          </div>

          <div className="text-red-900 flex flex-row gap-1 pb-4">
            <HandCoins className="w-5 mt-1" />

            <span className="text-sm pt-1 font-bold">{formattedPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoursesCard;
