import { Palette, BookOpen, Music, Users, Send } from "lucide-react";

import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";
import JoinUsForm from "./JoinUsForm";

const JoinUs = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const opportunities = [
    {
      icon: <Palette size={35} />,
      title: t("joinus_artists_creators_title"),
      description: t("joinus_artists_creators_description"),
    },
    {
      icon: <BookOpen size={35} />,
      title: t("joinus_teachers_speakers_title"),
      description: t("joinus_teachers_speakers_description"),
    },
    {
      icon: <Music size={35} />,
      title: t("joinus_performers_title"),
      description: t("joinus_performers_description"),
    },
    {
      icon: <Users size={35} />,
      title: t("joinus_volunteers_partners_title"),
      description: t("joinus_volunteers_partners_description"),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F1EFEE] flex flex-col">
      {/* Navbar */}
      <div className="w-full bg-[#186f77]">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1785184331/Join_us_3_prtsfo.jpg"
          alt="Join Us"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          {t("joinus_title")}
        </h1>
      </div>

      {/* Introduction */}
      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-bold text-[#186f77] mb-5">
            {t("joinus_community_title")}
          </h2>

          <p className="text-gray-600 leading-8 max-w-4xl mx-auto">
            {t("joinus_community_description")}
          </p>
        </div>

        {/* Opportunities */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {opportunities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="text-[#186f77] flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-xl mb-3">{item.title}</h3>

              <p className="text-gray-600 text-sm leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <JoinUsForm />
      </div>

      <DonationSection />

      <Footer />
    </div>
  );
};

export default JoinUs;
