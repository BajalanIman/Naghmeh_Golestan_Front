import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import Mainworkshop from "./Mainworkshop";
import Otherworkshops from "./Otherworkshops";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkshopsImage from "../../../../public/WorkshopsImage.png";
import { useTranslation } from "react-i18next";
import DonationSection from "../Home/DonationSection";

const Workshops = () => {
  const { t } = useTranslation();

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthcloser, setMonthcloser] = useState({});
  const { i18n } = useTranslation();
  const lang = i18n.language;
  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/workshops?lang=${i18n.language}`,
        );
        const data = await res.json();
        setWorkshops(data);
      } catch (err) {
        console.error("Failed to fetch workshops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [i18n.language]);

  console.log(workshops);
  // 🧠 GROUP BY YEAR + MONTH
  const grouped = workshops.reduce((acc, workshop) => {
    const date = new Date(workshop.date);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];

    acc[year][month].push(workshop);

    return acc;
  }, {});

  // ⏳ LOADING STATE
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-2xl">
        Loading workshops...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center bg-gradient-to-b from-indigo-700 via-red-500 to-purple-500">
      {/* NAVBAR */}
      <div className="mx-auto lg:w-[1200px]">
        <NavBar />
      </div>

      {/* HERO IMAGE */}
      <div className="relative flex justify-center items-center h-64 lg:h-96">
        <img
          className="w-3/4 absolute lg:mt-40 rounded-lg lg:shadow-lg shadow-black"
          src="https://i.etsystatic.com/44190086/r/il/003dc0/5358431678/il_fullxfull.5358431678_4d25.jpg"
          alt=""
        />
      </div>

      <div className="lg:h-72 bg-slate-100 w-full"></div>

      {/* MAIN WORKSHOP */}
      <div className="w-full">
        <Mainworkshop
          HomepageMainWorkshopTitle={t("HomepageMainWorkshopTitle")}
          HomepageMainWorkshopText={t("HomepageMainWorkshopText")}
          ContinueReading={t("ContinueReading")}
        />
      </div>
      {/* Only to show in netlify */}
      {/* <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-6 pl-4 bg-white py-12">
        <Otherworkshops
          key={45}
          id={45}
          title={"Workshop one"}
          explanation={
            "Wenn Sie schon mal eine neue Maus, einen Drucker oder ein anderes Peripheriegerät zu Ihrem Computer hinzugefügt..."
          }
          date={"12.12.2026"}
          image={
            "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"
          }
          paragraphs={"workshop.paragraphs"}
        />
        <Otherworkshops
          key={46}
          id={46}
          title={"Workshop two"}
          explanation={
            "Wenn Sie schon mal eine neue Maus, einen Drucker oder ein anderes Peripheriegerät zu Ihrem Computer hinzugefügt..."
          }
          date={"12.12.2026"}
          image={
            "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"
          }
          paragraphs={"workshop.paragraphs"}
        />
        <Otherworkshops
          key={47}
          id={47}
          title={"Workshop three"}
          explanation={
            "Wenn Sie schon mal eine neue Maus, einen Drucker oder ein anderes Peripheriegerät zu Ihrem Computer hinzugefügt..."
          }
          date={"12.12.2026"}
          image={
            "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"
          }
          paragraphs={"workshop.paragraphs"}
        />
      </div> */}
      {/* WORKSHOPS LIST */}
      <div className="w-full bg-white flex flex-col py-8 px-6 gap-4">
        {Object.entries(grouped).map(([year, months]) => (
          <div key={year}>
            {/* YEAR TITLE */}
            <div className="w-full relative flex justify-center items-center my-32">
              <img className="absolute w-96" src={WorkshopsImage} alt="" />
              <h2 className="absolute text-4xl font-bold text-teal-900">
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
                      items.map((workshop) => (
                        <Otherworkshops
                          key={workshop.id}
                          id={workshop.id}
                          title={workshop.title}
                          explanation={workshop.explanation}
                          date={workshop.date}
                          image={workshop.image}
                          paragraphs={workshop.paragraphs}
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
