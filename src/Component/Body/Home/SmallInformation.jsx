import React from "react";

const SmallInformation = ({ aboutUsTitle, aboutUsText }) => {
  return (
    <div className="px-6 lg:px-12 py-6 lg:py-12 w-full">
      <h1 className="text-3xl text-[#740FD9] font-bold mb-2">{aboutUsTitle}</h1>
      {/* <h1 className="text-3xl text-[#740FD9] font-bold mb-12"></h1> */}
      <h1 className="text-3xl text-[#740FD9] lg:w-2/3">{aboutUsText}</h1>
    </div>
  );
};

export default SmallInformation;
