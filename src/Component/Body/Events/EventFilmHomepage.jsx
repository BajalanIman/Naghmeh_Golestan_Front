import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  CalendarDays,
  Film,
  MapPin,
  Sparkles,
} from "lucide-react";
import "./EventFilm.css";
import FilmFestival from "./golestan_film_festiva.json";
import { Link } from "react-router-dom";

/** Festival introduction. This component is independent of EventFilmCard. */
const EventFilmHomepage = () => {
  const { t, i18n } = useTranslation();
  const languageCode = (i18n.resolvedLanguage || i18n.language || "en")
    .split("-")[0]
    .toLowerCase();

  if (!FilmFestival) return null;

  const filmCount =
    (FilmFestival.sessions?.length || 0) +
    (FilmFestival.pendingSessions?.length || 0);
  const poster = FilmFestival.bannerUrl || FilmFestival.imageUrl;
  const venue = FilmFestival.locationAddress?.split(",")[0]?.trim();

  return (
    <section
      aria-labelledby="event-film-heading"
      className="w-full bg-[#f8f6f2] px-4 pt-16 sm:px-6 lg:pt-24"
      dir={languageCode === "fa" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl">
        <div className="event-film-hero relative isolate overflow-hidden rounded-[30px] bg-[#124e57] text-white shadow-[0_25px_65px_rgba(0,52,59,.16)] lg:rounded-[36px]">
          <div className="pointer-events-none absolute -end-12 -top-24 h-72 w-72 rounded-full border border-white/10 bg-[#0d4f53]" />
          <div className="pointer-events-none absolute -bottom-32 start-12 h-80 w-80 rounded-full border border-white/10 bg-[#0d4f53]" />

          <div className="relative z-10 grid gap-9 p-6 sm:p-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-12 lg:p-14">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[.12em] text-[#e1f2ed]">
                <Sparkles
                  className="h-4 w-4 text-[#e7c5a5]"
                  aria-hidden="true"
                />
                {t("event_film_eyebrow")}
              </span>

              <h2
                id="event-film-heading"
                className="mb-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
              >
                {t("event_film_festival_title")}
              </h2>

              <p className="mb-4 text-xl font-semibold text-[#f0d4b5] sm:text-2xl">
                {t("event_film_theme")}
              </p>

              <p className="max-w-2xl text-base leading-8 text-[#d9e8e6] sm:text-lg">
                {t("event_film_festival_intro")}
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#e9f3f0]">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {t("event_film_period")}
                </span>
                {venue && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span dir="ltr">{venue}</span>
                  </span>
                )}
              </div>

              {filmCount > 0 && (
                <Link
                  to="/ourevents"
                  href="#event-film-screenings"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#f1d1ad] px-6 py-3.5 text-sm font-extrabold text-[#124e57] transition hover:bg-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {t("event_film_explore")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rotate-3 rounded-[28px] border border-white/20 bg-[#0d4f53]" />
              {poster ? (
                <img
                  src={poster}
                  alt={t("event_film_festival_title")}
                  className="relative h-72 w-full rounded-[22px] object-cover shadow-2xl sm:h-[360px] lg:h-[425px]"
                />
              ) : (
                <div className="event-film-poster-placeholder relative flex h-72 items-center justify-center rounded-[22px] sm:h-[360px] lg:h-[425px]">
                  <Film
                    className="h-20 w-20 text-white/80"
                    aria-hidden="true"
                  />
                </div>
              )}

              <span className="absolute bottom-5 start-5 rounded-full bg-white/95 px-4 py-2 text-xs font-black text-[#12525a] shadow-md">
                {t("event_film_screening_count", { count: filmCount })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventFilmHomepage;
