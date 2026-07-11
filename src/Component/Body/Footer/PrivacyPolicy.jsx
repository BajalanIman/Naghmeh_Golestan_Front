import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "../Footer/Footer";
import PrivacyPolicyImage from "../../../../public/PrivacyPolicy.png";

const PrivacyPolicy = () => {
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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783759688/PrivacyPolicy_q4nyhg.png"
          alt="Privacy Policy"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          Privacy Policy
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-[#186f77] mb-4">
              Introduction
            </h2>

            <p className="text-gray-600 leading-8">
              We respect your privacy and are committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, and protect your information when you visit our website,
              purchase tickets, or participate in our cultural events.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Information We Collect
            </h2>

            <p className="text-gray-600 leading-8">
              We may collect personal information that you provide directly to
              us, including:
            </p>

            <ul className="list-disc ml-6 mt-3 text-gray-600 space-y-2">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Ticket booking information</li>
              <li>Payment-related information</li>
              <li>Messages submitted through our contact form</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              How We Use Your Information
            </h2>

            <p className="text-gray-600 leading-8">
              Your information is used to:
            </p>

            <ul className="list-disc ml-6 mt-3 text-gray-600 space-y-2">
              <li>Process ticket purchases and reservations</li>
              <li>Send booking confirmations</li>
              <li>Respond to your questions and requests</li>
              <li>Improve our website and services</li>
              <li>Provide information about our cultural events</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Data Protection
            </h2>

            <p className="text-gray-600 leading-8">
              We take appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              loss, misuse, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">Cookies</h2>

            <p className="text-gray-600 leading-8">
              Our website may use cookies to improve user experience, analyze
              website traffic, and provide better services. You can control
              cookie settings through your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Third-Party Services
            </h2>

            <p className="text-gray-600 leading-8">
              We may use trusted third-party services for payment processing,
              website analytics, and communication. These services have their
              own privacy policies and security practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Your Rights
            </h2>

            <p className="text-gray-600 leading-8">
              You have the right to request access, correction, deletion, or
              restriction of your personal data. If you have questions about
              your information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Contact Information
            </h2>

            <p className="text-gray-600 leading-8">
              If you have any questions regarding this Privacy Policy, please
              contact us through our Contact Us page.
            </p>
          </section>

          <p className="text-sm text-gray-500 border-t pt-5">
            Last updated: August 2026
          </p>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
