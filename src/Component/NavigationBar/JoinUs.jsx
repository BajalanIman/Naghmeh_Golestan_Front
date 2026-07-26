import { Palette, BookOpen, Music, Users, Send } from "lucide-react";

import NavBar from "./NavBar";
import DonationSection from "../Body/Home/DonationSection";
import Footer from "../Body/Footer/Footer";
import { useTranslation } from "react-i18next";

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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783760844/JoinUsImage_tjgmfu.png"
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

        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mt-12">
          <h2 className="text-3xl font-bold text-[#186f77] mb-8">
            {t("joinus_about_yourself_form_title")}
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">
                  {t("joinus_full_name_label")}
                </label>

                <input
                  type="text"
                  placeholder={t("joinus_full_name_label")}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  {t("joinus_email_address_label")}
                </label>

                <input
                  type="email"
                  placeholder={t("joinus_email_address_label")}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">
                  {t("joinus_phone_number_label")}
                </label>

                <input
                  type="text"
                  placeholder={t("joinus_phone_number_placeholder")}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  {t("joinus_city_country_label")}
                </label>

                <input
                  type="text"
                  placeholder={t("joinus_city_country_placeholder")}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">
                {t("joinus_contribution_area_label")}
              </label>

              <select className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none">
                <option> {t("joinus_contribution_area_placeholder")}</option>

                <option>Workshop Instructor</option>

                <option>Course Teacher</option>

                <option>Artist / Performer</option>

                <option>Speaker / Researcher</option>

                <option>Volunteer</option>

                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">
                {t("joinus_about_yourself_label")}
              </label>

              <textarea
                rows="5"
                placeholder={t("joinus_about_yourself_placeholder")}
                className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-[#186f77] outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                {t("joinus_idea_message_label")}
              </label>

              <textarea
                rows="5"
                placeholder={t("joinus_idea_message")}
                className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-[#186f77] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-3 bg-[#186f77] hover:bg-[#27b4c1] text-white py-4 rounded-xl font-semibold transition"
            >
              <Send size={20} />
              {t("joinus_submit_application")}
            </button>
          </form>
        </div>
      </div>

      <DonationSection />

      <Footer />
    </div>
  );
};

export default JoinUs;
