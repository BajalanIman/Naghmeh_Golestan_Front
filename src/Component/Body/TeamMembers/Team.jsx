// import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Naghmeh Esmaeilpour",
    role: "Founder & Cultural Educator",
    image:
      "https://kultur-atelier.de/wp-content/uploads/2022/05/Naghme-final-png.webp",
    bio: "Naghmeh Esmaeilpour is an Iranian doctoral student who has been studying at Humboldt University in Berlin since September 2015 as part of the PhD-Net program. She completed her undergraduate studies in 2006 with a Bachelor's degree in English Language and Literature. She then pursued a Master's degree in English Language and Literature, which she completed in 2011. As part of the PhD-Net program, she was a visiting scholar at Harvard University for a semester in 2016. In 2017, she received a scholarship to participate in the Harvard Institute of World Literature Summer School. Since August 2017, she has been a recipient of a scholarship from the Friedrich Ebert Foundation.",
    expertise: ["English Language", "Arab History", "Cultural Studies"],
  },
  {
    id: 2,
    name: "Dr. Pegah Khadish",
    role: "Artistic director",
    image:
      "https://kultur-atelier.de/wp-content/uploads/2024/10/Pegah-768x503.webp",
    bio: "Pegah Khadish has completed training in Persian language and literature. She completed her PhD at the University of Tehran (2005). Her doctoral thesis was on the morphology of Persian folk tales, which was written under the supervision of Prof. Ulrich Marzloph at the University of Göttingen. This dissertation was published in 2008 and was selected as the top cultural research of the year in Iran. She worked as an assistant professor for about 15 years at the Dehkhoda Lexicon Institute and the International Center for Persian Studies at the University of Tehran. Her main research area is Iranian myths and narratives. She has published nine books so far, most of them on Persian folk literature and narrative elements, two of which are considered textbooks. She has been a member of the ISFNR (The International Society for Folk Narrative Research) since 2017. She is currently working on a voluntary basis on cataloging some unknown Persian manuscripts in the Berlin State Library.",
    expertise: ["Persian language and literature"],
  },
  {
    id: 3,
    name: "Sanaz pahlevan",
    role: "Teacher and artifact artist",
    image:
      "https://kultur-atelier.de/wp-content/uploads/2022/05/Pegah-1-768x503.webp",
    bio: "Sanaz Pahlavi was born in November 1982. She initially studied family psychology and later earned a bachelor's degree in primary school teaching. During her studies, she developed a strong interest in crafts such as doll making, origami, collage, and embroidery (on fabric and leather). Believing in teaching children concepts through art and crafts, she obtained certifications from practical craft schools. She worked as a primary school teacher in Iran for approximately six years, teaching children theater and small decorative crafts for about three years. Later, after immigrating to Germany, she used her talent to teach third-grade children how to make decorative crafts for their families as Christmas gifts at school. Through KulturAtelier, I host a virtual workshop on small decorative crafts, which was well-received by 10 participants, despite being virtual due to the COVID-19 pandemic.",
    expertise: ["Teaching"],
  },
];

export default function TeamSection() {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-gradient-to-b from-indigo-700 via-red-500 to-purple-500">
      {/* NAVBAR */}
      <div className="mx-auto lg:w-[1200px]">
        <NavBar />
      </div>
      <section className="bg-stone-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-amber-700 uppercase tracking-[0.2em] text-sm font-medium">
              Our Team
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-serif text-stone-900">
              Meet the People Behind the Mission
            </h2>

            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              Our team brings together educators, researchers, and cultural
              practitioners dedicated to sharing the rich history, traditions,
              and contemporary cultures of the Middle East.
            </p>
          </div>

          {/* Members */}
          <div className="space-y-24">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full max-w-md mx-auto rounded-2xl object-cover shadow-lg"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-3xl font-serif text-stone-900">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-amber-700 font-medium">
                    {member.role}
                  </p>

                  <p className="mt-6 text-stone-600 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-sm uppercase tracking-wider text-stone-500 mb-4">
                      Areas of Expertise
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      {member.expertise.map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 rounded-full bg-white border border-stone-200 text-sm text-stone-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
