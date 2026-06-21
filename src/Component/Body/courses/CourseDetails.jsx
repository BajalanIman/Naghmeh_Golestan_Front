import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import DonationSection from "../Home/DonationSection";

const CourseDetails = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/courses/${id}?lang=${i18n.language}`,
        );

        const data = await res.json();
        console.log("couse data", data);
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id, i18n.language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        Course not found
      </div>
      // only for netlify
      // <div className="min-h-screen bg-gray-50">
      //   <div className="bg-gradient-to-b from-indigo-700 via-purple-600 to-purple-500">
      //     <div className="mx-auto max-w-[1200px] px-4">
      //       <NavBar />
      //     </div>
      //   </div>

      //   <div className="max-w-[1200px] mx-auto px-4 py-10">
      //     <div className="relative overflow-hidden rounded-3xl shadow-2xl">
      //       <img
      //         src="https://images.stockcake.com/public/4/c/7/4c70a9b3-eff2-4ece-9bb1-719754c48a90_large/innovative-workshop-activity-stockcake.jpg"
      //         alt="{course.title}"
      //         className="w-full h-[350px] lg:h-[500px] object-cover"
      //       />

      //       {/* Dark Overlay */}
      //       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      //       {/* Content */}
      //       <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
      //         <div className="flex flex-wrap gap-3 mb-4">
      //           <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
      //             📅 22.06.2026
      //           </span>

      //           <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
      //             📍 Berlin
      //           </span>
      //         </div>

      //         <h1 className="text-3xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
      //           Course one
      //         </h1>
      //       </div>
      //     </div>
      //     {/* Body text */}
      //     <div className="space-y-8">
      //       {[
      //         {
      //           title: "About this course",
      //           icon: "📖",
      //           content: "course.paragraphs?.[0]",
      //         },
      //         {
      //           title: "Aim of this course",
      //           icon: "🎯",
      //           content: "course.paragraphs?.[1]",
      //         },
      //         {
      //           title: "Examples and content",
      //           icon: "🖌️",
      //           content: "course.paragraphs?.[2]",
      //         },
      //         {
      //           title: "Summary",
      //           icon: "✨",
      //           content: "course.paragraphs?.[3]",
      //         },
      //       ].map((section, index) => (
      //         <div
      //           key={index}
      //           className="bg-white rounded-2xl p-6 lg:p-8 mt-3 shadow-md hover:shadow-xl transition-all duration-300 border border-violet-100"
      //         >
      //           <div className="flex items-center gap-4 mb-4">
      //             <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-100 text-2xl">
      //               {section.icon}
      //             </div>

      //             <div>
      //               <h3 className="text-2xl font-bold text-violet-900">
      //                 {section.title}
      //               </h3>
      //               <div className="w-16 h-1 bg-violet-500 rounded-full mt-2" />
      //             </div>
      //           </div>

      //           <p className="text-gray-700 leading-8 text-lg">
      //             {section.content} Mit der Einführung des Dokumentenscanners:
      //             PDF, DOC App wird das Scannen von Papierdokumenten effizienter
      //             und einfacher als je zuvor. Diese bahnbrechende Technologie
      //             ermöglicht es den Benutzern, ihre wichtigen Dokumente in
      //             verschiedene digitale Formate wie PDF oder DOC umzuwandeln und
      //             sie auf ihrem mobilen Gerät oder Computer zu speichern. Der
      //             Dokumentenscanner ist einfach zu bedienen und bietet eine hohe
      //             Auflösung für die beste Qualität bei jedem Scanvorgang.
      //             Darüber hinaus können Benutzer mit dieser Anwendung ihre
      //             gescannten Dokumente leicht bearbeiten, organisieren und
      //             freigeben. Die Einführung des Dokumentenscanners hat einen
      //             revolutionären Einfluss auf die Art und Weise, wie wir mit
      //             Papierdokumenten umgehen - es ist eine Innovation, die Zeit
      //             spart und unsere Arbeitsweise verbessert.
      //           </p>
      //         </div>
      //       ))}
      //     </div>
      //   </div>
      //   {/* ENROLMENT FORM */}
      //   <div className="max-w-6xl mx-auto px-4 pb-20">
      //     <div className="grid lg:grid-cols-3 gap-8">
      //       {/* Course Info Card */}
      //       <div className="bg-violet-900 text-white rounded-3xl p-8 shadow-xl">
      //         <h3 className="text-2xl font-bold mb-6">Course Information</h3>

      //         <div className="space-y-5">
      //           <div>
      //             <p className="text-violet-200 text-sm">Date</p>
      //             <p className="font-semibold">"22.06.2026"</p>
      //           </div>

      //           <div>
      //             <p className="text-violet-200 text-sm">Location</p>
      //             <p className="font-semibold">Berlin</p>
      //           </div>

      //           <div>
      //             <p className="text-violet-200 text-sm">Duration</p>
      //             <p className="font-semibold">4 Sessions</p>
      //           </div>

      //           <div className="border-t pt-5">
      //             <p className="text-sm text-violet-200">Course Fee</p>
      //             <p className="text-3xl font-bold">€50</p>
      //           </div>

      //           <div>
      //             <p className="text-sm text-violet-200">
      //               Registration Deadline
      //             </p>
      //             <p>15 July 2026</p>
      //           </div>
      //         </div>

      //         <div className="mt-8 border-t border-violet-700 pt-6">
      //           <p className="text-sm text-violet-200">
      //             Complete the form and our team will contact you to confirm
      //             your registration.
      //           </p>
      //         </div>
      //       </div>

      //       {/* Form */}
      //       <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 lg:p-10">
      //         <div className="text-center mb-8">
      //           <span className="inline-block bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
      //             Registration Form
      //           </span>

      //           <h2 className="text-3xl font-bold text-violet-900">
      //             Enrol in this Course
      //           </h2>

      //           <p className="text-gray-500 mt-2">
      //             Reserve your place and join our creative community.
      //           </p>
      //         </div>

      //         <form className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      //           <input
      //             type="text"
      //             placeholder="Full Name"
      //             className="border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
      //           />

      //           <input
      //             type="email"
      //             placeholder="Email Address"
      //             className="border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
      //           />

      //           <input
      //             type="tel"
      //             placeholder="Phone Number"
      //             className="border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
      //           />

      //           <input
      //             type="number"
      //             placeholder="Number of Participants"
      //             className="border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
      //           />

      //           <select className="border border-gray-200 rounded-xl p-4 lg:col-span-2">
      //             <option>Preferred Language</option>
      //             <option>English</option>
      //             <option>German</option>
      //             <option>Persian</option>
      //           </select>

      //           <textarea
      //             rows="5"
      //             placeholder="Tell us anything you'd like us to know..."
      //             className="border border-gray-200 rounded-xl p-4 lg:col-span-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
      //           />

      //           <label className="lg:col-span-2 flex items-start gap-3 text-sm text-gray-600">
      //             <input type="checkbox" className="mt-1" />
      //             <span>
      //               I agree to be contacted regarding this course registration.
      //             </span>
      //           </label>

      //           <button
      //             type="submit"
      //             className="lg:col-span-2 bg-violet-700 hover:bg-violet-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
      //           >
      //             Reserve My Spot
      //           </button>

      //           <p className="lg:col-span-2 text-center text-sm text-gray-500">
      //             We typically respond within 24 hours.
      //           </p>
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      //   <DonationSection />
      //   {/* <Footer /> */}
      // </div>
    );
  }

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
            src={course.image}
            alt={course.title}
            className="w-full h-[350px] lg:h-[500px] object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                📅 {new Date(course.date).toLocaleDateString()}
              </span>

              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                📍 {course.location}
              </span>
            </div>

            <h1 className="text-3xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
              {course.title}
            </h1>
          </div>
        </div>
        {/* Body text */}
        <div className="space-y-8">
          {[
            {
              title: "About this course",
              icon: "📖",
              content: course.paragraphs?.[0],
            },
            {
              title: "Aim of this course",
              icon: "🎯",
              content: course.paragraphs?.[1],
            },
            {
              title: "Examples and content",
              icon: "🖌️",
              content: course.paragraphs?.[2],
            },
            {
              title: "Summary",
              icon: "✨",
              content: course.paragraphs?.[3],
            },
          ].map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 lg:p-8 mt-3 shadow-md hover:shadow-xl transition-all duration-300 border border-violet-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-100 text-2xl">
                  {section.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-violet-900">
                    {section.title}
                  </h3>
                  <div className="w-16 h-1 bg-violet-500 rounded-full mt-2" />
                </div>
              </div>

              <p className="text-gray-700 leading-8 text-lg">
                {section.content} Mit der Einführung des Dokumentenscanners:
                PDF, DOC App wird das Scannen von Papierdokumenten effizienter
                und einfacher als je zuvor. Diese bahnbrechende Technologie
                ermöglicht es den Benutzern, ihre wichtigen Dokumente in
                verschiedene digitale Formate wie PDF oder DOC umzuwandeln und
                sie auf ihrem mobilen Gerät oder Computer zu speichern. Der
                Dokumentenscanner ist einfach zu bedienen und bietet eine hohe
                Auflösung für die beste Qualität bei jedem Scanvorgang. Darüber
                hinaus können Benutzer mit dieser Anwendung ihre gescannten
                Dokumente leicht bearbeiten, organisieren und freigeben. Die
                Einführung des Dokumentenscanners hat einen revolutionären
                Einfluss auf die Art und Weise, wie wir mit Papierdokumenten
                umgehen - es ist eine Innovation, die Zeit spart und unsere
                Arbeitsweise verbessert.
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* ENROLMENT FORM */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info Card */}
          <div className="bg-violet-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Course Information</h3>

            <div className="space-y-5">
              <div>
                <p className="text-violet-200 text-sm">Date</p>
                <p className="font-semibold">
                  {new Date(course.date).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-violet-200 text-sm">Location</p>
                <p className="font-semibold">{course.location}</p>
              </div>

              <div>
                <p className="text-violet-200 text-sm">Duration</p>
                <p className="font-semibold">4 Sessions</p>
              </div>

              <div className="border-t pt-5">
                <p className="text-sm text-violet-200">Course Fee</p>
                <p className="text-3xl font-bold">€50</p>
              </div>

              <div>
                <p className="text-sm text-violet-200">Registration Deadline</p>
                <p>15 July 2026</p>
              </div>
            </div>

            <div className="mt-8 border-t border-violet-700 pt-6">
              <p className="text-sm text-violet-200">
                Complete the form and our team will contact you to confirm your
                registration.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 lg:p-10">
            <div className="text-center mb-8">
              <span className="inline-block bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
                Registration Form
              </span>

              <h2 className="text-3xl font-bold text-violet-900">
                Enrol in this Course
              </h2>

              <p className="text-gray-500 mt-2">
                Reserve your place and join our creative community.
              </p>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="number"
                placeholder="Number of Participants"
                className="border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <select className="border border-gray-200 rounded-xl p-4 lg:col-span-2">
                <option>Preferred Language</option>
                <option>English</option>
                <option>German</option>
                <option>Persian</option>
              </select>

              <textarea
                rows="5"
                placeholder="Tell us anything you'd like us to know..."
                className="border border-gray-200 rounded-xl p-4 lg:col-span-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <label className="lg:col-span-2 flex items-start gap-3 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" />
                <span>
                  I agree to be contacted regarding this course registration.
                </span>
              </label>

              <button
                type="submit"
                className="lg:col-span-2 bg-violet-700 hover:bg-violet-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Reserve My Spot
              </button>

              <p className="lg:col-span-2 text-center text-sm text-gray-500">
                We typically respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
      <DonationSection />
      <Footer />
    </div>
  );
};

export default CourseDetails;
