import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TIME_SLOTS } from "../utils";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  if (!state) {
    navigate("/dashboard");
    return null;
  }

  const { movie, cinema, city } = state;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleConfirmBooking = () => {
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    setIsBooking(true);

    setTimeout(() => {
      const bookingDetails = {
        id: Date.now(),
        user: user.email,
        movie: movie.Title,
        poster: movie.Poster,
        cinema: cinema.name,
        city: city,
        date: selectedDate,
        time: selectedTime,
      };

      const existingBookings = JSON.parse(
        localStorage.getItem("bookings") || "[]",
      );
      localStorage.setItem(
        "bookings",
        JSON.stringify([...existingBookings, bookingDetails]),
      );

      setIsBooking(false);
      alert(
        `🎉 Booking Confirmed!\n\n🎬 ${movie.Title}\n🏢 ${cinema.name}\n📍 ${city}\n📅 ${formatDate(selectedDate)}\n🕐 ${selectedTime}`,
      );
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Bar */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-6 py-3 flex items-center gap-4 sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <div className="h-6 w-px bg-gray-700"></div>
        <div className="flex items-center">
          <span className="text-xl font-extrabold text-white tracking-tight">
            fun
          </span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            X
          </span>
        </div>
        <div className="h-6 w-px bg-gray-700"></div>
        <span className="text-sm text-gray-400 font-medium">Checkout</span>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie Info Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex gap-5">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Poster"
                  }
                  className="w-24 h-36 object-cover rounded-lg shadow-xl border border-gray-700"
                  alt="Poster"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-2">{movie.Title}</h3>
                  <div className="space-y-1.5">
                    <p className="text-gray-400 flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12l-6-3-6 3V4z" />
                      </svg>
                      {cinema.name}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {cinema.location}, {city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Select Date
              </h4>
              <input
                type="date"
                value={selectedDate}
                min={today}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition cursor-pointer"
              />
              {selectedDate && (
                <p className="text-sm text-yellow-400 mt-2">
                  📅 {formatDate(selectedDate)}
                </p>
              )}
            </div>

            {/* Time Selection */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Select Showtime
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-3 text-sm rounded-xl border-2 transition-all duration-200 font-medium ${
                      selectedTime === time
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/20 scale-105"
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500/50 hover:text-white"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden sticky top-20">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4">
                <h4 className="font-bold text-black text-lg">
                  Booking Summary
                </h4>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                    }
                    className="w-12 h-16 object-cover rounded-lg"
                    alt="Poster"
                  />
                  <div>
                    <h5 className="font-bold text-sm">{movie.Title}</h5>
                    <p className="text-xs text-gray-500">{movie.Year}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cinema</span>
                    <span className="font-medium text-right">
                      {cinema.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">City</span>
                    <span className="font-medium">{city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-yellow-400">
                      {selectedDate
                        ? new Date(
                            selectedDate + "T00:00:00",
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium text-yellow-400">
                      {selectedTime || "—"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <button
                    onClick={handleConfirmBooking}
                    disabled={isBooking}
                    className={`w-full font-bold py-4 rounded-xl transition-all duration-300 text-base flex items-center justify-center gap-2 ${
                      isBooking
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 shadow-lg hover:shadow-yellow-500/25 transform hover:scale-[1.02]"
                    }`}
                  >
                    {isBooking ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                          />
                        </svg>
                        Confirm & Book
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-600 text-center mt-3">
                    By booking, you agree to funX's Terms of Use
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
