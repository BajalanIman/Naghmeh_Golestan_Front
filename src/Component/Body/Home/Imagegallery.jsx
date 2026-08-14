import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const images = [
  "https://res.cloudinary.com/r4pnipqe/image/upload/v1785175234/4_sxgewm.png",
  "https://res.cloudinary.com/r4pnipqe/image/upload/v1785175238/3_aqgh6l.png",
  "https://res.cloudinary.com/r4pnipqe/image/upload/v1785175237/1_t5pmeo.png",
  "https://res.cloudinary.com/r4pnipqe/image/upload/v1785175236/2_q5uoq7.png",
  "https://res.cloudinary.com/r4pnipqe/image/upload/v1785175235/5_aolh70.png",
];

function Imagegallery() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Automatically change the image every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Determine each image's position relative to the active image
  const getPosition = (imageIndex) => {
    let difference = imageIndex - index;

    if (difference > images.length / 2) {
      difference -= images.length;
    }

    if (difference < -images.length / 2) {
      difference += images.length;
    }

    return difference;
  };

  return (
    <section
      className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden py-10 lg:min-h-screen bg-red-600"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Image gallery"
    >
      {/* Images */}
      <div className="relative h-[360px] w-full max-w-6xl sm:h-[450px] lg:h-[450px]">
        {images.map((image, imageIndex) => {
          const position = getPosition(imageIndex);
          const isActive = position === 0;
          const isVisible = Math.abs(position) <= 1;

          return (
            <button
              key={image}
              type="button"
              onClick={() => setIndex(imageIndex)}
              tabIndex={isVisible ? 0 : -1}
              aria-label={`Show image ${imageIndex + 1}`}
              className={`
                absolute left-1/2 top-1/2 overflow-hidden rounded-2xl
                transition-all duration-700 ease-in-out
                ${
                  isActive
                    ? "h-[330px] w-[78%] sm:h-[420px] sm:w-[65%] lg:h-[420px] lg:w-[60%]"
                    : "h-[250px] w-[55%] sm:h-[330px] sm:w-[42%] lg:h-[330px] lg:w-[38%]"
                }
                ${isVisible ? "pointer-events-auto" : "pointer-events-none"}
              `}
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${position * 72}%)
                  scale(${isActive ? 1 : 0.82})
                `,
                opacity: isVisible ? (isActive ? 1 : 0.55) : 0,
                zIndex: isActive ? 20 : 10,
              }}
            >
              <img
                src={image}
                alt={`Gallery image ${imageIndex + 1}`}
                className="h-full w-full object-cover shadow-2xl"
              />

              {!isActive && <div className="absolute inset-0 bg-black/30" />}
            </button>
          );
        })}

        {/* Previous button */}
        <button
          type="button"
          onClick={prevImage}
          aria-label="Previous image"
          className="
            absolute left-3 top-1/2 z-30 -translate-y-1/2
          rounded-full bg-[#1B6269]/50 p-3 text-white
            transition-colors hover:bg-[#1B6269]/80
            sm:left-6
          "
        >
          <ChevronLeft />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={nextImage}
          aria-label="Next image"
          className="
            absolute right-3 top-1/2 z-30 -translate-y-1/2
            rounded-full bg-[#1B6269]/50 p-3 text-white
            transition-colors hover:bg-[#1B6269]/80
            sm:right-6
          "
        >
          <ChevronRight />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#1B6269]/50 px-4 py-2">
          <p className="font-bold text-white">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-5 flex gap-2">
        {images.map((_, imageIndex) => (
          <button
            key={imageIndex}
            type="button"
            onClick={() => setIndex(imageIndex)}
            aria-label={`Go to image ${imageIndex + 1}`}
            className={`
              h-2.5 rounded-full transition-all duration-300
              ${
                imageIndex === index
                  ? "w-8 bg-[#1B6269]"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}

export default Imagegallery;
