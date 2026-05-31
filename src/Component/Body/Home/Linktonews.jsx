import { SquareArrowOutUpRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Linktonews = () => {
  return (
    <Link to="/workshops">
      <div className="bg-[#740FD9] flex flex-col w-full py-4 px-6 lg:px-12">
        <p className="font-bold text-gray-200">Events</p>
        <div className="flex gap-2">
          <p className="text-gray-200">
            Read more about cultural events in Berlin!
          </p>
          <SquareArrowOutUpRightIcon className="text-gray-200 w-4" />
        </div>
      </div>
    </Link>
  );
};

export default Linktonews;
