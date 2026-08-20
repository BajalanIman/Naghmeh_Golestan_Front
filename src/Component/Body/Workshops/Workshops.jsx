import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import Mainworkshop from "./Mainworkshop";
import Otherworkshops from "./Otherworkshops";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import DonationSection from "../Home/DonationSection";
import { BASE_URL } from "../../../constants/constants";

const Workshops = () => {
  const { t, i18n } = useTranslation();

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [monthcloser, setMonthcloser] = useState({});

  const getCurrentLanguage = () => {
    const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

    const languageCode = currentLanguage.split("-")[0].toUpperCase();

    return ["EN", "DE", "FA"].includes(languageCode) ? languageCode : "EN";
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const language = getCurrentLanguage();

        const response = await fetch(
          `${BASE_URL}activities?type=WORKSHOP&language=${language}&limit=50`,
          {
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load workshops.");
        }

        setWorkshops(data.activities || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch workshops:", error);

          setErrorMessage(error.message || "Failed to load workshops.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();

    return () => controller.abort();
  }, [i18n.language]);

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

  const normalizedWorkshops = useMemo(() => {
    return workshops
      .map((activity) => {
        const translation = getTranslation(activity);
        const firstSession = activity.sessions?.[0] || null;

        return {
          id: activity.id,
          slug: activity.slug,
          title: translation?.title || "Workshop",
          explanation: translation?.summary || translation?.description || "",
          description: translation?.description || "",
          date: firstSession?.startAt || activity.publishedAt,
          image:
            activity.imageUrl ||
            activity.bannerUrl ||
            "https://res.cloudinary.com/r4pnipqe/image/upload/v1783760353/HelpCenterImage_dlqhle.jpg",
          price: activity.price,
          currency: activity.currency,
          isFree: activity.isFree,
          isFeatured: activity.isFeatured,
          sessions: activity.sessions || [],
          originalActivity: activity,
        };
      })
      .filter((workshop) => workshop.date);
  }, [workshops, i18n.language]);

  const mainWorkshop =
    normalizedWorkshops.find((workshop) => workshop.isFeatured) ||
    normalizedWorkshops[0] ||
    null;

  const grouped = useMemo(() => {
    return normalizedWorkshops.reduce((accumulator, workshop) => {
      const date = new Date(workshop.date);

      if (Number.isNaN(date.getTime())) {
        return accumulator;
      }

      const year = date.getFullYear();
      const month = date.getMonth();

      if (!accumulator[year]) {
        accumulator[year] = {};
      }

      if (!accumulator[year][month]) {
        accumulator[year][month] = [];
      }

      accumulator[year][month].push(workshop);

      return accumulator;
    }, {});
  }, [normalizedWorkshops]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-[#1B6269] text-2xl">
        Loading workshops...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#F1EFEE]">
      {/* NAVBAR */}
      <div className="w-full bg-[#186f77]">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="relative flex justify-center items-center ">
        <img
          className="lg:w-full object-cover lg:rounded-lg lg:shadow-lg shadow-black max-h-[500px]"
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783760353/HelpCenterImage_dlqhle.jpg"
          alt="Workshops"
        />
      </div>

      <div className="lg:h-72 w-full"></div>

      {/* MAIN WORKSHOP */}
      <div className="w-full">
        <Mainworkshop
          workshop={mainWorkshop}
          HomepageMainWorkshopTitle={t("HomepageMainWorkshopTitle")}
          HomepageMainWorkshopText={t("HomepageMainWorkshopText")}
          ContinueReading={t("ContinueReading")}
        />
      </div>

      {errorMessage && (
        <p className="text-center text-red-700 py-8">{errorMessage}</p>
      )}

      {!errorMessage && normalizedWorkshops.length === 0 && (
        <p className="text-center text-[#1B6269] text-xl py-16">
          No published workshops are currently available.
        </p>
      )}

      {/* WORKSHOPS LIST */}
      <div className="w-full flex flex-col py-8 px-6 gap-4">
        {Object.entries(grouped).map(([year, months]) => (
          <div key={year}>
            {/* YEAR TITLE */}
            <div className="w-full relative flex justify-center items-center my-32">
              <img
                className="absolute w-96"
                src="https://res.cloudinary.com/r4pnipqe/image/upload/v1787209461/WorkshopsImage-background-F1EFEE_iqulyg.png"
                alt="WorkshopsImage"
              />

              <h2 className="absolute text-4xl font-bold text-teal-900">
                {year}
              </h2>
            </div>

            {/* MONTHS */}
            {Object.entries(months).map(([month, items]) => {
              const key = `${year}-${month}`;

              const monthName = new Date(
                Number(year),
                Number(month),
                1,
              ).toLocaleString(i18n.language || "en", {
                month: "long",
              });

              return (
                <div key={key}>
                  {/* MONTH HEADER */}
                  <div
                    onClick={() => {
                      setMonthcloser((previousState) => ({
                        ...previousState,
                        [key]: !previousState[key],
                      }));
                    }}
                    className="w-full mb-5 mt-12 gap-3 flex justify-center items-center"
                  >
                    <h3 className="text-4xl font-bold text-[#1B6269] cursor-pointer">
                      Workshops in {monthName}
                    </h3>

                    <ChevronDown
                      className={`mt-1 cursor-pointer transition-transform ${
                        monthcloser[key] === false ? "-rotate-90" : ""
                      }`}
                    />
                  </div>

                  {/* MONTH CONTENT */}
                  <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-6 ml-4">
                    {monthcloser[key] !== false &&
                      items.map((workshop) => (
                        <Otherworkshops
                          key={workshop.id}
                          id={workshop.id}
                          slug={workshop.slug}
                          title={workshop.title}
                          explanation={workshop.explanation}
                          date={workshop.date}
                          image={workshop.image}
                          price={workshop.price}
                          currency={workshop.currency}
                          isFree={workshop.isFree}
                        />
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <DonationSection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Workshops;
