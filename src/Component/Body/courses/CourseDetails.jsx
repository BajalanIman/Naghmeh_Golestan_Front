import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import NavBar from "../../NavigationBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import DonationSection from "../Home/DonationSection.jsx";
import ActivityBooking from "../../Booking/ActivityBooking.jsx";

import { BASE_URL } from "../../../constants/constants.js";

const CourseDetails = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getCurrentLanguage = () => {
    const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

    const languageCode = currentLanguage.split("-")[0].toUpperCase();

    return ["EN", "DE", "FA"].includes(languageCode) ? languageCode : "EN";
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(`${BASE_URL}activities/slug/${slug}`, {
          credentials: "include",
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Course not found.");
        }

        if (data.activity.type !== "COURSE") {
          throw new Error("The requested activity is not a course.");
        }

        setCourse(data.activity);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Course details error:", error);

          setErrorMessage(error.message || "Unable to load the course.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();

    return () => controller.abort();
  }, [slug, i18n.language, i18n.resolvedLanguage]);

  const translation = useMemo(() => {
    if (!course) {
      return null;
    }

    const language = getCurrentLanguage();

    return (
      course.translations?.find((item) => item.language === language) ||
      course.translations?.find((item) => item.language === "EN") ||
      course.translations?.[0] ||
      null
    );
  }, [course, i18n.language, i18n.resolvedLanguage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p>Course not found</p>

        {errorMessage && <p className="text-red-700">{errorMessage}</p>}
      </div>
    );
  }

  const sortedSessions = [...(course.sessions || [])].sort(
    (firstSession, secondSession) =>
      new Date(firstSession.startAt).getTime() -
      new Date(secondSession.startAt).getTime(),
  );

  const normalizedCourse = {
    ...course,
    sessions: sortedSessions,
  };

  const firstSession = sortedSessions[0] || null;

  const mainImage =
    course.bannerUrl ||
    course.imageUrl ||
    "https://images.stockcake.com/public/4/c/7/4c70a9b3-eff2-4ece-9bb1-719754c48a90_large/innovative-workshop-activity-stockcake.jpg";

  const formattedPrice = course.isFree
    ? "Free"
    : new Intl.NumberFormat(i18n.language || "en", {
        style: "currency",
        currency: course.currency || "EUR",
      }).format(Number(course.price || 0));

  const location =
    firstSession?.location?.name ||
    firstSession?.location?.city ||
    (firstSession?.mode === "ONLINE" ? "Online" : "To be announced");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-indigo-700 via-purple-600 to-purple-500">
        <div className="mx-auto max-w-[1200px] px-4">
          <NavBar />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <img
            src={mainImage}
            alt={translation?.title || "Course"}
            className="w-full h-[350px] lg:h-[500px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="flex flex-wrap gap-3 mb-4">
              {firstSession && (
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                  📅{" "}
                  {new Date(firstSession.startAt).toLocaleDateString(
                    i18n.language,
                  )}
                </span>
              )}

              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                📍 {location}
              </span>
            </div>

            <h1 className="text-3xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
              {translation?.title || "Course"}
            </h1>
          </div>
        </div>

        {/* Body text */}
        <div className="space-y-8">
          {translation?.summary && (
            <div className="bg-white rounded-2xl p-6 lg:p-8 mt-3 shadow-md hover:shadow-xl transition-all duration-300 border border-violet-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-100 text-2xl">
                  📖
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-violet-900">
                    About this course
                  </h3>

                  <div className="w-16 h-1 bg-violet-500 rounded-full mt-2" />
                </div>
              </div>

              <p className="text-gray-700 leading-8 text-lg">
                {translation.summary}
              </p>
            </div>
          )}

          {translation?.description && (
            <div className="bg-white rounded-2xl p-6 lg:p-8 mt-3 shadow-md hover:shadow-xl transition-all duration-300 border border-violet-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-100 text-2xl">
                  🎯
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-violet-900">
                    Course description
                  </h3>

                  <div className="w-16 h-1 bg-violet-500 rounded-full mt-2" />
                </div>
              </div>

              <p className="text-gray-700 leading-8 text-lg whitespace-pre-line">
                {translation.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ENROLMENT SECTION */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info Card */}
          <div className="bg-violet-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Course Information</h3>

            <div className="space-y-5">
              <div>
                <p className="text-violet-200 text-sm">Start Date</p>

                <p className="font-semibold">
                  {firstSession
                    ? new Date(firstSession.startAt).toLocaleDateString(
                        i18n.language,
                      )
                    : "To be announced"}
                </p>
              </div>

              <div>
                <p className="text-violet-200 text-sm">Location</p>

                <p className="font-semibold">{location}</p>
              </div>

              <div>
                <p className="text-violet-200 text-sm">Duration</p>

                <p className="font-semibold">
                  {course.sessions?.length || 0}{" "}
                  {course.sessions?.length === 1 ? "Session" : "Sessions"}
                </p>
              </div>

              <div>
                <p className="text-violet-200 text-sm">Capacity</p>

                <p className="font-semibold">
                  {course.capacity ?? "Unlimited"}
                </p>
              </div>

              <div className="border-t border-violet-700 pt-5">
                <p className="text-sm text-violet-200">
                  Course Fee per Participant
                </p>

                <p className="text-3xl font-bold">{formattedPrice}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-violet-700 pt-6">
              <p className="text-sm text-violet-200">
                Complete the form to reserve up to five places in this course.
              </p>
            </div>
          </div>

          {/* Shared Booking Form */}
          <div className="lg:col-span-2">
            <ActivityBooking
              key={course.id}
              activity={normalizedCourse}
              activityLabel="Course"
              sessionMode="ALL"
              requireConsent
              title="Enrol in this Course"
              description="Reserve your place and join our creative community."
              consentText="I agree to be contacted regarding this course registration."
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default CourseDetails;
