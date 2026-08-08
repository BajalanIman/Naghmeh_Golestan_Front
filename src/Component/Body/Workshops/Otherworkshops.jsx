import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Otherworkshops = ({
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
    <Link to={`/workshops/${slug || id}`}>
      <div className="lg:max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 text-[#1B6269] hover:cursor-pointer hover:scale-105">
        <img
          className="xs:w-full sm:w-80 lg:w-full h-56 object-cover"
          src={image}
          alt={title}
        />

        <div className="px-6 py-2">
          <div className="font-bold text-xl mb-2">{title}</div>

          <p className="text-base">
            {explanation?.length > 180
              ? `${explanation.slice(0, 180)}...`
              : explanation}
          </p>

          <p className="text-base mt-4">Date: {formattedDate}</p>

          <p className="text-base mt-2 font-semibold">
            Price: {formattedPrice}
          </p>
        </div>

        <div className="px-6 pt-2 pb-2 flex gap-3">
          <span className="font-bold">Continue reading</span>

          <ExternalLink />
        </div>
      </div>
    </Link>
  );
};

export default Otherworkshops;
