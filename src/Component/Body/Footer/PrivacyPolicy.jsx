import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783759688/PrivacyPolicy_q4nyhg.png"
          alt="Privacy Policy"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          {t("privacy_policy_title")}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-[#186f77] mb-4">
              {t("privacy_introduction_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("privacy_introduction_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("privacy_information_we_collect_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("privacy_information_we_collect_description")}
            </p>

            <ul className="list-disc ml-6 mt-3 text-gray-600 space-y-2">
              <li> {t("privacy_information_name_and_contact")}</li>
              <li> {t("privacy_information_email_address")}</li>
              <li> {t("privacy_information_ticket_booking")}</li>
              <li> {t("privacy_information_payment_related")}</li>

              <li>{t("privacy_information_contact_form_messages")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("privacy_information_use_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("privacy_information_use_description")}
            </p>

            <ul className="list-disc ml-6 mt-3 text-gray-600 space-y-2">
              <li>{t("privacy_information_use_process_purchases")}</li>
              <li> {t("privacy_information_use_send_confirmations")}</li>
              <li>{t("privacy_information_use_respond_to_requests")}</li>
              <li> {t("privacy_information_use_improve_services")}</li>
              <li>{t("privacy_information_use_event_updates")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("privacy_data_protection_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("privacy_data_protection_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("privacy_cookies_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("privacy_cookies_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("privacy_third_party_services_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("privacy_third_party_services_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("privacy_your_rights_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("privacy_your_rights_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("privacy_contact_information_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("privacy_contact_information_description")}
            </p>
          </section>

          <p className="text-sm text-gray-500 border-t pt-5">
            {t("privacy_last_updated")}
          </p>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
