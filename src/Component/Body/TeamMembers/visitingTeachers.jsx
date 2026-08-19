import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function VisitingTeachers({ title, visitingTeachers = [] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const teachersCount = visitingTeachers.length;
  const activeTeacher = visitingTeachers[index];

  const nextTeacher = () => {
    if (teachersCount === 0) return;

    setIndex((prev) => (prev + 1) % teachersCount);
  };

  const prevTeacher = () => {
    if (teachersCount === 0) return;

    setIndex((prev) => (prev - 1 + teachersCount) % teachersCount);
  };

  // Automatically change teacher every 7 seconds
  useEffect(() => {
    if (isPaused || teachersCount <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % teachersCount);
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused, teachersCount]);

  // Keep the index valid if the teachers list changes
  useEffect(() => {
    if (index >= teachersCount && teachersCount > 0) {
      setIndex(0);
    }
  }, [index, teachersCount]);

  if (!activeTeacher) return null;

  return (
    <section
      className="overflow-hidden py-12 lg:py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label={title}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-stone-900 md:text-4xl">
            {title}
          </h2>
        </div>

        {/* Active teacher */}
        <div className="relative">
          <article
            key={activeTeacher.id}
            className="
              flex min-h-[520px] flex-col items-center gap-10
              rounded-3xl border border-stone-200 bg-white
              p-6 shadow-xl transition-all duration-700
              md:p-10 lg:min-h-[460px] lg:flex-row lg:gap-14
              lg:p-14
            "
          >
            {/* Image */}
            <div className="flex w-full shrink-0 justify-center lg:w-2/5">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl" />

                <img
                  src={activeTeacher.image}
                  alt={activeTeacher.name}
                  className="
                    relative h-64 w-64 rounded-2xl object-cover
                    shadow-lg transition-all duration-700
                    md:h-72 md:w-72 lg:h-80 lg:w-80  border-[#1B6269] border-2
                  "
                />
              </div>
            </div>

            {/* Information */}
            <div className="w-full text-center lg:w-3/5 lg:text-left">
              {/* <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Visiting Teacher
              </p> */}

              <h3 className="text-2xl font-semibold text-stone-900 md:text-3xl">
                {activeTeacher.name}
              </h3>

              <p className="mt-3 text-lg font-medium text-amber-700 md:text-xl">
                {activeTeacher.role}
              </p>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-stone-600 lg:mx-0">
                {activeTeacher.bio}
              </p>

              {Array.isArray(activeTeacher.expertise) &&
                activeTeacher.expertise.length > 0 && (
                  <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                    {activeTeacher.expertise.map((item) => (
                      <span
                        key={item}
                        className="
                          rounded-full border border-stone-200 bg-stone-50
                          px-4 py-2 text-sm text-stone-700
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

              <div className="mx-auto mt-8 h-[2px] w-16 bg-amber-700/60 lg:mx-0" />
            </div>
          </article>

          {/* Previous button */}
          {teachersCount > 1 && (
            <button
              type="button"
              onClick={prevTeacher}
              aria-label="Previous teacher"
              className="
                absolute left-2 top-1/2 z-20 -translate-y-1/2
                rounded-full bg-[#1B6269]/70 p-3 text-white
                shadow-lg transition-all duration-300
                hover:scale-110 hover:bg-[#1B6269]/90
                sm:-left-5
              "
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next button */}
          {teachersCount > 1 && (
            <button
              type="button"
              onClick={nextTeacher}
              aria-label="Next teacher"
              className="
                absolute right-2 top-1/2 z-20 -translate-y-1/2
                rounded-full bg-[#1B6269]/70 p-3 text-white
                shadow-lg transition-all duration-300
                hover:scale-110 hover:bg-[#1B6269]/90
                sm:-right-5
              "
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute right-5 top-5 rounded-full bg-[#1B6269] px-4 py-2 text-sm font-semibold text-white">
            {index + 1} / {teachersCount}
          </div>
        </div>

        {/* Smaller teacher previews */}
        {teachersCount > 1 && (
          <div className="mt-10 flex items-end justify-start gap-4 overflow-x-auto px-2 pb-5 pt-3 sm:justify-center">
            {visitingTeachers.map((teacher, teacherIndex) => {
              const isActive = teacherIndex === index;

              return (
                <button
                  key={teacher.id}
                  type="button"
                  onClick={() => setIndex(teacherIndex)}
                  aria-label={`Show ${teacher.name}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`
                    group flex shrink-0 flex-col items-center
                    transition-all duration-500
                    ${
                      isActive
                        ? "scale-110 opacity-100"
                        : "scale-90 opacity-55 hover:scale-100 hover:opacity-100"
                    }
                  `}
                >
                  <div
                    className={`
                      overflow-hidden rounded-2xl border-2
                      transition-all duration-500
                      ${
                        isActive
                          ? "h-24 w-24 border-[#1B6269] shadow-lg sm:h-28 sm:w-28"
                          : "h-20 w-20 border-transparent sm:h-24 sm:w-24"
                      }
                    `}
                  >
                    <img
                      src={teacher.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* <span
                    className={`
                      mt-3 max-w-28 text-center text-sm
                      transition-colors duration-300
                      ${
                        isActive
                          ? "font-semibold text-amber-700"
                          : "text-stone-600"
                      }
                    `}
                  >
                    {teacher.name}
                  </span> */}
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile navigation dots */}
        {teachersCount > 1 && (
          <div className="mt-5 flex justify-center gap-2 sm:hidden">
            {visitingTeachers.map((teacher, teacherIndex) => (
              <button
                key={teacher.id}
                type="button"
                onClick={() => setIndex(teacherIndex)}
                aria-label={`Go to ${teacher.name}`}
                className={`
                  h-2.5 rounded-full transition-all duration-300
                  ${
                    teacherIndex === index
                      ? "w-8 bg-amber-700"
                      : "w-2.5 bg-stone-300"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
