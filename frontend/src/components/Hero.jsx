import { useState } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";

/**
 * Hero — full-bleed landing section with background image and search bar.
 *
 * Search fields use local UI state only. No search handler is wired —
 * backend search integration is out of scope for this phase.
 *
 * Background image: TEMPORARY placeholder from public/images/hero-bg.jpg.
 * Will be replaced with a curated image served from backend/CDN in the
 * integration phase.
 */
function Hero() {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <section
      className="relative min-h-140 md:min-h-170 flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-md">
          Find Your Perfect Homestay
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Discover eco-friendly stays and unique travel experiences across India.
        </p>

        {/* Search bar */}
        <div className="mt-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-2 text-left">
          <div className="flex flex-col md:flex-row gap-1">

            {/* Location field */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200">
              <MapPin size={18} className="text-violet-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="hero-location"
                  className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide"
                >
                  Where
                </label>
                <input
                  id="hero-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search destinations"
                  className="w-full mt-0.5 text-sm text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-zinc-500"
                />
              </div>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden md:block w-px bg-gray-200 dark:bg-zinc-700 self-stretch my-2" />

            {/* Dates field */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200">
              <Calendar size={18} className="text-violet-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="hero-dates"
                  className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide"
                >
                  When
                </label>
                <input
                  id="hero-dates"
                  type="date"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="Add dates"
                  className="w-full mt-0.5 text-sm text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-zinc-500"
                />
              </div>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden md:block w-px bg-gray-200 dark:bg-zinc-700 self-stretch my-2" />

            {/* Guests field */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200">
              <Users size={18} className="text-violet-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="hero-guests"
                  className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide"
                >
                  Guests
                </label>
                <input
                  id="hero-guests"
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Add guests"
                  className="w-full mt-0.5 text-sm text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-zinc-500"
                />
              </div>
            </div>

            {/* Search button — presentational */}
            <button
              type="button"
              aria-label="Search properties"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              <Search size={18} />
              <span>Search</span>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;