import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarClock,
  CircleDollarSign,
  HandCoins,
  MapPin,
} from "lucide-react";

const CoursesCard = ({ id, title, explanation, date, image }) => {
  return (
    <Link to={`/courses/${id}`}>
      <div className=" lg:max-w-sm  overflow-hidden rounded-xl  hover:cursor-pointer">
        <div className="relative">
          <div className="absolute w-full sm:w-80 lg:w-full h-full bg-black rounded-xl opacity-40 flex justify-center items-center"></div>

          <img
            className="w-full sm:w-80 lg:w-full h-56 rounded-xl object-cover"
            src={image}
            alt="Sunset in the mountains"
          />
          {title ? (
            <p className="absolute top-24 left-6 text-xl font-bold text-white">
              {title}
            </p>
          ) : (
            <p className="absolute top-24 left-6 text-xl font-bold text-white">
              Photography, City, and Memory
            </p>
          )}
        </div>

        <div className="py-2 text-gray-900">
          {explanation ? (
            <p className=" text-base font-bold">
              {explanation?.length > 100
                ? `${explanation.slice(0, 100)}...`
                : explanation}
            </p>
          ) : (
            <p className=" text-base font-bold">
              How do images tell stories? In this course, participants learn the
              fundamentals of ...
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <div className=" text-violet-900 flex flex-row gap-1 ">
            <CalendarClock className="w-3" />
            <span className="text-xs pt-1">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          <div className="text-red-900 flex flex-row gap-1 pb-4">
            <HandCoins className="w-5 mt-1" />
            <span className="text-sm pt-1 font-bold">
              {" "}
              59 € (for members 49 €)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoursesCard;
