import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants/constants";
import useDonationTranslation from "../../../donation/useDonationTranslation";
import {
  clearCheckout,
  isStripeCheckoutUrl,
  readCheckout,
} from "../../../donation/checkoutStorage";

const buttonClass =
  "inline-block rounded-xl bg-[#1B6269] text-white px-5 py-3 text-center";
export default function DonationResult({ cancelled = false }) {
  const { language, t } = useDonationTranslation();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [view, setView] = useState("checking");
  const [donation, setDonation] = useState(null);
  const [retry, setRetry] = useState(0);
  const [saved] = useState(readCheckout);

  useEffect(() => {
    // Limit referrer leakage from the receipt page. Also configure this header
    // on the static host to cover requests before React mounts.
    const existing = document.querySelector('meta[name="referrer"]');
    const meta = existing || document.createElement("meta");
    const previous = meta.getAttribute("content");
    meta.name = "referrer";
    meta.content = "no-referrer";
    if (!existing) document.head.appendChild(meta);
    return () => {
      if (existing) {
        if (previous === null) meta.removeAttribute("content");
        else meta.content = previous;
      } else meta.remove();
    };
  }, []);

  useEffect(() => {
    if (cancelled) return;
    if (
      !sessionId ||
      !/^cs_(test_|live_)?[A-Za-z0-9]{10,250}$/.test(sessionId)
    ) {
      setView("invalid");
      return;
    }
    let stopped = false,
      timer,
      attempts = 0;
    const controller = new AbortController();
    setView("checking");
    async function poll() {
      try {
        const response = await axios.get(
          `${BASE_URL.replace(/\/+$/, "")}/donations/checkout/${encodeURIComponent(sessionId)}`,
          { withCredentials: true, signal: controller.signal, timeout: 10000 },
        );
        if (stopped) return;
        const result = response.data.donation;
        setDonation(result);
        const state = result.paymentStatus;
        if (
          [
            "COMPLETED",
            "FAILED",
            "CANCELLED",
            "REFUNDED",
            "PARTIALLY_REFUNDED",
          ].includes(state)
        ) {
          setView(
            state === "COMPLETED"
              ? "success"
              : state === "REFUNDED"
                ? "refunded"
                : state === "PARTIALLY_REFUNDED"
                  ? "partial"
                  : "failed",
          );
          if (readCheckout()?.sessionId === sessionId) clearCheckout();
          return;
        }
        if (++attempts >= 15) {
          setView("pending");
          return;
        }
        timer = setTimeout(poll, 2000);
      } catch (error) {
        if (stopped || axios.isCancel(error)) return;
        // The webhook may be racing the checkout response/database update.
        if (error.response?.status === 404 && ++attempts < 15) {
          timer = setTimeout(poll, 2000);
          return;
        }
        setView("error");
      }
    }
    poll();
    return () => {
      stopped = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [cancelled, sessionId, retry]);

  const state = cancelled ? "cancel" : view;
  const titleKey =
    state === "invalid" ? "donation_error_title" : `donation_${state}_title`;
  const textKey =
    state === "invalid" ? "donation_invalid_text" : `donation_${state}_text`;
  return (
    <main
      dir={language === "fa" ? "rtl" : "ltr"}
      className="max-w-2xl mx-auto px-4 py-16 sm:py-24"
    >
      <section
        className="rounded-3xl border border-[#BCDEDC] bg-[#E4F8F7] p-6 sm:p-10 shadow-lg"
        aria-live="polite"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B6269] mb-5">
          {t(titleKey)}
        </h1>
        <p className="leading-8 mb-6">{t(textKey)}</p>
        {!cancelled && donation && (
          <p className="mb-6 font-semibold">
            {t("donation_amount_label")}:{" "}
            {new Intl.NumberFormat(language, {
              style: "currency",
              currency: donation.currency,
            }).format(donation.amount)}
          </p>
        )}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          {!cancelled && ["pending", "error"].includes(view) && (
            <button
              type="button"
              className={buttonClass}
              onClick={() => setRetry((value) => value + 1)}
            >
              {t("donation_retry")}
            </button>
          )}
          {cancelled && isStripeCheckoutUrl(saved?.checkoutUrl) && (
            <a
              className={buttonClass}
              href={saved.checkoutUrl}
              rel="noreferrer"
            >
              {t("donation_resume")}
            </a>
          )}
          {cancelled &&
            /^cs_(test_|live_)?[A-Za-z0-9]{10,250}$/.test(
              saved?.sessionId || "",
            ) && (
              <Link
                className={buttonClass}
                to={`/donation/success?session_id=${encodeURIComponent(saved.sessionId)}`}
              >
                {t("donation_check_status")}
              </Link>
            )}
          {(cancelled ||
            ["failed", "refunded", "partial", "success"].includes(view)) && (
            <Link
              className="border border-[#1B6269] px-5 py-3 rounded-xl text-center"
              to="/donation"
            >
              {t("donation_start_new")}
            </Link>
          )}
          <Link className="px-5 py-3 underline text-center" to="/">
            {t("donation_home")}
          </Link>
        </div>
      </section>
    </main>
  );
}
