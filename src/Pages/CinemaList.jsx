import { useLocation, useNavigate } from "react-router-dom";
import { CINEMAS } from "../utils";

const CinemaList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/dashboard");
    return null;
  }

  const { movie, city } = state;
  const availableCinemas = CINEMAS.filter((c) => c.city === city);

  const handleCinemaSelect = (cinema) => {
    navigate(`/book/${movie.imdbID}`, { state: { movie, city, cinema } });
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
      </header>

      {/* Movie Banner */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10"></div>
        <div
          className="h-72 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : ""})`,
          }}
        ></div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8">
          <div className="container mx-auto flex gap-6 items-end">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Poster"
              }
              alt={movie.Title}
              className="w-28 h-40 object-cover rounded-xl shadow-2xl border-2 border-gray-700 -mb-4 hidden md:block"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{movie.Title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-gray-400">{movie.Year}</span>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                  {movie.Type}
                </span>
              </div>
              <p className="mt-2 text-gray-400 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {city}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cinema List */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></span>
          Available Cinemas in {city}
          <span className="text-sm font-normal text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
            {availableCinemas.length} found
          </span>
        </h2>

        {availableCinemas.length > 0 ? (
          <div className="space-y-4">
            {availableCinemas.map((cinema) => (
              <div
                key={cinema.id}
                onClick={() => handleCinemaSelect(cinema)}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-yellow-500/50 cursor-pointer transition-all duration-300 group hover:bg-gray-900/50"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-black font-bold text-lg shadow-lg">
                        {cinema.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition">
                          {cinema.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {cinema.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20 font-medium">
                      ● Shows Available
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
            <div className="text-5xl mb-4">🏚️</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              No Cinemas Found
            </h3>
            <p className="text-gray-500">
              No cinemas available in {city} for this movie.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinemaList;
