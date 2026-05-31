import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import Mainworkshop from "./Mainworkshop";
import Otherworkshops from "./Otherworkshops";
import WorkshopDatd from "../../Data/WorkshopData";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Workshops = () => {
  const [monthcloser, setMonthcloser] = useState({});

  const grouped = WorkshopDatd.reduce((acc, workshop) => {
    const date = new Date(workshop.date);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][month]) {
      acc[year][month] = [];
    }

    acc[year][month].push(workshop);

    return acc;
  }, {});

  return (
    <div className="w-[full] lg:w-[100%] h-full flex flex-col justify-center bg-gradient-to-b from-indigo-700 via-red-500 to-purple-500">
      <div className="px-2 lg:w-[1200px]">
        <NavBar />
      </div>

      <div className="relative flex justify-center items-center h-96">
        <img
          className="w-3/4 absolute mt-40 rounded-lg shadow-lg shadow-black"
          src="https://i.etsystatic.com/44190086/r/il/003dc0/5358431678/il_fullxfull.5358431678_4d25.jpg"
          alt=""
        />
      </div>

      <div className="h-72 bg-slate-100 w-full"></div>

      <div className="w-full">
        <Mainworkshop />
      </div>

      <div className="w-full bg-white flex flex-col py-8 px-6 gap-4">
        <div>
          {Object.entries(grouped).map(([year, months]) => (
            <div key={year}>
              {/* YEAR TITLE */}
              <div className="w-full relative flex justify-center items-center my-24">
                <img
                  className="absolute w-64"
                  src="https://img.freepik.com/premium-photo/rainbow-circle-frame-abstract-watercolor-splashes-white-background_971975-16649.jpg"
                  alt=""
                />
                <h2 className="absolute text-2xl font-bold">{year}</h2>
              </div>

              {/* MONTHS */}
              {Object.entries(months).map(([month, workshops]) => {
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
                      <h3 className="text-4xl font-bold text-gray-700 cursor-pointer ">
                        Workshops in{" "}
                        {new Date(0, month).toLocaleString("default", {
                          month: "long",
                        })}
                      </h3>
                      <ChevronDown className="mt-1 cursor-pointer" />
                    </div>

                    {/* MONTH CONTENT */}
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-6 ml-4">
                      {monthcloser[key] !== false &&
                        workshops.map((workshop) => (
                          <Otherworkshops
                            key={workshop.id}
                            title={workshop.title}
                            explanation={workshop.workshopExplanation}
                            date={workshop.date}
                            image={workshop.image}
                          />
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Workshops;
