import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import AllEventCards from "./AllEventCards";
import AllEventsData from "./AllEventsData";

const AllEvents = () => {
  return (
    <div className="w-full lg:w-[100%] h-full flex flex-col justify-center ">
      <div className="hidden lg:flex lg:w-[100%] bg-gradient-to-b from-indigo-700 via-purple-600 to-purple-500">
        <div className="px-2 lg:w-[1200px]">
          <NavBar />
        </div>
      </div>
      <div className="relative flex justify-center items-center ">
        <img
          className="w-full h-[300px] lg:h-[700px]"
          src="https://www.wien.info/resource/image/428402/Hero-Header/2560/948/eab0532c4ffc86cbe44cb064dc3fe8d5/A23A316517AD476F9290E57B45F94BD6/50876-theater-an-der-wien-buehne.webp"
          alt=""
        />
        <p className="absolute pb-8 text-gray-100 text-4xl font-bold">
          Upcoming Cultural events
        </p>
      </div>
      <div className="w-full bg-white flex flex-col lg:py-8 px-6 gap-4">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 my-12 lg:gap-  ">
          {AllEventsData.map((data) => (
            <AllEventCards
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

export default AllEvents;
