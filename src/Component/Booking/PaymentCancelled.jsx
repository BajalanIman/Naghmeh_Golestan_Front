import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createPaymentCheckout } from "./bookingApi";

const copy = {
  en: { title: "Checkout was interrupted", info: "Your booking is not confirmed yet. You can return to the same checkout while your reservation is active.",
    retry: "Continue payment", opening: "Opening payment…", unavailable: "The reservation is unavailable. Please return to the activity page and start a new booking.",
    home: "Back to home" },
  de: { title: "Zahlung unterbrochen", info: "Deine Buchung ist noch nicht bestätigt. Solange die Reservierung aktiv ist, kannst du zur selben Zahlung zurückkehren.",
    retry: "Zahlung fortsetzen", opening: "Zahlung wird geöffnet…", unavailable: "Die Reservierung ist nicht verfügbar. Bitte starte eine neue Buchung auf der Veranstaltungsseite.",
    home: "Zur Startseite" },
  fa: { title: "فرایند پرداخت متوقف شد", info: "ثبت‌نام شما هنوز تأیید نشده است. تا زمانی که رزرو موقت فعال باشد می‌توانید همان پرداخت را ادامه دهید.",
    retry: "ادامه پرداخت", opening: "در حال باز کردن پرداخت…", unavailable: "رزرو در دسترس نیست. لطفاً از صفحه برنامه، رزرو جدیدی انجام دهید.",
    home: "بازگشت به صفحه اصلی" },
};

export default function PaymentCancelled() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const text = copy[lang] || copy.en;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const resume = async () => {
    if (busy) return;
    setBusy(true); setError(false);
    try {
      const orderId = new URLSearchParams(window.location.search).get("order_id");
      if (!orderId) throw new Error();
      const access = JSON.parse(sessionStorage.getItem(`activity_checkout:${orderId}`) ||
        sessionStorage.getItem("activity_checkout") || "null");
      const token = access?.orderId === orderId ? access.guestAccessToken : null;
      const result = await createPaymentCheckout({ orderId, guestAccessToken: token });
      if (!result.checkoutUrl) throw new Error();
      sessionStorage.setItem(`activity_checkout_session:${result.checkoutSessionId}`,
        JSON.stringify({ orderId, guestAccessToken: token }));
      window.location.assign(result.checkoutUrl);
    } catch { setError(true); setBusy(false); }
  };
  return (
    <main dir={lang === "fa" ? "rtl" : "ltr"} className="max-w-2xl mx-auto my-16 p-8 rounded-2xl bg-white shadow-lg text-center">
      <h1 className="text-2xl font-bold text-[#1B6269] mb-5">{text.title}</h1>
      <p className="mb-6">{text.info}</p>
      {error && <p role="alert" className="text-red-700 mb-5">{text.unavailable}</p>}
      <button type="button" disabled={busy} onClick={resume} className="rounded-xl bg-[#1B6269] text-white px-5 py-3 mb-6">
        {busy ? text.opening : text.retry}
      </button>
      <p><a href="/" className="underline text-[#1B6269]">{text.home}</a></p>
    </main>
  );
}
