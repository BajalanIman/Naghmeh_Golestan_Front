import { useState } from "react";
import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import DonationSection from "../Home/DonationSection";

const OurEvents = () => {
  const movies = [
    {
      id: 1,
      week: 1,
      title: "Interstellar",
      description:
        "A team of astronauts travel through a wormhole in search of a new home for humanity.",
      image: "https://tse3.mm.bing.net/th/id/OIP.NW6uXltXcyHfy-SvdjIivwHaE8",
      date: "2026-08-02",
      time: "19:00",
      price: 15,
      totalSeats: 50,
      bookedSeats: [2, 5, 8, 10, 13],
    },
    {
      id: 2,
      week: 2,
      title: "Inception",
      description:
        "A skilled thief enters dreams to steal secrets but is given one last impossible mission.",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.MQdodyQDqjAJWV9JEzvcPgHaEc?pid=Api&h=220&P=0",
      date: "2026-08-09",
      time: "19:00",
      price: 15,
      totalSeats: 50,
      bookedSeats: [1, 3, 7],
    },
    {
      id: 3,
      week: 3,
      title: "The Pianist",
      description: "A moving story about survival during World War II.",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
      date: "2026-08-16",
      time: "19:00",
      price: 15,
      totalSeats: 50,
      bookedSeats: [],
    },
    {
      id: 4,
      week: 4,
      title: "Parasite",
      description: "A dark comedy thriller exploring class inequality.",
      image:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
      date: "2026-08-23",
      time: "19:00",
      price: 15,
      totalSeats: 50,
      bookedSeats: [15, 16, 17, 18],
    },
  ];

  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [ticketCount, setTicketCount] = useState(1);

  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#F1EFEE]">
      {/* NAVBAR */}
      <div className="w-full bg-[#186f77]">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex justify-center items-center">
        <img
          className="w-full h-[300px] lg:h-[700px] object-cover"
          src="https://www.wien.info/resource/image/428402/Hero-Header/2560/948/eab0532c4ffc86cbe44cb064dc3fe8d5/A23A316517AD476F9290E57B45F94BD6/50876-theater-an-der-wien-buehne.webp"
          alt="Film Festival"
        />
        <p className="absolute pb-8 text-gray-100 text-4xl font-bold">
          Upcoming Cultural Events
        </p>
      </div>

      {/* Introduction */}
      <div className="py-6 px-6">
        <p className="text-5xl font-bold">Film Festival</p>

        <p className="text-xl mt-5">
          A film festival for the period of September to October centered on the
          theme of{" "}
          <span className="font-bold">"Women, Migration, and Identity."</span>{" "}
          The program will feature films by Iranian female directors,
          accompanied by conversations, panel discussions, and cultural exchange
          activities addressing issues of identity, belonging, gender, and
          migration.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-16">
        {/* Week Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {movies.map((movie) => (
            <button
              key={movie.id}
              onClick={() => {
                setSelectedMovie(movie);
                setTicketCount(1);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedMovie.id === movie.id
                  ? "bg-[#186f77] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Week {movie.week}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Poster */}
          <div>
            <img
              src={selectedMovie.image}
              alt={selectedMovie.title}
              className="rounded-xl shadow-xl w-full h-[550px] object-cover"
            />
          </div>

          {/* Movie Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{selectedMovie.title}</h1>

            <p className="text-gray-600 leading-7">
              {selectedMovie.description}
            </p>

            <div className="flex flex-wrap gap-8 text-lg">
              <p>
                📅 <strong>{selectedMovie.date}</strong>
              </p>

              <p>
                🕖 <strong>{selectedMovie.time}</strong>
              </p>
            </div>

            <div className="text-3xl font-bold text-[#186f77]">
              €{selectedMovie.price}
            </div>

            <p className="font-semibold">
              Remaining Seats:{" "}
              {selectedMovie.totalSeats - selectedMovie.bookedSeats.length}/
              {selectedMovie.totalSeats}
            </p>

            {/* Ticket Quantity */}
            <div className="space-y-2">
              <label
                htmlFor="ticketCount"
                className="block text-lg font-semibold"
              >
                Number of Tickets
              </label>

              <select
                id="ticketCount"
                value={ticketCount}
                onChange={(e) => setTicketCount(Number(e.target.value))}
                className="w-full max-w-xs border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
              >
                {[1, 2, 3, 4, 5].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>

            {/* Booking Summary */}
            {/* Booking Summary */}

            <div className="border rounded-xl p-5 bg-gray-100">
              <h2 className="text-xl font-bold mb-3">Booking Summary</h2>

              <p>
                <strong>Movie:</strong> {selectedMovie.title}
              </p>

              <p>
                <strong>Date:</strong> {selectedMovie.date}
              </p>

              <p>
                <strong>Time:</strong> {selectedMovie.time}
              </p>

              <p>
                <strong>Tickets:</strong> {ticketCount}
              </p>

              <hr className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{(ticketCount * selectedMovie.price).toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (7%)</span>
                  <span>
                    €{(ticketCount * selectedMovie.price * 0.07).toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    €{(ticketCount * selectedMovie.price * 1.07).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#186f77] hover:bg-[#27b4c1] text-white py-4 rounded-xl text-lg font-semibold transition">
              {ticketCount > 1 ? "Buy Tickets" : "Buy Ticket"}
            </button>
          </div>
        </div>
      </div>

      <DonationSection />
      <Footer />
    </div>
  );
};

export default OurEvents;
