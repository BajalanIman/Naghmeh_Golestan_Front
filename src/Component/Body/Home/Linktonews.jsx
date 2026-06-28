import { SquareArrowOutUpRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Linktonews = () => {
  return (
    <Link to="/workshops">
      <div className="bg-[#1B6269] text-[#ECEAD3] flex flex-col w-full py-4 px-6 lg:px-12">
        <p className="font-bold ">Events</p>
        <div className="flex gap-2">
          <p className="">Read more about cultural events in Berlin!</p>
          <SquareArrowOutUpRightIcon className=" w-4" />
        </div>
      </div>
    </Link>
  );
};

export default Linktonews;
