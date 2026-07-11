import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "../Footer/Footer";
import TermeConditionsImage from "../../../../public/TermeConditionsImage.png";

const Terms = () => {
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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783760216/TermeConditionsImage_ewlnvx.png"
          alt="Terms and Conditions"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          Terms & Conditions
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
              Welcome to our cultural events platform. By accessing our website,
              purchasing tickets, or participating in our events, you agree to
              follow these Terms and Conditions. Please read them carefully
              before using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Ticket Purchases
            </h2>

            <p className="text-gray-600 leading-8">
              Tickets purchased through our website are valid only for the
              selected event, date, and time. Customers are responsible for
              providing accurate information during the booking process.
            </p>

            <ul className="list-disc ml-6 mt-3 text-gray-600 space-y-2">
              <li>Tickets cannot be transferred without prior approval.</li>
              <li>
                Each ticket holder must present valid booking confirmation at
                the event entrance.
              </li>
              <li>
                Lost confirmation emails should be reported to our support team.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">Payments</h2>

            <p className="text-gray-600 leading-8">
              All ticket prices are displayed in euros (€). Payment must be
              completed before tickets are confirmed. Additional charges, such
              as applicable taxes or service fees, will be displayed during the
              checkout process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Refund and Cancellation Policy
            </h2>

            <p className="text-gray-600 leading-8">
              Refund requests must be submitted according to our cancellation
              policy. Depending on the event, refunds may only be available
              before a specific date or within a defined period before the
              event.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Event Changes
            </h2>

            <p className="text-gray-600 leading-8">
              We reserve the right to modify event schedules, locations,
              speakers, or programs when necessary. In case of major changes,
              registered participants will be informed as soon as possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Code of Conduct
            </h2>

            <p className="text-gray-600 leading-8">
              We aim to create a welcoming and respectful environment for all
              visitors. Attendees must follow venue rules and respect other
              participants, artists, organizers, and staff.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Intellectual Property
            </h2>

            <p className="text-gray-600 leading-8">
              All content on this website, including images, text, logos, and
              event materials, belongs to our organization or its partners and
              may not be used without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Limitation of Liability
            </h2>

            <p className="text-gray-600 leading-8">
              We are not responsible for circumstances beyond our control,
              including technical issues, changes caused by external factors, or
              interruptions affecting event attendance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#186f77] mb-3">
              Contact Information
            </h2>

            <p className="text-gray-600 leading-8">
              If you have any questions regarding these Terms and Conditions,
              please contact us through our Contact Us page.
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

export default Terms;
