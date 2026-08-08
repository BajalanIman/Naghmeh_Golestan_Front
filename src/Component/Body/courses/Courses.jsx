import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import CoursesCard from "./CoursesCard";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import CourseImage from "../../../../public/CourseImage.png";
import DonationSection from "../Home/DonationSection";
import { BASE_URL } from "../../../constants/constants";

const Courses = () => {
  const { t, i18n } = useTranslation();

  const [courses, setCourses] = useState([]);
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

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const language = getCurrentLanguage();

        const response = await fetch(
          `${BASE_URL}activities?type=COURSE&language=${language}&limit=50`,
          {
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load courses.");
        }

        setCourses(data.activities || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch courses:", error);

          setErrorMessage(error.message || "Failed to load courses.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

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

  const normalizedCourses = useMemo(() => {
    return courses
      .map((activity) => {
        const translation = getTranslation(activity);
        const firstSession = activity.sessions?.[0] || null;

        return {
          id: activity.id,
          slug: activity.slug,
          title: translation?.title || "Course",
          explanation: translation?.summary || translation?.description || "",
          date: firstSession?.startAt || activity.publishedAt,
          image:
            activity.imageUrl ||
            activity.bannerUrl ||
            "https://images.stockcake.com/public/4/c/7/4c70a9b3-eff2-4ece-9bb1-719754c48a90_large/innovative-workshop-activity-stockcake.jpg",
          price: activity.price,
          currency: activity.currency,
          isFree: activity.isFree,
          sessions: activity.sessions || [],
        };
      })
      .filter((course) => course.date);
  }, [courses, i18n.language]);

  const grouped = useMemo(() => {
    return normalizedCourses.reduce((accumulator, course) => {
      const date = new Date(course.date);

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

      accumulator[year][month].push(course);

      return accumulator;
    }, {});
  }, [normalizedCourses]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-[#1B6269] text-2xl">
        Loading courses...
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

      {errorMessage && (
        <p className="text-center text-red-700 py-10">{errorMessage}</p>
      )}

      {!errorMessage && normalizedCourses.length === 0 && (
        <p className="text-center text-[#1B6269] text-xl py-16">
          No published courses are currently available.
        </p>
      )}

      {/* COURSES LIST */}
      <div className="w-full flex flex-col mt-12 lg:mt-0 py-2 px-6 gap-4">
        {Object.entries(grouped).map(([year, months]) => (
          <div key={year}>
            {/* YEAR TITLE */}
            <div className="w-full relative flex justify-center items-center my-32">
              <img className="absolute w-96" src={CourseImage} alt="" />

              <h2 className="absolute text-2xl font-bold text-teal-900 mb-16">
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
                    <h3 className="text-4xl font-bold text-gray-700 cursor-pointer">
                      Courses in {monthName}
                    </h3>

                    <ChevronDown
                      className={`mt-1 cursor-pointer transition-transform ${
                        monthcloser[key] === false ? "-rotate-90" : ""
                      }`}
                    />
                  </div>

                  {/* MONTH CONTENT */}
                  <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 my-12 lg:gap-6">
                    {monthcloser[key] !== false &&
                      items.map((course) => (
                        <CoursesCard
                          key={course.id}
                          id={course.id}
                          slug={course.slug}
                          title={course.title}
                          explanation={course.explanation}
                          date={course.date}
                          image={course.image}
                          price={course.price}
                          currency={course.currency}
                          isFree={course.isFree}
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
      <Footer />
    </div>
  );
};

export default Courses;
