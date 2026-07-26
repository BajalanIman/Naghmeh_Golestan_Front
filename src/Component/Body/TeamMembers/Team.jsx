// import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

import NavBar from "../../NavigationBar/NavBar";
import VisitingTeachers from "./visitingTeachers";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

export default function TeamSection() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const teamMembers = [
    {
      id: 1,
      name: t("team_members_naghmeh_name"),
      role: t("team_members_naghmeh_role"),
      image:
        "https://res.cloudinary.com/r4pnipqe/image/upload/v1783761121/Naghme-final-png_yvtc0i.webp",
      bio: t("team_members_naghmeh_description"),
      expertise: t("team_members_naghmeh_interests", {
        returnObjects: true,
      }),
    },
    {
      id: 2,
      name: "Kiarash Moham",
      role: "Kiarash Moham",
      image: "",
      bio: "Kiarash Moham",
      // expertise: t("team_members_naghmeh_interests", {
      //   returnObjects: true,
      // }),
    },
    {
      id: 3,
      name: "Sara Assadi",
      role: "Sara Assadi",
      image: "",
      bio: "Sara Assadi",
      // expertise: t("team_members_naghmeh_interests", {
      //   returnObjects: true,
      // }),
    },
    {
      id: 4,
      name: "Nafiseh Mirzaei",
      role: "Nafiseh Mirzaei",
      image: "",
      bio: "Nafiseh Mirzaei",
      // expertise: t("team_members_naghmeh_interests", {
      //   returnObjects: true,
      // }),
    },
    {
      id: 5,
      name: "Iman Bajalan",
      role: "Iman Bajalan",
      image: "",
      bio: "Iman Bajalan",
      // expertise: t("team_members_naghmeh_interests", {
      //   returnObjects: true,
      // }),
    },
  ];

  const teachersInstructors = [
    {
      id: 1,
      name: t("team_members_pegah_khadish_name"),
      role: t("team_members_pegah_khadish_role"),
      image: "",
      bio: t("team_members_pegah_khadish_description"),
      expertise: t("team_members_pegah_khadish_interests", {
        returnObjects: true,
      }),
    },
    {
      id: 2,
      name: t("team_members_sanaz_pahlevan_name"),
      role: t("team_members_sanaz_pahlevan_role"),
      image: "",
      bio: t("team_members_sanaz_pahlevan_description"),
      expertise: t("team_members_sanaz_pahlevan_interests", {
        returnObjects: true,
      }),
    },
    {
      id: 3,
      name: t("team_members_zhaleh_ahmadi_iraei_name"),
      role: t("team_members_zhaleh_ahmadi_iraei_role"),
      image: "",
      bio: t("team_members_zhaleh_ahmadi_iraei_description"),
      expertise: t("team_members_zhaleh_ahmadi_iraei_interests", {
        returnObjects: true,
      }),
    },
    {
      id: 4,
      name: t("team_members_mahdi_gholi_zadeh_name"),
      role: t("team_members_mahdi_gholi_zadeh_role"),
      image: "",
      bio: t("team_members_mahdi_gholi_zadeh_description"),
      expertise: t("team_members_mahdi_gholi_zadeh_interests", {
        returnObjects: true,
      }),
    },
    {
      id: 5,
      name: t("team_members_mitra_nasayehi_name"),
      role: t("team_members_mitra_nasayehi_role"),
      image: "",
      bio: t("team_members_mitra_nasayehi_description"),
      expertise: t("team_members_mitra_nasayehi_interests", {
        returnObjects: true,
      }),
    },
  ];

  const visitingTeachers = [
    {
      id: 1,
      name: t("team_members_mohamad_tavakoli_targhi_name"),
      role: t("team_members_mohamad_tavakoli_targhi_role"),
      image:
        "https://tse1.mm.bing.net/th/id/OIP.vCSCGNfHyJmVB7QTMXFFPwAAAA?r=0&pid=Api&h=220&P=0",
      bio: t("team_members_mohamad_tavakoli_targhi_description"),
      expertise: t("team_members_mohamad_tavakoli_targhi_interests", {
        returnObjects: true,
      }),
    },
    {
      id: 2,
      name: t("team_members_asef_bayat_name"),
      role: t("team_members_asef_bayat_role"),
      image:
        "https://res.cloudinary.com/r4pnipqe/image/upload/v1783761614/Asef-Bayat-2-680px_cms2bw.jpg",
      bio: t("team_members_asef_bayat_description"),
      expertise: t("team_members_asef_bayat_interests", {
        returnObjects: true,
      }),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#F1EFEE]">
      {/* NAVBAR */}
      <div className=" w-full bg-[#186f77] ">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-amber-700 uppercase tracking-[0.2em] text-sm font-medium">
              {t("team_members_our_team")}
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-serif text-stone-900">
              {t("team_members_meet_people")}
            </h2>

            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              {t("team_members_description")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900">
              {t("team_members_organisational_team")}
            </h2>
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
                      {Array.isArray(member.expertise) &&
                        member.expertise.map((item) => (
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
      {/* VISITING TEACHERS */}
      <VisitingTeachers
        title={t("teachers_instructors_title")}
        visitingTeachers={teachersInstructors}
      />
      <VisitingTeachers
        title={t("team_members_guests_title")}
        visitingTeachers={visitingTeachers}
      />
      <Footer />
    </div>
  );
}
