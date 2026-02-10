import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_KEY, CITIES } from "../utils";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("Avengers");
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    if (API_KEY === "YOUR_OMDB_API_KEY_HERE" || API_KEY === "") {
      setError("Please set your API Key in src/utils.js");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`,
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    navigate(`/cinema/${movie.imdbID}`, {
      state: { movie, city: selectedCity },
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header / Navbar */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              fun
            </span>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              X
            </span>
          </div>

          {/* City Selector */}
          <div className="hidden md:flex items-center gap-2">
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
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-gray-300 text-sm border-none focus:outline-none cursor-pointer hover:text-white transition"
            >
              {CITIES.map((city) => (
                <option
                  key={city}
                  value={city}
                  className="bg-gray-900 text-white"
                >
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchMovies()}
              placeholder="Search for Movies, Events, Plays..."
              className="w-full pl-10 pr-20 py-2.5 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 text-sm transition"
            />
            <button
              onClick={fetchMovies}
              disabled={loading}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-4 py-1.5 rounded-full text-xs hover:from-yellow-400 hover:to-orange-400 transition disabled:opacity-50"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>
        </div>

        {/* User Section */}
        <div className="relative flex items-center gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 px-3 py-2 rounded-lg transition"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="text-sm text-gray-300 hidden lg:block">
              {user?.name}
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl py-2 w-48 z-50">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700 transition flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Search & City */}
      <div className="md:hidden p-4 space-y-3 bg-gray-900">
        <div className="flex items-center gap-2">
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
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent text-gray-300 text-sm border-none focus:outline-none"
          >
            {CITIES.map((city) => (
              <option
                key={city}
                value={city}
                className="bg-gray-900 text-white"
              >
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchMovies()}
            placeholder="Search movies..."
            className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-sm"
          />
          <button
            onClick={fetchMovies}
            disabled={loading}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-5 py-2.5 rounded-full text-sm"
          >
            {loading ? "..." : "Go"}
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-900/50 via-gray-900 to-indigo-900/50 py-10 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Now Showing in{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {selectedCity}
            </span>
          </h2>
          <p className="text-gray-400">
            Discover and book your favorite movies instantly
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
            <svg
              className="w-6 h-6 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-lg">
                Finding the best movies for you...
              </p>
            </div>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => handleMovieClick(movie)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-800 aspect-[2/3] mb-3 shadow-lg">
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                    }
                    alt={movie.Title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center gap-2 text-sm text-yellow-400 font-semibold">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                      Book Now
                    </div>
                  </div>
                  {/* Type Badge */}
                  <span className="absolute top-2 right-2 text-[10px] bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full uppercase text-yellow-400 font-bold tracking-wider border border-yellow-400/30">
                    {movie.Type}
                  </span>
                </div>
                <h3
                  className="font-semibold text-gray-200 truncate group-hover:text-yellow-400 transition text-sm"
                  title={movie.Title}
                >
                  {movie.Title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{movie.Year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              No movies found
            </h3>
            <p className="text-gray-500">
              Try searching for a different movie title
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-lg font-extrabold text-white">fun</span>
            <span className="text-lg font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              X
            </span>
            <span className="text-gray-500 text-sm ml-2">
              © 2025 All rights reserved
            </span>
          </div>
          <div className="flex gap-6 text-gray-500 text-sm">
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Support
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
