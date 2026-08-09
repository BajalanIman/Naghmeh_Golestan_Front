import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const Terms = () => {
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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783760216/TermeConditionsImage_ewlnvx.png"
          alt="Terms and Conditions"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          {t("terms_conditions")}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-[#186f77] mb-4">
              {t("introduction_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_introduction_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("terms_ticket_purchases_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_ticket_purchases_description")}
            </p>

            <ul className="list-disc ml-6 mt-3 text-gray-600 space-y-2">
              <li>{t("terms_ticket_transfer_policy")}</li>
              <li>{t("terms_ticket_confirmation_requirement")}</li>
              <li>{t("terms_lost_confirmation_support")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("terms_payments_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_payments_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("terms_refund_and_cancellation_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_refund_and_cancellation_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("terms_event_changes_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_event_changes_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("terms_code_of_conduct_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_code_of_conduct_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("terms_intellectual_property_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_intellectual_property_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("terms_limitation_of_liability_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_limitation_of_liability_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              {t("terms_contact_information_title")}
            </h2>

            <p className="text-gray-600 leading-8">
              {t("terms_contact_information_description")}
            </p>
          </section>

          <p className="text-sm text-gray-500 border-t pt-5">
            {t("terms_last_updated")}
          </p>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default Terms;
