import { Send } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const NewsletterSubscription = ({ showFormat }) => {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!message) return;

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

  const handleSubscribe = async () => {
    if (isLoading) {
      return;
    }

    setMessage("");
    setMessageType("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8800/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          language: getCurrentLanguage(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Newsletter subscription failed.");
      }

      setMessage(
        "Thank you! Please check your email to confirm your subscription.",
      );
      setMessageType("success");
      setEmail("");

      console.log("Subscription response:", result);
    } catch (error) {
      console.error("Subscription error:", error);

      setMessage(error.message || "Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isLoading) {
      event.preventDefault();
      handleSubscribe();
    }
  };

  return (
    <>
      {showFormat === 1 ? (
        <div className="w-full lg:h-[700px] flex flex-col lg:flex-row pt-12 lg:pt-0 px-6 lg:px-0">
          <div className="w-full lg:w-1/2 bg-[#BCDEDC] h-full px-10 py-12 lg:pb-0">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold mb-1">Newsletter</h1>

                <h1 className="text-4xl font-bold">Subscription</h1>
              </div>

              <Send className="w-20 h-20" />
            </div>

            <div className="text-2xl flex flex-col gap-2 mt-12 mb-12">
              <p>History told up to date:</p>
              <p>If you want to stay up to date,</p>
              <p>subscribe to our newsletter.</p>
            </div>

            {/* email */}
            <div className="flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (message) {
                    setMessage("");
                    setMessageType("");
                  }
                }}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Your email address"
                autoComplete="email"
                className="bg-[#CAE0DF] border border-[#1B6269] rounded-3xl h-12 w-72 lg:w-96 pl-4"
              />

              <span className="text-[11px] pl-8 mt-3">
                I would like to receive your newsletter
              </span>

              <span className="text-[11px] pl-8">
                and accept the privacy policy.
              </span>

              <button
                type="button"
                onClick={handleSubscribe}
                disabled={isLoading}
                className={`text-white flex flex-row bg-[#1B6269] rounded-lg justify-center items-center gap-3 w-28 h-14 mt-8 ${
                  isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <p>{isLoading ? "Sending..." : "Send"}</p>
                <Send className="w-6 h-6" />
              </button>

              {message && (
                <p
                  className={`mt-4 text-sm ${
                    messageType === "success"
                      ? "text-green-800"
                      : "text-red-700"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* right */}
          <img
            className="h-96 w-full lg:w-1/2 lg:h-[700px]"
            src="https://wallpaperaccess.com/full/167767.jpg"
            alt="Newsletter"
          />
        </div>
      ) : (
        <div className="inline">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (message) {
                  setMessage("");
                  setMessageType("");
                }
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={t("footer_email_placeholder")}
              autoComplete="email"
              className="w-full px-3 py-2 rounded-md outline-none"
            />

            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isLoading}
              className={`bg-[#E4F8F7] px-4 py-2 rounded-md font-semibold hover:bg-yellow-100 transition ${
                isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? "Sending..." : t("footer_subscribe_button")}
            </button>
          </div>
          <div>
            {message && (
              <p
                className={`mt-2 text-sm ${
                  messageType === "success" ? "text-green-200" : "text-red-300"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterSubscription;
