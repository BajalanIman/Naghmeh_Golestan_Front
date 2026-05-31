import { ExternalLink } from "lucide-react";

const Otherworkshops = ({ title, explanation, date, image }) => {
  return (
    <div className="lg:max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 hover:cursor-pointer hover:scale-105">
      <img
        className="xs:w-full sm:w-80 lg:w-full h-56"
        src={image}
        alt="Sunset in the mountains"
      />

      <div className="px-6 py-2">
        <div className="font-bold text-xl mb-2 text-violet-900">{title}</div>
        <p className="text-violet-900 text-base">{explanation}</p>
        <p className="text-violet-900 text-base mt-4">Date: {date}</p>
      </div>
      <div className="px-6 pt-2 pb-2 text-violet-900 flex gap-3">
        <span className=" font-bold">Continue reading</span>
        <ExternalLink />
      </div>
    </div>
  );
};
export default Otherworkshops;
