import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import DonationSection from "../Home/DonationSection";

const WorkshopDetails = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();

  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/workshops/${id}?lang=${i18n.language}`,
        );

        const data = await res.json();
        setWorkshop(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id, i18n.language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="flex justify-center items-center h-screen">
        Workshop not found
      </div>
      // Only for netlify
      // <div className="min-h-screen bg-gray-50">
      //   <div className="bg-gradient-to-b from-indigo-700 via-purple-600 to-purple-500">
      //     <div className="mx-auto max-w-[1200px] px-4">
      //       <NavBar />
      //     </div>
      //   </div>

      //   <div className="max-w-[1000px] mx-auto px-4 py-10">
      //     <h1 className="text-3xl lg:text-5xl font-bold text-center text-violet-900 mb-8">
      //       Workshop 1
      //     </h1>

      //     <img
      //       src="https://www.pchelpsoft.com/pchelpsoft-lp-static/dist/images/pages/fix-windows-issues/team.jpg"
      //       alt="{workshop.title}"
      //       className="w-full rounded-xl shadow-lg mb-8"
      //     />

      //     <div className="flex flex-col lg:flex-row gap-4 justify-center mb-10 text-gray-600">
      //       <p>
      //         <strong>Date:</strong>
      //         {" 22.06.2026"}
      //       </p>

      //       <p>
      //         <strong>Location:</strong> Berlin
      //       </p>
      //     </div>

      //     <div className="space-y-10 text-lg leading-8 text-gray-700">
      //       <div>
      //         <h3 className="text-2xl font-bold text-violet-900 mb-2">
      //           About this workshop
      //         </h3>
      //         <p>
      //           Wenn Sie schon mal eine neue Maus, einen Drucker oder ein
      //           anderes Peripheriegerät zu Ihrem Computer hinzugefügt haben,
      //           wissen Sie, wie zeitaufwändig es sein kann, den richtigen
      //           Treiber zu finden, damit das Gerät funktioniert. Es ist
      //           schwierig und oft nervenaufreibend, den richtigen Treiber für
      //           ein Gerät zu finden.
      //         </p>
      //       </div>

      //       <div>
      //         <h3 className="text-2xl font-bold text-violet-900 mb-2">
      //           Aim of this workshop
      //         </h3>
      //         <p>
      //           Wenn Sie schon mal eine neue Maus, einen Drucker oder ein
      //           anderes Peripheriegerät zu Ihrem Computer hinzugefügt haben,
      //           wissen Sie, wie zeitaufwändig es sein kann, den richtigen
      //           Treiber zu finden, damit das Gerät funktioniert. Es ist
      //           schwierig und oft nervenaufreibend, den richtigen Treiber für
      //           ein Gerät zu finden.
      //         </p>
      //       </div>

      //       <div>
      //         <h3 className="text-2xl font-bold text-violet-900 mb-2">
      //           Examples and content
      //         </h3>
      //         <p>
      //           Wenn Sie schon mal eine neue Maus, einen Drucker oder ein
      //           anderes Peripheriegerät zu Ihrem Computer hinzugefügt haben,
      //           wissen Sie, wie zeitaufwändig es sein kann, den richtigen
      //           Treiber zu finden, damit das Gerät funktioniert. Es ist
      //           schwierig und oft nervenaufreibend, den richtigen Treiber für
      //           ein Gerät zu finden.
      //         </p>
      //       </div>

      //       <div>
      //         <h3 className="text-2xl font-bold text-violet-900 mb-2">
      //           Summary
      //         </h3>
      //         <p>
      //           Wenn Sie schon mal eine neue Maus, einen Drucker oder ein
      //           anderes Peripheriegerät zu Ihrem Computer hinzugefügt haben,
      //           wissen Sie, wie zeitaufwändig es sein kann, den richtigen
      //           Treiber zu finden, damit das Gerät funktioniert. Es ist
      //           schwierig und oft nervenaufreibend, den richtigen Treiber für
      //           ein Gerät zu finden.
      //         </p>
      //       </div>
      //     </div>
      //   </div>
      //   {/* ENROLMENT FORM */}
      //   <div className="max-w-[1000px] mx-auto px-4 pb-16">
      //     <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10">
      //       <h2 className="text-2xl lg:text-3xl font-bold text-violet-900 mb-6 text-center">
      //         Enrol in this Workshop
      //       </h2>

      //       <form className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      //         <input
      //           type="text"
      //           placeholder="Full Name"
      //           className="border rounded-lg p-3 w-full"
      //         />

      //         <input
      //           type="email"
      //           placeholder="Email"
      //           className="border rounded-lg p-3 w-full"
      //         />

      //         <input
      //           type="tel"
      //           placeholder="Phone Number"
      //           className="border rounded-lg p-3 w-full"
      //         />

      //         <input
      //           type="number"
      //           placeholder="Number of Participants"
      //           className="border rounded-lg p-3 w-full"
      //         />

      //         <textarea
      //           placeholder="Message (optional)"
      //           rows="4"
      //           className="border rounded-lg p-3 w-full lg:col-span-2"
      //         />

      //         <button
      //           type="submit"
      //           className="lg:col-span-2 bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 rounded-lg transition"
      //         >
      //           Enrol Now
      //         </button>
      //       </form>
      //     </div>
      //   </div>
      //   <DonationSection />
      //   {/* <Footer /> */}
      // </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center  text-[#1B6269] bg-[#F1EFEE]">
      <div className=" w-full bg-[#186f77] ">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center  mb-8">
          {workshop.title}
        </h1>

        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full rounded-xl shadow-lg mb-8"
        />

        <div className="flex flex-col lg:flex-row gap-4 justify-center mb-10 text-gray-600">
          <p>
            <strong>Date:</strong>{" "}
            {new Date(workshop.date).toLocaleDateString()}
          </p>

          <p>
            <strong>Location:</strong> {workshop.location}
          </p>
        </div>

        <div className="space-y-10 text-lg leading-8 ">
          <div>
            <h3 className="text-2xl font-bold ">About this workshop</h3>
            <p>{workshop.paragraphs?.[0]}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Aim of this workshop</h3>
            <p>{workshop.paragraphs?.[1]}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Examples and content</h3>
            <p>{workshop.paragraphs?.[2]}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Summary</h3>
            <p>{workshop.paragraphs?.[3]}</p>
          </div>
        </div>
      </div>
      {/* ENROLMENT FORM */}
      <div className="max-w-[1000px] mx-auto px-4 pb-16">
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
            Enrol in this Workshop
          </h2>

          <form className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3 w-full"
            />

            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-3 w-full"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded-lg p-3 w-full"
            />

            <input
              type="number"
              placeholder="Number of Participants"
              className="border rounded-lg p-3 w-full"
            />

            <textarea
              placeholder="Message (optional)"
              rows="4"
              className="border rounded-lg p-3 w-full lg:col-span-2"
            />

            <button
              type="submit"
              className="lg:col-span-2 bg-[#1B6269] hover:bg-violet-800 text-white font-semibold py-3 rounded-lg transition"
            >
              Enrol Now
            </button>
          </form>
        </div>
      </div>
      <DonationSection />
      <Footer />
    </div>
  );
};

export default WorkshopDetails;
