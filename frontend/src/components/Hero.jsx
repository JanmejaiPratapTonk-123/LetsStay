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
function Hero({ onSearch }) {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(location);
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-2 text-left"
        >
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
                  placeholder="Search destination or title"
                  className="w-full mt-0.5 text-sm text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-zinc-500"
                />
              </div>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden md:block w-px bg-gray-200 dark:bg-zinc-700 self-stretch my-2" />

            {/* Dates field (UI placeholder) */}
            <div
              title="Date filtering coming soon"
              className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl opacity-60 bg-gray-50 dark:bg-zinc-800/50 cursor-not-allowed"
            >
              <Calendar size={18} className="text-violet-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="hero-dates"
                  className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide"
                >
                  When (Coming Soon)
                </label>
                <input
                  id="hero-dates"
                  type="date"
                  disabled
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full mt-0.5 text-sm text-gray-400 dark:text-zinc-500 bg-transparent outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden md:block w-px bg-gray-200 dark:bg-zinc-700 self-stretch my-2" />

            {/* Guests field (UI placeholder) */}
            <div
              title="Guest filtering coming soon"
              className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl opacity-60 bg-gray-50 dark:bg-zinc-800/50 cursor-not-allowed"
            >
              <Users size={18} className="text-violet-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="hero-guests"
                  className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide"
                >
                  Guests (Coming Soon)
                </label>
                <input
                  id="hero-guests"
                  type="number"
                  disabled
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Add guests"
                  className="w-full mt-0.5 text-sm text-gray-400 dark:text-zinc-500 bg-transparent outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Search button */}
            <button
              type="submit"
              aria-label="Search properties"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              <Search size={18} />
              <span>Search</span>
            </button>

          </div>
        </form>
      </div>
    </section>
  );
}

export default Hero;