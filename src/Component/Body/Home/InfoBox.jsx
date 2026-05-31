import { ExternalLink, MapPinPlus, NotepadText, UserRound } from "lucide-react";
import React from "react";

const InfoBox = ({ image }) => {
  return (
    <div className="relative w-full lg:w-[370px] h-[380px]  mb-8 lg:mb-0 rounded-md">
      <img src={image} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50 "></div>
      <div className="absolute inset-0 text-xl text-[#fafafa] gap-1 flex flex-col px-4 py-4">
        <p className="text-3xl font-bold mb-8 text-[#ECEAD3]">Course name</p>
        <p className="text-[#ECEAD3]">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et ....
        </p>
        <div className="flex mt-6 gap-2">
          <NotepadText className="w-4 h-4" />
          <p className="text-sm ">Start: 01.06.2026</p>
        </div>
        <div className="flex gap-2">
          <UserRound className="w-4 h-4" />
          <p className="text-sm">Lecturer: Naghmeh</p>
        </div>
        <div className="flex gap-2">
          <MapPinPlus className="w-4 h-4" />
          <p className="text-sm">Location: Pankow, Berlin</p>
        </div>
        <div className=" flex gap-3 mt-6">
          <p className="text-xl font-bold  text-[#ECEAD3]"> More details</p>
          <ExternalLink color="#ECEAD3" />
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
