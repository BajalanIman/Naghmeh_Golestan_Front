import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/constants";
import useDonationTranslation from "../../../donation/useDonationTranslation";
import {
  isStripeCheckoutUrl,
  saveCheckout,
} from "../../../donation/checkoutStorage";

export default function DonationSection() {
  const { t, language } = useDonationTranslation();
  const [amount, setAmount] = useState("25");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const busy = useRef(false);
  const attempt = useRef(null);

  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    setError("");
    if (
      !/^\d+(\.\d{1,2})?$/.test(amount) ||
      Number(amount) < 1 ||
      Number(amount) > 10000
    ) {
      setError(t("donation_amount_error"));
      return;
    }
    const email = donorEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("donation_email_error"));
      return;
    }
    busy.current = true;
    setLoading(true);
    let navigating = false;
    try {
      const data = {
        amount: Number(amount),
        currency: "EUR",
        donorName: donorName.trim() || null,
        donorEmail: email,
        anonymous: false,
        message: null,
        language: language.toUpperCase(),
      };
      const fingerprint = JSON.stringify(data);
      if (attempt.current?.fingerprint !== fingerprint)
        attempt.current = { fingerprint, requestId: crypto.randomUUID() };
      const response = await axios.post(
        `${BASE_URL.replace(/\/+$/, "")}/donations/checkout`,
        { ...data, requestId: attempt.current.requestId },
        { withCredentials: true, timeout: 30000 },
      );
      const { checkoutUrl, checkoutSessionId } = response.data;
      const url = new URL(checkoutUrl);
      const isResult =
        url.origin === window.location.origin &&
        url.pathname === "/donation/success";
      if (!isStripeCheckoutUrl(checkoutUrl) && !isResult)
        throw new Error("Unexpected checkout URL.");
      saveCheckout({
        sessionId: checkoutSessionId,
        checkoutUrl: isStripeCheckoutUrl(checkoutUrl) ? checkoutUrl : null,
      });
      window.location.assign(checkoutUrl);
      navigating = true;
    } catch (err) {
      if (err.response?.data?.code === "NEW_REQUEST_REQUIRED") {
        attempt.current = null;
        setError(t("donation_new_request"));
      } else setError(t("donation_checkout_error"));
    } finally {
      if (!navigating) {
        busy.current = false;
        setLoading(false);
      }
    }
  }

  return (
    <section
      id="donation"
      dir={language === "fa" ? "rtl" : "ltr"}
      className="max-w-5xl mx-auto px-4 py-12 sm:py-20"
    >
      <div className="border-gray-300 border rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        <div className="bg-[#BCDEDC] p-6 sm:p-10">
          <span className="inline-block bg-[#E4F8F7] px-4 py-2 rounded-full text-sm mb-6">
            {t("donation_support_mission_title")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t("donation_accessible_culture_title")}
          </h2>
          <p className="leading-8">{t("donation_description")}</p>
          <div className="mt-10 px-6 py-6 flex justify-center">
            <img
              src="https://res.cloudinary.com/r4pnipqe/image/upload/v1786282344/Golestan_Logo_KulutrHub_farbe_m6ezej.svg"
              alt="Golestan Cultural Hub"
              className="max-w-full"
            />
          </div>
        </div>
        <form
          onSubmit={submit}
          className="p-6 sm:p-10 bg-[#E4F8F7]"
          aria-busy={isLoading}
        >
          <h3 className="text-2xl font-bold mb-4">
            {t("donation_form_title")}
          </h3>
          <p className="text-sm mb-6">{t("donation_guest_note")}</p>
          <fieldset disabled={isLoading}>
            <legend className="text-sm font-medium mb-3">
              {t("donation_choose_amount_label")}
            </legend>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[10, 25, 50, 100].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={Number(amount) === value}
                  onClick={() => {
                    setAmount(String(value));
                    setError("");
                  }}
                  className={`rounded-xl border p-4 font-semibold transition disabled:opacity-60 ${Number(amount) === value ? "bg-[#1B6269] text-white border-[#0f4146]" : "border-[#1B6269]"}`}
                >
                  €{value}
                </button>
              ))}
            </div>
            <label className="block text-sm font-medium mb-6">
              {t("donation_another_amount_label")}
              <input
                type="number"
                required
                min="1"
                max="10000"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                className="w-full border rounded-xl p-4 mt-2"
              />
            </label>
            <label className="block text-sm font-medium mb-4">
              {t("donation_name_optional")}
              <input
                type="text"
                maxLength={150}
                autoComplete="name"
                value={donorName}
                onChange={(e) => {
                  setDonorName(e.target.value);
                  setError("");
                }}
                className="w-full border rounded-xl p-4 mt-2"
              />
            </label>
            <label className="block text-sm font-medium mb-6">
              {t("donation_email_label")}
              <input
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                dir="ltr"
                value={donorEmail}
                onChange={(e) => {
                  setDonorEmail(e.target.value);
                  setError("");
                }}
                className="w-full border rounded-xl p-4 mt-2"
              />
            </label>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1B6269] hover:bg-[#0a344c] text-white font-semibold py-4 px-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading
                ? t("donation_redirecting")
                : `${t("donation_submit_button")} €${Number(amount) || 0}`}
            </button>
          </fieldset>
          {error && (
            <p role="alert" className="text-center text-sm text-red-700 mt-4">
              {error}
            </p>
          )}
          <p className="text-center text-sm mt-4">
            {t("donation_secure_payment_text")}
          </p>
        </form>
      </div>
    </section>
  );
}
