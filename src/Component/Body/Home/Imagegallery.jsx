import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React, { useState } from "react";

const images = [
  "https://picsum.photos/id/1015/800/500",
  "https://picsum.photos/id/1016/800/500",
  "https://picsum.photos/id/1018/800/500",
  "https://picsum.photos/id/1020/800/500",
  "https://picsum.photos/id/1024/800/500",
  "https://picsum.photos/id/1025/800/500",
  "https://picsum.photos/id/1031/800/500",
  "https://picsum.photos/id/1033/800/500",
];

function Imagegallery() {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-4 lg:h-screen bg-white relative">
      {/* Image */}
      <div className="relative w-[90%] lg:w-[80%] max-w-4xl">
        <img
          src={images[index]}
          alt="slider"
          className="w-full h-[500px] object-cover rounded-xl shadow-2xl transition-all duration-500"
        />

        {/* Left Button */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-3 rounded-full hover:bg-black"
        >
          <ArrowLeftFromLine />
        </button>

        {/* Right Button */}
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-3 rounded-full hover:bg-black"
        >
          <ArrowRightFromLine />
        </button>
        {/* Counter */}
        <div className="mt-[-5%] ml-5 absolute">
          <p className="text-yellow-500 font-bold">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Imagegallery;
