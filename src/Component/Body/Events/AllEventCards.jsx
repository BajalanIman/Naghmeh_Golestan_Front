import React from "react";
import { CalendarClock, MapPin } from "lucide-react";

const AllEventCards = ({ title, explanation, date, image, location }) => {
  return (
    <div className="lg:max-w-sm rounded overflow-hidden ">
      <img
        className="xs:w-full sm:w-80 lg:w-full h-56 hover:cursor-pointer hover:scale-105"
        src={image}
        alt="Sunset in the mountains"
      />

      <div className="py-2 text-violet-900">
        <div className="font-bold text-xl hover:cursor-pointer hover:underline">
          {title}
        </div>
        <p className=" text-xl">
          {explanation.length > 80
            ? explanation.slice(0, 80) + "..."
            : explanation}
        </p>
      </div>
      <div className="flex flex-col">
        <div className="text-violet-900 flex flex-row gap-1">
          <MapPin className="w-3" />
          <span className="text-xs pt-1">{location}</span>
        </div>
        <div className=" text-violet-900 flex flex-row gap-1 pb-4">
          <CalendarClock className="w-3" />
          <span className="text-xs pt-1">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default AllEventCards;
