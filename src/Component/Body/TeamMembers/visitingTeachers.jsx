export default function VisitingTeachers({ title, visitingTeachers }) {
  return (
    <section className="py-8 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900">
            {title}
          </h2>

          {/* <p className="mt-5 text-stone-600 leading-relaxed">
            We collaborate with international educators and cultural
            practitioners who join KulturAtelier for short-term workshops,
            lectures, and creative programs.
          </p> */}
        </div>

        {/* LIST (NOT CARDS — EDITORIAL STYLE) */}
        <div className="space-y-20">
          {visitingTeachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className={`flex flex-col lg:flex-row gap-10 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <div className="w-full lg:w-1/3 flex justify-center">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-56 h-56 object-cover rounded-2xl shadow-md"
                />
              </div>

              {/* TEXT */}
              <div className="w-full lg:w-2/3">
                <h3 className="text-2xl font-semibold text-stone-900">
                  {teacher.name}
                </h3>

                <p className="mt-3 text-amber-700 text-xl font-medium">
                  {teacher.role}
                </p>

                <p className="mt-5 text-stone-600 leading-relaxed max-w-2xl">
                  {teacher.bio}
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  {Array.isArray(teacher.expertise) &&
                    teacher.expertise.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 rounded-full bg-white border border-stone-200 text-sm text-stone-700"
                      >
                        {item}
                      </span>
                    ))}
                </div>
                {/* subtle divider */}
                <div className="mt-8 w-16 h-[2px] bg-amber-700/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
