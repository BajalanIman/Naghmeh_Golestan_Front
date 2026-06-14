import React from "react";

const TextAndImage = ({
  HomepageTextAndImageTitle,
  HomepageTextAndImageText,
  image,
}) => {
  return (
    <div className="lg:px-12 lg:py-20 pt-6 px-6 py-10 flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center items-center bg-green-50">
      <div>
        <p className="text-2xl font-bold mb-6  tex-neutral-700  ">
          {HomepageTextAndImageTitle}
        </p>
        <p className="text-lg  tex-neutral-700  ">{HomepageTextAndImageText}</p>
      </div>
      <img
        className="rounded-md shadow-lg shadow-black w-full lg:w-[500px] h-72"
        src={image}
        alt="founding"
      />
    </div>
  );
};

export default TextAndImage;
