import { Mail, MapPin, Phone, Clock } from "lucide-react";
import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "./Footer";

const ContactUs = () => {
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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783763648/ContactUsImage_lx1k6w.png"
          alt="Contact Us"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          Contact Us
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#186f77] mb-6">
              Get in Touch
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              We'd love to hear from you! Whether you have questions about our
              cultural events, ticket bookings, volunteering opportunities, or
              partnerships, feel free to contact us using the information below
              or send us a message through the contact form.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#186f77] text-white p-3 rounded-full">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">
                    Kunst-Stoffe- Materialmarkt Pankow
                    <br />
                    Berliner Str. 17, 13189 Berlin
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#186f77] text-white p-3 rounded-full">
                  <Mail size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">kontakt@kultur-atelier.de</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#186f77] text-white p-3 rounded-full">
                  <Phone size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">+49 15904973362</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#186f77] text-white p-3 rounded-full">
                  <Clock size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Office Hours</h3>
                  <p className="text-gray-600">
                    Monday – Friday
                    <br />
                    09:00 – 17:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#186f77] mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Subject</label>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Message</label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#186f77]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#186f77] hover:bg-[#27b4c1] text-white py-4 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default ContactUs;
