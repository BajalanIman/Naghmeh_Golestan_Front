import { Mail, MapPin, Phone, Clock } from "lucide-react";
import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783763648/ContactUsImage_lx1k6w.png"
          alt="Contact Us"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          {t("contact_us_title")}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#186f77] mb-6">
              {t("contact_get_in_touch_title")}
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              {t("contact_get_in_touch_description")}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#186f77] text-white p-3 rounded-full">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {t("contact_address_label")}
                  </h3>
                  <p className="text-gray-600">
                    Kunst-Stoffe- Materialmarkt Pankow
                    <br />
                    Berliner Str. 17, 13189 Berlin
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#186f77] text-white p-3 rounded-full">
                  <Mail size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {t("contact_email_label")}
                  </h3>
                  <p className="text-gray-600">kontakt@kultur-atelier.de</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#186f77] text-white p-3 rounded-full">
                  <Phone size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {t("contact_phone_label")}
                  </h3>
                  <p className="text-gray-600">
                    +49 15904973362 (Official working hours)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#186f77] text-white p-3 rounded-full">
                  <Clock size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {t("contact_office_hours_label")}
                  </h3>
                  <p className="text-gray-600">
                    Tuesday_Thursday
                    <br />
                    09:00 – 17:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#186f77] mb-6">
              {t("contact_send_message_title")}
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">
                  {" "}
                  {t("contact_full_name_label")}
                </label>

                <input
                  type="text"
                  placeholder={t("contact_full_name_placeholder")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  {t("contact_email_address_label")}
                </label>

                <input
                  type="email"
                  placeholder={t("contact_email_address_placeholder")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  {t("contact_subject_label")}
                </label>

                <input
                  type="text"
                  placeholder={t("contact_subject_label")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  {t("contact_message_label")}
                </label>

                <textarea
                  rows="6"
                  placeholder={t("contact_write_message")}
                  className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#186f77]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#186f77] hover:bg-[#27b4c1] text-white py-4 rounded-lg font-semibold transition"
              >
                {t("contact_send_message")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <DonationSection />
      <Footer />
    </div>
  );
};

export default ContactUs;
