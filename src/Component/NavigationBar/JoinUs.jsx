import { Palette, BookOpen, Music, Users, Send } from "lucide-react";

import NavBar from "./NavBar";
import DonationSection from "../Body/Home/DonationSection";
import Footer from "../Body/Footer/Footer";

const JoinUs = () => {
  const opportunities = [
    {
      icon: <Palette size={35} />,
      title: "Artists & Creators",
      description:
        "Share your artistic skills through exhibitions, creative workshops, and cultural projects.",
    },
    {
      icon: <BookOpen size={35} />,
      title: "Teachers & Speakers",
      description:
        "Offer courses, lectures, or educational workshops about Middle Eastern culture.",
    },
    {
      icon: <Music size={35} />,
      title: "Performers",
      description:
        "Musicians, dancers, and performers are welcome to participate in our cultural events.",
    },
    {
      icon: <Users size={35} />,
      title: "Volunteers & Partners",
      description:
        "Support our events and help us build cultural connections within the community.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F1EFEE] flex flex-col">
      {/* Navbar */}
      <div className="w-full bg-[#186f77]">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783760844/JoinUsImage_tjgmfu.png"
          alt="Join Us"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          Join Us
        </h1>
      </div>

      {/* Introduction */}
      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-bold text-[#186f77] mb-5">
            Become Part of Our Cultural Community
          </h2>

          <p className="text-gray-600 leading-8 max-w-4xl mx-auto">
            We invite passionate individuals who want to share their knowledge,
            creativity, and experiences related to Middle Eastern culture.
            Whether you are an artist, educator, researcher, performer, or
            simply someone with a meaningful idea, we would love to hear from
            you.
          </p>
        </div>

        {/* Opportunities */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {opportunities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="text-[#186f77] flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-xl mb-3">{item.title}</h3>

              <p className="text-gray-600 text-sm leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Application Form */}

        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mt-12">
          <h2 className="text-3xl font-bold text-[#186f77] mb-8">
            Tell Us About Yourself
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">Full Name</label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Email Address</label>

                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">Phone Number</label>

                <input
                  type="text"
                  placeholder="Your phone number"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">City / Country</label>

                <input
                  type="text"
                  placeholder="Where are you located?"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Area of Contribution
              </label>

              <select className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#186f77] outline-none">
                <option>Select an option</option>

                <option>Workshop Instructor</option>

                <option>Course Teacher</option>

                <option>Artist / Performer</option>

                <option>Speaker / Researcher</option>

                <option>Volunteer</option>

                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">About Yourself</label>

              <textarea
                rows="5"
                placeholder="Tell us about yourself, your background, skills, and experience..."
                className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-[#186f77] outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Your Idea or Message
              </label>

              <textarea
                rows="5"
                placeholder="How would you like to contribute?"
                className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-[#186f77] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-3 bg-[#186f77] hover:bg-[#27b4c1] text-white py-4 rounded-xl font-semibold transition"
            >
              <Send size={20} />
              Submit Application
            </button>
          </form>
        </div>
      </div>

      <DonationSection />

      <Footer />
    </div>
  );
};

export default JoinUs;
