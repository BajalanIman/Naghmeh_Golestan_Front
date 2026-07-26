import {
  ChevronDown,
  HelpCircle,
  Ticket,
  CreditCard,
  Calendar,
  Users,
} from "lucide-react";
import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const HelpCenter = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq_purchase_tickets_question"),
      answer: t("faq_purchase_tickets_answer"),
    },
    {
      question: t("faq_ticket_limit_question"),
      answer: t("faq_ticket_limit_answer"),
    },
    {
      question: t("faq_cancel_refund_question"),
      answer: t("faq_cancel_refund_answer"),
    },
    {
      question: t("faq_ticket_delivery_question"),
      answer: t("faq_ticket_delivery_answer"),
    },
    {
      question: t("faq_event_postponed_question"),
      answer: t("faq_event_postponed_answer"),
    },
    {
      question: t("faq_contact_support_question"),
      answer: t("faq_contact_support_answer"),
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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783760353/HelpCenterImage_dlqhle.jpg"
          alt="FAQ"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          {t("faq_title")}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 text-center">
          <HelpCircle className="mx-auto text-[#186f77] mb-4" size={55} />

          <h2 className="text-3xl font-bold text-[#186f77] mb-4">
            {t("faq_help_title")}
          </h2>

          <p className="text-gray-600 leading-7 max-w-3xl mx-auto">
            {t("faq_description")}
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Ticket className="mx-auto text-[#186f77] mb-3" size={35} />

            <h3 className="font-bold text-lg">
              {t("faq_tickets_category_title")}
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              {t("faq_tickets_category_description")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <CreditCard className="mx-auto text-[#186f77] mb-3" size={35} />

            <h3 className="font-bold text-lg">
              {t("faq_payments_category_title")}
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              {t("faq_payments_category_description")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Calendar className="mx-auto text-[#186f77] mb-3" size={35} />

            <h3 className="font-bold text-lg">
              {t("faq_events_category_title")}
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              {t("faq_events_category_description")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Users className="mx-auto text-[#186f77] mb-3" size={35} />

            <h3 className="font-bold text-lg">
              {t("faq_community_category_title")}
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              {t("faq_community_category_description")}
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#186f77] mb-8">
            {t("faq_title")}
          </h2>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <details key={index} className="border rounded-xl p-5 group">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg list-none">
                  {faq.question}

                  <ChevronDown className="text-[#186f77] group-open:rotate-180 transition" />
                </summary>

                <p className="text-gray-600 mt-4 leading-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default HelpCenter;
