import { ExternalLink } from "lucide-react";
import React from "react";

const InfoBox = ({ bgcolor }) => {
  return (
    <div
      style={{ backgroundColor: bgcolor }}
      className={` w-full lg:w-[370px] h-[380px] pt-8 px-4 mb-8 lg:mb-0 rounded-md`}
    >
      <p className="text-3xl font-bold mb-8 text-[#740FD9]">Location</p>
      <div className="text-2xl text-[#740FD9] gap-1 flex flex-col">
        <p className="  ">Thhis is a sample text</p>
        <p className="text-2xl  text-[#740FD9]">Sample text</p>
        <p className="text-2xl  text-[#740FD9]">Thhis is a sample text</p>
        <p className="text-2xl  text-[#740FD9]">Sample text</p>
      </div>
      <div className="flex gap-3 mt-12">
        <p className="text-xl font-bold  text-[#740FD9] "> More details</p>
        <ExternalLink color="#740FD9" />
      </div>
    </div>
  );
};

export default InfoBox;
