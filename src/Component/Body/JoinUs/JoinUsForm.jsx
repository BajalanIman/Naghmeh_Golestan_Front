import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const JoinUsForm = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cityCountry: "",
    contributionArea: "",
    aboutYourself: "",
    ideaMessage: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const getCurrentLanguage = () => {
    const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

    const languageCode = currentLanguage.split("-")[0].toUpperCase();

    const allowedLanguages = ["EN", "DE", "FA"];

    return allowedLanguages.includes(languageCode) ? languageCode : "EN";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setMessage("");
    setMessageType("");

    const normalizedData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      cityCountry: formData.cityCountry.trim(),
      contributionArea: formData.contributionArea,
      aboutYourself: formData.aboutYourself.trim(),
      ideaMessage: formData.ideaMessage.trim(),
      language: getCurrentLanguage(),
    };

    if (!normalizedData.fullName) {
      setMessage("Please enter your full name.");
      setMessageType("error");
      return;
    }

    if (!normalizedData.email) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedData.email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (!normalizedData.contributionArea) {
      setMessage("Please select a contribution area.");
      setMessageType("error");
      return;
    }

    if (!normalizedData.aboutYourself) {
      setMessage("Please tell us something about yourself.");
      setMessageType("error");
      return;
    }

    if (normalizedData.aboutYourself.length < 20) {
      setMessage(
        "The about-yourself section must contain at least 20 characters.",
      );
      setMessageType("error");
      return;
    }

    if (!normalizedData.ideaMessage) {
      setMessage("Please describe your idea or message.");
      setMessageType("error");
      return;
    }

    if (normalizedData.ideaMessage.length < 20) {
      setMessage("The idea or message must contain at least 20 characters.");
      setMessageType("error");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8800/api/join-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Application submission failed.");
      }

      setMessage(
        result.message || "Your application has been submitted successfully.",
      );
      setMessageType("success");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        cityCountry: "",
        contributionArea: "",
        aboutYourself: "",
        ideaMessage: "",
      });

      console.log("Join Us application response:", result);
    } catch (error) {
      console.error("Join Us application error:", error);

      setMessage(error.message || "Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mt-12">
      <h2 className="text-3xl font-bold text-[#186f77] mb-8">
        {t("joinus_about_yourself_form_title")}
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">
              {t("joinus_full_name_label")}
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
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
              name="cityCountry"
              value={formData.cityCountry}
              onChange={handleChange}
              disabled={isLoading}
              placeholder={t("joinus_city_country_placeholder")}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">
            {t("joinus_contribution_area_label")}
          </label>

          <select
            name="contributionArea"
            value={formData.contributionArea}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
          >
            <option value="">
              {t("joinus_contribution_area_placeholder")}
            </option>

            <option value="Workshop Instructor">Workshop Instructor</option>

            <option value="Course Teacher">Course Teacher</option>

            <option value="Artist / Performer">Artist / Performer</option>

            <option value="Speaker / Researcher">Speaker / Researcher</option>

            <option value="Volunteer">Volunteer</option>

            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">
            {t("joinus_about_yourself_label")}
          </label>

          <textarea
            rows="5"
            name="aboutYourself"
            value={formData.aboutYourself}
            onChange={handleChange}
            disabled={isLoading}
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
            name="ideaMessage"
            value={formData.ideaMessage}
            onChange={handleChange}
            disabled={isLoading}
            placeholder={t("joinus_idea_message")}
            className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-[#186f77] outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center gap-3 bg-[#186f77] hover:bg-[#27b4c1] text-white py-4 rounded-xl font-semibold transition ${
            isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <Send size={20} />

          {isLoading ? "Sending..." : t("joinus_submit_application")}
        </button>

        {message && (
          <p
            className={`text-sm text-center ${
              messageType === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default JoinUsForm;
