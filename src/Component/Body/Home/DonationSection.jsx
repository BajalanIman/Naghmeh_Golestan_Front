import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../constants/constants";

const DonationSection = () => {
  const { i18n, t } = useTranslation();

  const [amount, setAmount] = useState(25);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const presetAmounts = [10, 25, 50, 100];

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

  const clearMessage = () => {
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handlePresetAmount = (value) => {
    setAmount(value);
    clearMessage();
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    clearMessage();
  };

  const handleDonation = async () => {
    if (isLoading) {
      return;
    }

    setMessage("");
    setMessageType("");

    const normalizedAmount = Number(amount);
    const normalizedEmail = donorEmail.trim().toLowerCase();
    const normalizedName = donorName.trim();

    if (
      !normalizedAmount ||
      Number.isNaN(normalizedAmount) ||
      normalizedAmount < 1
    ) {
      setMessage("Please enter a valid donation amount.");
      setMessageType("error");
      return;
    }

    if (normalizedAmount > 10000) {
      setMessage("The maximum online donation amount is €10,000.");
      setMessageType("error");
      return;
    }

    if (!normalizedEmail) {
      setMessage("Please enter your email address for the payment receipt.");
      setMessageType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    const donationData = {
      donorName: normalizedName || null,
      donorEmail: normalizedEmail,
      anonymous: false,
      amount: normalizedAmount,
      currency: "EUR",
      message: null,
      language: getCurrentLanguage(),
    };

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${BASE_URL}donations/checkout`,
        donationData,
        {
          withCredentials: true,
        },
      );

      const checkoutUrl = response.data.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("The payment checkout URL was not returned.");
      }

      setMessage(
        response.data.message ||
          "Donation checkout created successfully. Redirecting to payment...",
      );
      setMessageType("success");

      window.location.assign(checkoutUrl);
    } catch (error) {
      console.error("Donation checkout error:", error);

      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Unable to start the donation payment.",
      );

      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <div className="border-gray-300 border rounded-3xl shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="bg-[#BCDEDC] p-10">
            <span className="inline-block bg-[#E4F8F7] px-4 py-2 rounded-full text-sm mb-6">
              {t("donation_support_mission_title")}
            </span>

            <h2 className="text-4xl font-bold mb-6">
              {t("donation_accessible_culture_title")}
            </h2>

            <p className="leading-8">{t("donation_description")}</p>

            <div className="mt-10 px-10 py-10 flex justify-center">
              <img
                src="https://res.cloudinary.com/r4pnipqe/image/upload/v1786282344/Golestan_Logo_KulutrHub_farbe_m6ezej.svg"
                alt="Golestan Cultural Hub"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="p-10 bg-[#E4F8F7]">
            <h3 className="text-2xl font-bold mb-6">
              {t("donation_form_title")}
            </h3>

            <label className="block text-sm font-medium mb-3">
              {t("donation_choose_amount_label")}
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {presetAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handlePresetAmount(value)}
                  disabled={isLoading}
                  className={`rounded-xl border p-4 font-semibold transition ${
                    Number(amount) === value
                      ? "bg-[#1B6269] text-white border-[#0f4146]"
                      : "border-[#1B6269]"
                  } ${
                    isLoading
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  €{value}
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium mb-3">
              {t("donation_another_amount_label")}
            </label>

            <input
              type="number"
              min="1"
              max="10000"
              step="0.01"
              value={amount}
              onChange={handleAmountChange}
              disabled={isLoading}
              className="w-full border rounded-xl p-4 mb-6"
              placeholder={t("donation_another_amount_label")}
            />

            <input
              type="text"
              value={donorName}
              onChange={(event) => {
                setDonorName(event.target.value);
                clearMessage();
              }}
              disabled={isLoading}
              autoComplete="name"
              placeholder={t("donation_name_label")}
              className="w-full border rounded-xl p-4 mb-4"
            />

            <input
              type="email"
              value={donorEmail}
              onChange={(event) => {
                setDonorEmail(event.target.value);
                clearMessage();
              }}
              disabled={isLoading}
              autoComplete="email"
              placeholder={t("donation_email_label")}
              className="w-full border rounded-xl p-4 mb-6"
            />

            <div className="mb-6">
              <label className="block font-medium mb-3">
                {t("donation_payment_method_label")}
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  disabled
                  className="border rounded-xl px-5 py-3 bg-white"
                >
                  Stripe
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDonation}
              disabled={isLoading}
              className={`w-full bg-[#1B6269] hover:bg-[#0a344c] text-white font-semibold py-4 rounded-xl transition ${
                isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading
                ? "Redirecting..."
                : `${t("donation_submit_button")} €${Number(amount) || 0}`}
            </button>

            {message && (
              <p
                className={`text-center text-sm mt-4 ${
                  messageType === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-center text-sm mt-4">
              {t("donation_secure_payment_text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
