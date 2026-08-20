import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import NavBar from "../../NavigationBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import DonationSection from "../Home/DonationSection.jsx";
import ActivityBooking from "../../Booking/ActivityBooking.jsx";

import { BASE_URL } from "../../../constants/constants.js";

const WorkshopDetails = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();

  const [workshop, setWorkshop] = useState(null);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const getCurrentLanguage = () => {
    const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

    const languageCode = currentLanguage.split("-")[0].toUpperCase();

    return ["EN", "DE", "FA"].includes(languageCode) ? languageCode : "EN";
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchWorkshop = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(`${BASE_URL}activities/slug/${slug}`, {
          credentials: "include",
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Workshop not found.");
        }

        if (data.activity.type !== "WORKSHOP") {
          throw new Error("The requested activity is not a workshop.");
        }

        setWorkshop(data.activity);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Workshop details error:", error);

          setErrorMessage(error.message || "Unable to load the workshop.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();

    return () => controller.abort();
  }, [slug, i18n.language, i18n.resolvedLanguage]);

  const translation = useMemo(() => {
    if (!workshop) {
      return null;
    }

    const language = getCurrentLanguage();

    return (
      workshop.translations?.find((item) => item.language === language) ||
      workshop.translations?.find((item) => item.language === "EN") ||
      workshop.translations?.[0] ||
      null
    );
  }, [workshop, i18n.language, i18n.resolvedLanguage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p>Workshop not found</p>

        {errorMessage && <p className="text-red-700">{errorMessage}</p>}
      </div>
    );
  }

  const sortedSessions = [...(workshop.sessions || [])].sort(
    (firstSession, secondSession) =>
      new Date(firstSession.startAt).getTime() -
      new Date(secondSession.startAt).getTime(),
  );

  const normalizedWorkshop = {
    ...workshop,
    sessions: sortedSessions,
  };

  const firstSession = sortedSessions[0] || null;

  const mainImage =
    workshop.bannerUrl ||
    workshop.imageUrl ||
    "https://res.cloudinary.com/r4pnipqe/image/upload/v1785446488/innerself_Pinting_xwjqh4.avif";

  const formattedPrice = workshop.isFree
    ? "Free"
    : new Intl.NumberFormat(i18n.language || "en", {
        style: "currency",
        currency: workshop.currency || "EUR",
      }).format(Number(workshop.price || 0));

  const location =
    firstSession?.location?.name ||
    firstSession?.location?.city ||
    (firstSession?.mode === "ONLINE" ? "Online" : "To be announced");

  return (
    <div className="w-full h-full flex flex-col justify-center text-[#1B6269] bg-[#F1EFEE]">
      <div className="w-full bg-[#186f77]">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center mb-8">
          {translation?.title || "Workshop"}
        </h1>

        <img
          src={mainImage}
          alt={translation?.title || "Workshop"}
          className="w-full rounded-xl shadow-lg mb-8"
        />

        <div className="flex flex-col lg:flex-row flex-wrap gap-4 justify-center mb-10 text-gray-600">
          {firstSession && (
            <p>
              <strong>Date:</strong>{" "}
              {new Date(firstSession.startAt).toLocaleString(i18n.language)}
            </p>
          )}

          <p>
            <strong>Location:</strong> {location}
          </p>

          <p>
            <strong>Price per Participant:</strong> {formattedPrice}
          </p>

          <p>
            <strong>Capacity:</strong> {workshop.capacity ?? "Unlimited"}
          </p>
        </div>

        <div className="space-y-10 text-lg leading-8">
          {translation?.summary && (
            <div>
              <h3 className="text-2xl font-bold mb-2">About this workshop</h3>

              <p>{translation.summary}</p>
            </div>
          )}

          {translation?.description && (
            <div>
              <h3 className="text-2xl font-bold mb-2">Workshop description</h3>

              <p className="whitespace-pre-line">{translation.description}</p>
            </div>
          )}

          {workshop.instructors?.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-2">Instructors</h3>

              {workshop.instructors.map((instructor) => (
                <p key={instructor.userId}>
                  {instructor.user?.firstName} {instructor.user?.lastName}
                  {instructor.role ? ` – ${instructor.role}` : ""}
                </p>
              ))}
            </div>
          )}

          {workshop.categories?.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-2">Categories</h3>

              <div className="flex flex-wrap gap-2">
                {workshop.categories.map((categoryRelation) => {
                  const category = categoryRelation.category;

                  const categoryTranslation =
                    category?.translations?.find(
                      (item) => item.language === getCurrentLanguage(),
                    ) ||
                    category?.translations?.find(
                      (item) => item.language === "EN",
                    ) ||
                    category?.translations?.[0];

                  return (
                    <span
                      key={categoryRelation.categoryId}
                      className="border border-[#1B6269] rounded-full px-4 py-1"
                    >
                      {categoryTranslation?.name || category?.slug}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shared Booking Form */}
      <div className="max-w-[1000px] mx-auto px-4 pb-16 w-full">
        <ActivityBooking
          key={workshop.id}
          activity={normalizedWorkshop}
          activityLabel="Workshop"
          sessionMode="SINGLE"
          title="Enrol in this Workshop"
          description="Choose the number of participants and complete the booking information."
          submitLabel={workshop.isFree ? "Enrol Now" : undefined}
          className="rounded-xl"
        />
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default WorkshopDetails;
