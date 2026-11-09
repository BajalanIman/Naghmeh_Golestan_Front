import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Film,
  MapPin,
} from "lucide-react";
import EventFilmDetail from "./EventFilmDetail.jsx";
import "./EventFilm.css";

const getLanguage = (language = "en") => {
  const code = language.split("-")[0].toLowerCase();
  const locale =
    code === "fa" ? "fa-IR-u-ca-gregory" : code === "de" ? "de-DE" : "en-GB";
  return { code, locale };
};

const formatDate = (value, locale, timezone = "Europe/Berlin") => {
  if (!value) return "";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: timezone,
  }).format(new Date(value));
};

const formatTime = (value, locale, timezone = "Europe/Berlin") => {
  if (!value) return "";
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  }).format(new Date(value));
};

const FilmTile = ({ film, festival, onOpen, t, language }) => {
  const title = t(`event_film_film_${film.ordinal}_title`, {
    defaultValue:
      film.titleTranslations?.[language.code.toUpperCase()] ||
      film.title ||
      t("event_film_film_pending"),
  });
  const venue = (film.locationAddress || festival.locationAddress || "")
    .split(",")[0]
    .trim();

  const time = film.startAt
    ? [
        formatTime(film.startAt, language.locale, film.timezone),
        formatTime(film.endAt, language.locale, film.timezone),
      ]
        .filter(Boolean)
        .join(" – ")
    : film.plannedTime
      ? `${film.plannedTime} · ${t("event_film_planned_time")}`
      : t("event_film_time_pending");

  return (
    <article className="min-w-0 h-full">
      <button
        type="button"
        onClick={() => onOpen(film)}
        className="event-film-tile group flex h-full w-full flex-col overflow-hidden rounded-[25px] border border-[#e0e6e3] bg-white text-start shadow-[0_12px_35px_rgba(12,63,69,.09)] transition-[box-shadow,transform] duration-300 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(12,63,69,.2)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#186f77]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#123f48]">
          {film.imageUrl ? (
            <img
              src={film.imageUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="event-film-poster-placeholder flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-white/80">
              <Film className="h-12 w-12" aria-hidden="true" />
              <span className="text-sm font-medium">
                {t("event_film_poster_pending")}
              </span>
            </div>
          )}

          <span className="absolute start-4 top-4 rounded-full bg-[#0c424b]/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
            {film.startAt
              ? t("event_film_in_person")
              : t("event_film_date_pending")}
          </span>
          <span className="absolute bottom-4 end-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#155c65] shadow-md transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
          <h3
            className="min-h-[2.5rem] line-clamp-2 text-xl font-bold leading-snug text-[#163f45]"
            dir="auto"
          >
            {title}
          </h3>

          <div className="mt-4 space-y-3 text-sm text-[#586c6d]">
            <div className="flex items-start gap-2.5">
              <CalendarDays
                className="mt-0.5 h-4 w-4 shrink-0 text-[#186f77]"
                aria-hidden="true"
              />
              <span dir="auto">
                {film.startAt
                  ? formatDate(film.startAt, language.locale, film.timezone)
                  : t("event_film_date_pending")}
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock3
                className="mt-0.5 h-4 w-4 shrink-0 text-[#186f77]"
                aria-hidden="true"
              />
              <span dir="auto">{time}</span>
            </div>

            {venue && (
              <div className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#186f77]"
                  aria-hidden="true"
                />
                <span className="line-clamp-1" dir="ltr">
                  {venue}
                </span>
              </div>
            )}
          </div>

          <span className="mt-auto inline-flex items-center gap-2 border-t border-[#e7ece9] pt-5 text-sm font-bold text-[#186f77] [margin-top:1.5rem]">
            {t("event_film_view_details")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </button>
    </article>
  );
};

/** Animated film carousel. Festival homepage is intentionally rendered separately. */
const EventFilmCard = ({ festival }) => {
  const { t, i18n } = useTranslation();
  const language = getLanguage(i18n.resolvedLanguage || i18n.language || "en");

  const films = useMemo(() => {
    if (!festival) return [];

    const confirmed = [...(festival.sessions || [])].sort(
      (first, second) => new Date(first.startAt) - new Date(second.startAt),
    );

    return [...confirmed, ...(festival.pendingSessions || [])].map(
      (film, index) => ({
        ...film,
        ordinal: index + 1,
        filmKey: `film-${index}-${film.startAt || film.dateRaw || film.title}`,
      }),
    );
  }, [festival]);

  const [visibleCount, setVisibleCount] = useState(1);
  const [slide, setSlide] = useState({
    active: 0,
    outgoing: null,
    direction: 1,
  });
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const closeFilm = useCallback(() => setSelectedFilm(null), []);

  useEffect(() => {
    const updateSize = () => {
      setVisibleCount(
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1,
      );
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return undefined;

    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener?.("change", updateMotion);
    return () => media.removeEventListener?.("change", updateMotion);
  }, []);

  // If the source data changes, do not keep an out-of-range slide.
  useEffect(() => {
    setSlide((current) =>
      current.active >= films.length
        ? { active: 0, outgoing: null, direction: 1 }
        : current,
    );
  }, [films.length]);

  const isAnimating = slide.outgoing !== null;

  const navigate = useCallback(
    (step) => {
      if (films.length <= visibleCount) return;

      setSlide((current) => {
        if (current.outgoing !== null) return current;
        return {
          active: (current.active + step + films.length) % films.length,
          outgoing: current.active,
          direction: step >= 0 ? 1 : -1,
        };
      });
    },
    [films.length, visibleCount],
  );

  const navigateTo = (index) => {
    if (index === slide.active || isAnimating) return;
    setSlide((current) => ({
      active: index,
      outgoing: current.active,
      direction: index > current.active ? 1 : -1,
    }));
  };

  useEffect(() => {
    if (slide.outgoing === null) return undefined;

    const timer = window.setTimeout(
      () => {
        setSlide((current) => ({ ...current, outgoing: null }));
      },
      reducedMotion ? 0 : 520,
    );

    return () => window.clearTimeout(timer);
  }, [slide.outgoing, reducedMotion]);

  useEffect(() => {
    if (
      paused ||
      selectedFilm ||
      reducedMotion ||
      films.length <= visibleCount
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => navigate(1), 6500);
    return () => window.clearInterval(timer);
  }, [
    films.length,
    navigate,
    paused,
    reducedMotion,
    selectedFilm,
    visibleCount,
  ]);

  if (!festival || films.length === 0) return null;

  const visibleFilms = (start) =>
    Array.from(
      { length: Math.min(visibleCount, films.length) },
      (_, offset) => {
        const index = (start + offset) % films.length;
        return films[index];
      },
    );

  const renderGrid = (start) => (
    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {visibleFilms(start).map((film) => (
        <FilmTile
          key={film.filmKey}
          film={film}
          festival={festival}
          language={language}
          t={t}
          onOpen={setSelectedFilm}
        />
      ))}
    </div>
  );

  return (
    <section
      id="event-film-screenings"
      aria-labelledby="event-film-screenings-heading"
      className="w-full scroll-mt-8 bg-[#f8f6f2] px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-12"
      dir={language.code === "fa" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
          <h2
            id="event-film-screenings-heading"
            className="text-3xl font-black text-[#154f57] sm:text-4xl"
          >
            {t("event_film_screenings")}
          </h2>

          <div className="flex gap-2" dir="ltr">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isAnimating || films.length <= visibleCount}
              aria-label={t("event_film_previous")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b9ccca] bg-amber-400 text-[#145b64] transition hover:bg-[#145b64] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={isAnimating || films.length <= visibleCount}
              aria-label={t("event_film_next")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b9ccca] bg-amber-400 text-[#145b64] transition hover:bg-[#145b64] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="event-film-stage relative"
          aria-live="off"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          {slide.outgoing !== null && (
            <div
              className={`event-film-slide event-film-slide--out event-film-slide--${slide.direction > 0 ? "next" : "previous"}`}
              aria-hidden="true"
              inert=""
            >
              {renderGrid(slide.outgoing)}
            </div>
          )}

          <div
            key={slide.active}
            className={`event-film-slide ${isAnimating ? `event-film-slide--in event-film-slide--${slide.direction > 0 ? "next" : "previous"}` : ""}`}
          >
            {renderGrid(slide.active)}
          </div>
        </div>

        {films.length > visibleCount && (
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
            role="group"
            aria-label={t("event_film_screenings")}
          >
            {films.map((film, index) => (
              <button
                key={film.filmKey}
                type="button"
                aria-label={t("event_film_go_to", { number: index + 1 })}
                aria-current={index === slide.active ? "true" : undefined}
                disabled={isAnimating}
                onClick={() => navigateTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#186f77] ${
                  index === slide.active
                    ? "w-9 bg-[#186f77]"
                    : "w-2.5 bg-[#b9cbca] hover:bg-[#427c81]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <EventFilmDetail
        festival={festival}
        film={selectedFilm}
        onClose={closeFilm}
      />
    </section>
  );
};

export default EventFilmCard;
