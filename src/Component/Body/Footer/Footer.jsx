import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewsletterSubscription from "../Home/NewsletterSubscription";

const Footer = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1B6269] text[#1B6269]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="text-[#E4F8F7]">
          <h1 className="text-2xl font-bold">
            {t("footer_cultural_hub_title")}
          </h1>
          <p className="text-sm mt-4 leading-relaxed">
            {t("footer_cultural_hub_description")}
          </p>
        </div>

        {/* Links */}
        <div className="text-[#E4F8F7]">
          <h2 className="text-lg font-semibold mb-4">
            {t("footer_explore_title")}
          </h2>
          <ul className="space-y-2">
            {/* <li className="hover:text-[#ECEAD3] cursor-pointer">Exhibitions</li> */}
            <Link to="/workshops">
              <li className="hover:text-[#ECEAD3] cursor-pointer mb-2">
                {t("footer_workshops_link")}
              </li>
            </Link>
            <Link to="/courses">
              <li className="hover:text-[#ECEAD3] cursor-pointer">
                {t("footer_courses_link")}
              </li>
            </Link>
            <Link to="/ourEvents">
              <li className="hover:text-[#ECEAD3] cursor-pointer mt-2">
                {t("footer_events_link")}
              </li>
            </Link>
            <li className="hover:text-[#ECEAD3] cursor-pointer">
              {t("footer_news_link")}
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-[#E4F8F7]">
          <h2 className="text-lg font-semibold mb-4">
            {t("footer_support_title")}
          </h2>
          <ul className="space-y-2">
            <Link to="/helpCenter">
              <li className="hover:text-[#ECEAD3] cursor-pointer">
                {t("footer_faq_link")}
              </li>
            </Link>
            <Link to="/contactUs">
              <li className="hover:text-[#ECEAD3] cursor-pointer mt-2">
                {t("footer_contact_us_link")}
              </li>
            </Link>
            <Link to="/privacyPolicy">
              <li className="hover:text-[#ECEAD3] cursor-pointer mt-2">
                {t("footer_privacy_policy_link")}
              </li>
            </Link>
            <Link to="/terms">
              <li className="hover:text-[#E4F8F7] cursor-pointer mt-2">
                {t("footer_terms_link")}
              </li>
            </Link>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg text-[#E4F8F7] font-semibold mb-4">
            {t("footer_newsletter_title")}
          </h2>
          <p className="text-sm text-[#E4F8F7] mb-4">
            {t("footer_newsletter_description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <NewsletterSubscription showFormat={2} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-[#E4F8F7]">
        {t("footer_copyright")}
      </div>
    </footer>
  );
};

export default Footer;
