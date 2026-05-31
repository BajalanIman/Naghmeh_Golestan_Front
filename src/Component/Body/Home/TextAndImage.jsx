import React from "react";

const TextAndImage = ({ text, image }) => {
  return (
    <div className="lg:px-12 lg:py-20 pt-6 px-6 py-10 flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center items-center bg-green-50">
      <p className="text-lg  tex-neutral-700  ">{text}</p>
      <img
        className="rounded-md shadow-lg shadow-black w-full lg:w-[500px] h-72"
        src={image}
        alt="founding"
      />
    </div>
  );
};

export default TextAndImage;
