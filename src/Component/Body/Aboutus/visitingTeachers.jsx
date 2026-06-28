const visitingTeachers = [
  {
    id: 1,
    name: "Prof. Dr. Asef Bayat",
    role: "Professor of Sociology (Guest Lecturer)",
    image:
      "https://cdn.nawaat.org/wp-content/uploads/2019/02/Asef-Bayat-2-680px.jpg",
    bio: "He currently holds the Catherine and Bruce Bastian Chair in Global and Transnational Studies in the Department of Sociology at the University of Illinois Urbana-Champaign. Bayat's works focuses on social movements and social change, religion and public life, and urban space and politics and contemporary Middle Eastern societies. Prior to his tenure at Illinois, Bayat was a faculty member at the American University in Cairo and served as the director of the International Institute for the Study of Islam in the Modern World (ISIM) at Leiden University, The Netherlands, where he also held the chair of Society and Culture of the Modern Middle East. Additionally, he has held visiting positions at the University of California, Berkeley; Columbia University; the University of Oxford; and Brown University.",
  },
  {
    id: 2,
    name: "Prof. Dr. Nasser Kanani",
    role: "Surface Engineering (Guest Lecturer)",
    image:
      "https://iranjournal.org/wp-content/uploads/2020/05/Prof-Nasser-Kanani-.jpg",
    bio: "EDITOR Professor Dr.-Ing. Dr. habil. Wet Kanani TU and TFH Berlin, visiting professorship at MIT, the University of Florida in Gainesville, and Zakaraya University in Turkey; between 1993 and 2005 Head of the Materials Science Department at Atotech Deutschland GmbH in Berlin. During this time, he led a team of scientists and engineers on the qualification of electroplated metallic coatings.",
  },
  {
    id: 3,
    name: "Sample Person",
    role: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ",
    image:
      "https://img.freepik.com/premium-vector/vector-illustration-person-casual-wear_1189095-213.jpg",
    bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
];

export default function VisitingTeachers() {
  return (
    <section className="py-8 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900">
            Visiting Educators & Workshop Leaders
          </h2>

          <p className="mt-5 text-stone-600 leading-relaxed">
            We collaborate with international educators and cultural
            practitioners who join KulturAtelier for short-term workshops,
            lectures, and creative programs.
          </p>
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

                <p className="mt-1 text-amber-700 font-medium">
                  {teacher.role}
                </p>

                <p className="mt-5 text-stone-600 leading-relaxed max-w-2xl">
                  {teacher.bio}
                </p>

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
