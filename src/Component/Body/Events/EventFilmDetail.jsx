import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import {
  CalendarDays,
  Clock3,
  Film,
  MapPin,
  Ticket,
  Users,
  Percent,
  X,
} from "lucide-react";

const getLanguage = (language) => {
  const code = (language || "en").split("-")[0].toLowerCase();
  return {
    code,
    locale:
      code === "fa" ? "fa-IR-u-ca-gregory" : code === "de" ? "de-DE" : "en-GB",
  };
};

const localDate = (iso, locale, timezone = "Europe/Berlin") =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: timezone,
  }).format(new Date(iso));

const localTime = (iso, locale, timezone = "Europe/Berlin") =>
  new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  }).format(new Date(iso));

const DetailItem = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-3 rounded-xl bg-[#f6f8f6] p-4">
    <div className="mt-0.5 rounded-lg bg-[#e1eded] p-2 text-[#186f77]">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </div>
    <div className="min-w-0">
      <dt className="mb-1 text-xs font-bold text-[#73817e]">{label}</dt>
      <dd className="break-words text-sm font-semibold leading-6 text-[#24494c]">
        {children}
      </dd>
    </div>
  </div>
);

/** Accessible modal with per-screening facts and festival context. */
const EventFilmDetail = ({ festival, film, onClose }) => {
  const { t, i18n } = useTranslation();
  const lang = getLanguage(i18n.resolvedLanguage || i18n.language);
  const closeButton = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    if (!film) return undefined;

    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab" && panel.current) {
        const focusable = [
          ...panel.current.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [film, onClose]);

  if (!film || !festival) return null;

  const title = t(`event_film_film_${film.ordinal}_title`, {
    defaultValue:
      film.titleTranslations?.[lang.code.toUpperCase()] ||
      film.title ||
      t("event_film_film_pending"),
  });
  const timezone = film.timezone || "Europe/Berlin";
  const start = film.startAt;
  const time = start
    ? `${localTime(start, lang.locale, timezone)} – ${film.endAt ? localTime(film.endAt, lang.locale, timezone) : ""}`
    : film.plannedTime || t("event_film_time_pending");
  const address = film.locationAddress || festival.locationAddress;
  const price = film.price ?? festival.price;
  const priceText = festival.isFree
    ? t("event_film_free")
    : price === null || price === undefined
      ? t("event_film_price_unannounced")
      : new Intl.NumberFormat(lang.locale, {
          style: "currency",
          currency: festival.currency || "EUR",
        }).format(Number(price));

  return createPortal(
    <div
      className="event-film-modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b2e35]/80 px-3 py-5 backdrop-blur-sm sm:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      dir={lang.code === "fa" ? "rtl" : "ltr"}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-film-detail-title"
        className="event-film-modal-panel relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[24px] bg-white shadow-[0_35px_95px_rgba(0,0,0,.35)] sm:rounded-[30px]"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label={t("event_film_close")}
          className="absolute end-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#234b50] shadow-md transition hover:bg-[#e7f1ef] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#186f77] sm:end-6 sm:top-6"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="grid lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-72 bg-[#0e454e] lg:min-h-full">
            {film.imageUrl ? (
              <img
                src={film.imageUrl}
                alt={title}
                className="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-[620px]"
              />
            ) : (
              <div className="event-film-poster-placeholder flex h-72 flex-col items-center justify-center gap-4 px-7 text-center text-white/80 sm:h-96 lg:h-full lg:min-h-[620px]">
                <Film className="h-20 w-20" aria-hidden="true" />
                <p>{t("event_film_poster_pending")}</p>
              </div>
            )}
          </div>

          <div className="px-5 pb-9 pt-9 sm:px-10 sm:pb-12 sm:pt-14">
            <span className="mb-3 inline-block rounded-full bg-[#e9f2f1] px-4 py-1.5 text-xs font-bold text-[#16606a]">
              {t("event_film_festival_title")}
            </span>
            <h2
              id="event-film-detail-title"
              className="mb-7 pe-12 text-2xl font-black leading-tight text-[#154f57] sm:text-4xl"
              dir="auto"
            >
              {title}
            </h2>

            <h3 className="mb-4 text-lg font-black text-[#234b50]">
              {t("event_film_screening_details")}
            </h3>
            <dl className="grid gap-3 sm:grid-cols-2">
              <DetailItem icon={CalendarDays} label={t("event_film_date")}>
                {start
                  ? localDate(start, lang.locale, timezone)
                  : t("event_film_date_pending")}
              </DetailItem>
              <DetailItem
                icon={Clock3}
                label={
                  start ? t("event_film_time") : t("event_film_planned_time")
                }
              >
                <span dir="auto">{time}</span>
              </DetailItem>
              <DetailItem icon={MapPin} label={t("event_film_venue")}>
                <span dir="ltr" className="inline-block text-start">
                  {address || t("event_film_venue_unannounced")}
                </span>
              </DetailItem>
              <DetailItem icon={Ticket} label={t("event_film_ticket_price")}>
                {priceText}
              </DetailItem>
              {film.capacity != null && (
                <DetailItem icon={Users} label={t("event_film_capacity")}>
                  {t("event_film_seats", { count: film.capacity })}
                </DetailItem>
              )}
              {film.discountPercent != null && (
                <DetailItem icon={Percent} label={t("event_film_discount")}>
                  {t("event_film_discount_value", {
                    percent: film.discountPercent,
                  })}
                </DetailItem>
              )}
            </dl>

            {/* {film.dateStatus === "AMBIGUOUS" && film.dateRaw && (
              <p className="mt-5 rounded-xl border border-[#efd8b5] bg-[#fff9ed] p-3 text-sm leading-6 text-[#84673b]">
                {t("event_film_ambiguous_date", { date: film.dateRaw })}
              </p>
            )} */}

            <div className="mt-8 border-t border-[#e2e8e5] pt-7">
              <h3 className="mb-3 text-lg font-black text-[#234b50]">
                {t("event_film_about_festival")}
              </h3>
              <p className="whitespace-pre-line text-sm leading-7 text-[#5a6b68]">
                {t("event_film_festival_description")}
              </p>
              <p className="mt-5 text-xs leading-6 text-[#7f8e89]">
                {t("event_film_information_note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default EventFilmDetail;
