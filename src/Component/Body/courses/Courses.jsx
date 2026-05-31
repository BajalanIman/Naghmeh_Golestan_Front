import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import CoursesCard from "./CoursesCard";
import AllEventsData from "../Events/AllEventsData";

const Courses = () => {
  return (
    <div className="w-full lg:w-[100%] h-full flex flex-col justify-center ">
      <div className="hidden lg:flex lg:w-[100%] bg-gradient-to-b from-indigo-700 via-purple-600 to-purple-500">
        <div className="px-2 lg:w-[1200px]">
          <NavBar />
        </div>
      </div>
      <div className="w-full bg-white flex flex-col lg:py-8 px-6 gap-4">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 my-12 lg:gap-6  ">
          {AllEventsData.map((data) => (
            <CoursesCard
              key={data.id}
              title={data.title}
              explanation={data.workshopExplanation}
              date={data.date}
              image={data.image}
              location={data.location}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
