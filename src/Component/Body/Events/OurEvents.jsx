import { useEffect, useMemo, useState } from "react";
import NavBar from "../../NavigationBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import DonationSection from "../Home/DonationSection.jsx";
import ActivityBooking from "../../Booking/ActivityBooking.jsx";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../constants/constants.js";

const OurEvents = () => {
  const { i18n } = useTranslation();

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getCurrentLanguage = () => {
    const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

    const languageCode = currentLanguage.split("-")[0].toUpperCase();

    return ["EN", "DE", "FA"].includes(languageCode) ? languageCode : "EN";
  };

  const getTranslation = (activity) => {
    const language = getCurrentLanguage();

    return (
      activity.translations?.find(
        (translation) => translation.language === language,
      ) ||
      activity.translations?.find(
        (translation) => translation.language === "EN",
      ) ||
      activity.translations?.[0] ||
      null
    );
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `${BASE_URL}activities?type=EVENT&language=${getCurrentLanguage()}&limit=50`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load events.");
        }

        const loadedEvents = data.activities || [];

        setEvents(loadedEvents);

        setSelectedEventId((currentId) => {
          if (
            currentId &&
            loadedEvents.some((activity) => activity.id === currentId)
          ) {
            return currentId;
          }

          return loadedEvents[0]?.id || null;
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Events loading error:", error);

          setErrorMessage(error.message || "Unable to load events.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    return () => controller.abort();
  }, [i18n.language, i18n.resolvedLanguage]);

  const normalizedEvents = useMemo(() => {
    return events
      .map((activity) => {
        const translation = getTranslation(activity);

        const sortedSessions = [...(activity.sessions || [])].sort(
          (firstSession, secondSession) =>
            new Date(firstSession.startAt) - new Date(secondSession.startAt),
        );

        const firstSession = sortedSessions[0] || null;

        return {
          ...activity,
          sessions: sortedSessions,

          title: translation?.title || "Cultural Event",

          description: translation?.summary || translation?.description || "",

          fullDescription:
            translation?.description || translation?.summary || "",

          image:
            activity.bannerUrl ||
            activity.imageUrl ||
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",

          firstSession,
        };
      })
      .sort((firstEvent, secondEvent) => {
        if (!firstEvent.firstSession && !secondEvent.firstSession) {
          return 0;
        }

        if (!firstEvent.firstSession) {
          return 1;
        }

        if (!secondEvent.firstSession) {
          return -1;
        }

        return (
          new Date(firstEvent.firstSession.startAt) -
          new Date(secondEvent.firstSession.startAt)
        );
      })
      .map((event, index) => ({
        ...event,
        week: index + 1,
      }));
  }, [events, i18n.language, i18n.resolvedLanguage]);

  const selectedEvent =
    normalizedEvents.find((event) => event.id === selectedEventId) || null;

  const formatCurrency = (value, currency = "EUR") => {
    return new Intl.NumberFormat(i18n.language || "en", {
      style: "currency",
      currency,
    }).format(Number(value || 0));
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-2xl">
        Loading events...
      </div>
    );
  }

  if (!selectedEvent) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-[#F1EFEE]">
        <div className="w-full bg-[#186f77]">
          <div className="mx-auto lg:w-[1200px]">
            <NavBar />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-xl px-6">
          <p>No published events are currently available.</p>

          {errorMessage && (
            <p className="text-red-700 text-base">{errorMessage}</p>
          )}
        </div>

        <Footer />
      </div>
    );
  }

  const session = selectedEvent.firstSession;

  const location =
    session?.location?.name ||
    session?.location?.city ||
    (session?.mode === "ONLINE" ? "Online" : "To be announced");

  const formattedPrice = selectedEvent.isFree
    ? "Free"
    : formatCurrency(selectedEvent.price, selectedEvent.currency);

  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#F1EFEE]">
      {/* NAVBAR */}
      <div className="w-full bg-[#186f77]">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex justify-center items-center">
        <img
          className="w-full h-[300px] lg:h-[700px] object-cover"
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1785350850/over_event_ib9eqk.png"
          alt="Cultural Events"
        />

        <p className="absolute pb-8 text-gray-100 text-4xl font-bold text-center px-6">
          Upcoming Cultural Events
        </p>
      </div>

      {/* Introduction */}
      <div className="py-6 px-6">
        <p className="text-5xl font-bold">{selectedEvent.title}</p>

        <p className="text-xl mt-5">{selectedEvent.description}</p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-16 w-full">
        {/* Event Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {normalizedEvents.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => setSelectedEventId(event.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedEvent.id === event.id
                  ? "bg-[#186f77] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Event {event.week}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Poster */}
          <div>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="rounded-xl shadow-xl w-full h-[550px] object-fit"
            />
          </div>

          {/* Event Details */}
          {/* Event Details */}
          <div className="space-y-6">
            {selectedEvent.fullDescription && (
              <p className="text-gray-600 leading-7 whitespace-pre-line">
                {selectedEvent.fullDescription}
              </p>
            )}

            <div className="flex flex-wrap gap-8 text-lg">
              {session && (
                <>
                  <p>
                    📅{" "}
                    <strong>
                      {new Date(session.startAt).toLocaleDateString(
                        i18n.language,
                      )}
                    </strong>
                  </p>

                  <p>
                    🕖{" "}
                    <strong>
                      {new Date(session.startAt).toLocaleTimeString(
                        i18n.language,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </strong>
                  </p>
                </>
              )}

              <div className="flex flex-row">
                {/* <strong>{location}</strong> */}
                <strong>Kunst-Stoffe- Materialmarkt Pankow</strong>
                <strong>Berliner Str. 17, 13189 Berlin</strong>
              </div>
            </div>

            <div className="text-3xl font-bold text-[#186f77]">
              {formattedPrice}
            </div>

            <p className="font-semibold">
              Capacity: {selectedEvent.capacity ?? "Unlimited"}
            </p>

            <ActivityBooking
              key={selectedEvent.id}
              activity={selectedEvent}
              activityLabel="Event"
              sessionMode="SINGLE"
              title="Book this Event"
              description="Select the number of participants and complete the booking information."
              submitLabel={
                selectedEvent.isFree ? "Reserve Event Places" : undefined
              }
              className="mt-6"
            />
          </div>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default OurEvents;
