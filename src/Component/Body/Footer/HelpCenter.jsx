import {
  ChevronDown,
  HelpCircle,
  Ticket,
  CreditCard,
  Calendar,
  Users,
} from "lucide-react";
import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "../Footer/Footer";
import HelpCenterImage from "../../../../public/HelpCenterImage.jfif";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How can I purchase tickets?",
      answer:
        "Choose your preferred event, select the number of tickets, and continue to checkout. After successful payment, you will receive your booking confirmation.",
    },
    {
      question: "How many tickets can I buy?",
      answer:
        "You can purchase up to 5 tickets per booking. For larger group bookings, please contact us directly.",
    },
    {
      question: "Can I cancel or refund my ticket?",
      answer:
        "Refund policies depend on the event. Please contact our support team at least 48 hours before the event date for cancellation requests.",
    },
    {
      question: "Where will I receive my ticket?",
      answer:
        "Your ticket confirmation will be sent to the email address provided during the booking process.",
    },
    {
      question: "What happens if an event is postponed?",
      answer:
        "If an event schedule changes, we will notify all registered attendees through email and provide further instructions.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach us through our Contact Us page. Our team will respond as soon as possible during business hours.",
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
          src="https://res.cloudinary.com/r4pnipqe/image/upload/v1783760353/HelpCenterImage_dlqhle.jpg"
          alt="Help Center"
          className="w-full h-[280px] lg:h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="absolute text-[#ECEAD3] text-4xl lg:text-6xl font-bold">
          Help Center
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 text-center">
          <HelpCircle className="mx-auto text-[#186f77] mb-4" size={55} />

          <h2 className="text-3xl font-bold text-[#186f77] mb-4">
            How Can We Help You?
          </h2>

          <p className="text-gray-600 leading-7 max-w-3xl mx-auto">
            Find answers to the most common questions about ticket purchases,
            events, payments, and our cultural programs. If you cannot find the
            answer you need, please contact our support team.
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Ticket className="mx-auto text-[#186f77] mb-3" size={35} />

            <h3 className="font-bold text-lg">Tickets</h3>

            <p className="text-gray-600 text-sm mt-2">
              Booking, purchasing, and ticket information.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <CreditCard className="mx-auto text-[#186f77] mb-3" size={35} />

            <h3 className="font-bold text-lg">Payments</h3>

            <p className="text-gray-600 text-sm mt-2">
              Payment methods and billing questions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Calendar className="mx-auto text-[#186f77] mb-3" size={35} />

            <h3 className="font-bold text-lg">Events</h3>

            <p className="text-gray-600 text-sm mt-2">
              Event dates, schedules, and updates.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Users className="mx-auto text-[#186f77] mb-3" size={35} />

            <h3 className="font-bold text-lg">Community</h3>

            <p className="text-gray-600 text-sm mt-2">
              Participation and cultural programs.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#186f77] mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <details key={index} className="border rounded-xl p-5 group">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg list-none">
                  {faq.question}

                  <ChevronDown className="text-[#186f77] group-open:rotate-180 transition" />
                </summary>

                <p className="text-gray-600 mt-4 leading-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default HelpCenter;
