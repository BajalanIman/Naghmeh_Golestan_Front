import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchPaymentCheckoutStatus } from "./bookingApi";

const copy = {
  en: { waiting: "Checking your payment…", paid: "Payment successful — your booking is confirmed.",
    review: "Your payment was received, but your booking needs review. Please contact us with this order number.",
    ended: "This booking was cancelled or expired.", missing: "The payment reference is missing.",
    access: "We could not verify this booking. Open this page in the browser tab where you started payment, or sign in to the account used for the booking.",
    pending: "Confirmation is taking longer than usual. Please check again. You do not need to pay again.",
    retry: "Check again", order: "Order number", total: "Total", home: "Back to home" },
  de: { waiting: "Deine Zahlung wird geprüft…", paid: "Zahlung erfolgreich — deine Buchung ist bestätigt.",
    review: "Deine Zahlung ist eingegangen, aber deine Buchung muss geprüft werden. Bitte kontaktiere uns mit dieser Bestellnummer.",
    ended: "Diese Buchung wurde storniert oder ist abgelaufen.", missing: "Die Zahlungsreferenz fehlt.",
    access: "Die Buchung konnte nicht geprüft werden. Öffne diese Seite im Browser-Tab, in dem du die Zahlung gestartet hast, oder melde dich mit dem verwendeten Konto an.",
    pending: "Die Bestätigung dauert länger als üblich. Bitte prüfe erneut. Du musst nicht noch einmal bezahlen.",
    retry: "Erneut prüfen", order: "Bestellnummer", total: "Gesamt", home: "Zur Startseite" },
  fa: { waiting: "در حال بررسی پرداخت…", paid: "پرداخت موفق بود و ثبت‌نام شما تأیید شد.",
    review: "پرداخت شما دریافت شد، اما ثبت‌نام نیاز به بررسی دارد. لطفاً با ذکر شماره سفارش با ما تماس بگیرید.",
    ended: "این رزرو لغو شده یا زمان آن به پایان رسیده است.", missing: "شناسه پرداخت موجود نیست.",
    access: "امکان بررسی رزرو نیست. این صفحه را در همان تب مرورگری که پرداخت را شروع کردید باز کنید یا وارد حسابی شوید که رزرو را با آن انجام دادید.",
    pending: "تأیید پرداخت بیشتر از معمول طول کشیده است. دوباره بررسی کنید؛ نیازی به پرداخت مجدد نیست.",
    retry: "بررسی مجدد", order: "شماره سفارش", total: "مبلغ نهایی", home: "بازگشت به صفحه اصلی" },
};

export default function PaymentSuccess() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const text = copy[lang] || copy.en;
  const [state, setState] = useState("waiting");
  const [payment, setPayment] = useState(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId?.startsWith("cs_")) { setState("missing"); return; }
    const controller = new AbortController();
    let timer;
    let count = 0;
    let access = null;
    try {
      access = JSON.parse(sessionStorage.getItem(`activity_checkout_session:${sessionId}`) ||
        sessionStorage.getItem("activity_checkout") || "null");
    } catch { /* The authenticated user can still retrieve their payment. */ }
    setState("waiting");
    const poll = async () => {
      try {
        const result = await fetchPaymentCheckoutStatus({ sessionId, guestAccessToken: access?.guestAccessToken || null },
          { signal: controller.signal });
        if (controller.signal.aborted) return;
        setPayment(result);
        if (result.status === "COMPLETED") {
          setState(result.order?.status === "PAID" && !result.failureReason ? "paid" : "review");
          return;
        }
        if (["CANCELLED", "REFUNDED", "PARTIALLY_REFUNDED"].includes(result.order?.status)) {
          setState("ended"); return;
        }
        if (++count >= 60) { setState("pending"); return; }
        timer = setTimeout(poll, 2000);
      } catch (error) {
        if (controller.signal.aborted) return;
        setState([401, 403, 404].includes(error.status) ? "access" : "pending");
      }
    };
    poll();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [attempt]);
  return (
    <main dir={lang === "fa" ? "rtl" : "ltr"} className="max-w-2xl mx-auto my-16 p-8 rounded-2xl bg-white shadow-lg text-center">
      <h1 className="text-2xl font-bold text-[#1B6269] mb-6" role="status">{text[state]}</h1>
      {payment?.order?.id && <p className="mb-3 break-all">{text.order}: {payment.order.id}</p>}
      {payment && <p className="mb-6">{text.total}: {new Intl.NumberFormat(i18n.language || "en", {
        style: "currency", currency: payment.currency }).format(payment.amount)}</p>}
      {["pending", "access"].includes(state) && <button type="button" onClick={() => setAttempt(value => value + 1)}
        className="rounded-xl bg-[#1B6269] text-white px-5 py-3 mb-5">{text.retry}</button>}
      <p><a href="/" className="underline text-[#1B6269]">{text.home}</a></p>
    </main>
  );
}
