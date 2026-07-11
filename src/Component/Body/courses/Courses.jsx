// import NavBar from "../../NavigationBar/NavBar";
// import Footer from "../Footer/Footer";
// import CoursesCard from "./CoursesCard";
// import AllEventsData from "../Events/AllEventsData";

// const Courses = () => {
//   return (
//     <div className="w-full lg:w-[100%] h-full flex flex-col justify-center ">
//       <div className="hidden lg:flex lg:w-[100%] bg-gradient-to-b from-indigo-700 via-purple-600 to-purple-500">
//         <div className="px-2 lg:w-[1200px]">
//           <NavBar />
//         </div>
//       </div>
//       <div className="w-full bg-white flex flex-col lg:py-8 px-6 gap-4">
//         <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 my-12 lg:gap-6  ">
//           {AllEventsData.map((data) => (
//             <CoursesCard
//               key={data.id}
//               title={data.title}
//               explanation={data.workshopExplanation}
//               date={data.date}
//               image={data.image}
//               location={data.location}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Courses;
import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import CoursesCard from "./CoursesCard";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import CourseImage from "../../../../public/CourseImage.png";
import DonationSection from "../Home/DonationSection";

const Courses = () => {
  const { t } = useTranslation();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthcloser, setMonthcloser] = useState({});
  const { i18n } = useTranslation();
  const lang = i18n.language;
  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/courses?lang=${i18n.language}`,
        );
        const data = await res.json();

        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [i18n.language]);

  console.log(courses);
  // 🧠 GROUP BY YEAR + MONTH
  const grouped = courses.reduce((acc, course) => {
    const date = new Date(course.date);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];

    acc[year][month].push(course);

    return acc;
  }, {});

  // ⏳ LOADING STATE
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-2xl">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#F1EFEE]">
      {/* NAVBAR */}
      <div className=" w-full bg-[#186f77] ">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>
      {/* Only for netlify */}
      {/* <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-6 pl-4 bg-white py-12">
        <CoursesCard
          key={40}
          id={40}
          title={"Course one"}
          explanation={
            "Wenn Sie schon mal eine neue Maus, einen Drucker oder ein anderes Peripheriegerät zu Ihrem Computer hinzugefügt..."
          }
          date={"12.12.2026"}
          image={
            "https://images.stockcake.com/public/4/c/7/4c70a9b3-eff2-4ece-9bb1-719754c48a90_large/innovative-workshop-activity-stockcake.jpg"
          }
          paragraphs={"Course.paragraphs"}
        />
        <CoursesCard
          key={41}
          id={41}
          title={"Course two"}
          explanation={
            "Wenn Sie schon mal eine neue Maus, einen Drucker oder ein anderes Peripheriegerät zu Ihrem Computer hinzugefügt..."
          }
          date={"12.12.2026"}
          image={
            "https://images.stockcake.com/public/4/c/7/4c70a9b3-eff2-4ece-9bb1-719754c48a90_large/innovative-workshop-activity-stockcake.jpg"
          }
          paragraphs={"Course.paragraphs"}
        />
        <CoursesCard
          key={42}
          id={42}
          title={"Course three"}
          explanation={
            "Wenn Sie schon mal eine neue Maus, einen Drucker oder ein anderes Peripheriegerät zu Ihrem Computer hinzugefügt..."
          }
          date={"12.12.2026"}
          image={
            "https://images.stockcake.com/public/4/c/7/4c70a9b3-eff2-4ece-9bb1-719754c48a90_large/innovative-workshop-activity-stockcake.jpg"
          }
          paragraphs={"Course.paragraphs"}
        />
      </div> */}
      {/* WORKSHOPS LIST */}
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

              return (
                <div key={key}>
                  {/* MONTH HEADER */}
                  <div
                    onClick={() => {
                      setMonthcloser((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }));
                    }}
                    className="w-full mb-5 mt-12 gap-3 flex justify-center items-center"
                  >
                    <h3 className="text-4xl font-bold text-gray-700 cursor-pointer">
                      Courses in{" "}
                      {new Date(0, month).toLocaleString("default", {
                        month: "long",
                      })}
                    </h3>
                    <ChevronDown className="mt-1 cursor-pointer" />
                  </div>

                  {/* MONTH CONTENT */}
                  <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 my-12 lg:gap-6">
                    {monthcloser[key] !== false &&
                      items.map((course) => (
                        <CoursesCard
                          key={course.id}
                          id={course.id}
                          title={course.title}
                          explanation={course.explanation}
                          date={course.date}
                          image={course.image}
                          paragraphs={course.paragraphs}
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

export default Courses;
