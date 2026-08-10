import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import { Loader } from "../components/ui";
import { CATEGORIES } from "../data/properties";
import { useAuth } from "../contexts/AuthContext";
import { createBooking } from "../services/bookingService";
import {
  fetchAllProperties,
  searchProperties,
  fetchPropertyById,
} from "../services/propertyService";
import { MapPin, X } from "lucide-react";

function Home() {
  const { user, token, loading: authLoading } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  const loadAllProperties = () => {
    setLoading(true);
    setError(null);
    fetchAllProperties()
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAllProperties();
  }, []);

  const handleSearch = async (query) => {
    if (!query || !query.trim()) {
      setSearchQuery("");
      loadAllProperties();
      return;
    }

    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setActiveCategory("All");

    try {
      const response = await searchProperties(query);
      setProperties(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    loadAllProperties();
  };

  const handleOpenDetail = async (id) => {
    setLoadingDetail(true);
    setDetailError(null);
    try {
      const res = await fetchPropertyById(id);
      setSelectedProperty(res.data);
    } catch (err) {
      setDetailError(err.message);
      alert(`Failed to load property details: ${err.message}`);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    if (selectedProperty) {
      setCheckInDate("");
      setCheckOutDate("");
      setBookingError("");
      setBookingSuccess("");
    }
  }, [selectedProperty]);

  const handleCreateBooking = async () => {
    if (!selectedProperty) {
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setBookingError("Please select both check-in and check-out dates.");
      setBookingSuccess("");
      return;
    }

    if (!token) {
      setBookingError("Please log in to create a booking.");
      setBookingSuccess("");
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError("");
      setBookingSuccess("");

      const res = await createBooking(
        selectedProperty.id,
        checkInDate,
        checkOutDate,
        token,
      );

      const statusText = res?.data?.status || "PENDING";
      setBookingSuccess(`Booking created with status ${statusText}.`);
      setCheckInDate("");
      setCheckOutDate("");
    } catch (err) {
      setBookingError(err.message || "Failed to create booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  const filtered =
    activeCategory === "All"
      ? properties
      : properties.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
      <Navbar />
      <Hero onSearch={handleSearch} />

      {/* Category filter pills */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={[
                  "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200",
                  activeCategory === cat
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main property section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-violet-50 dark:bg-zinc-900 border border-violet-200 dark:border-zinc-800 p-4 rounded-xl">
            <p className="text-sm font-medium text-violet-900 dark:text-violet-300">
              Search results for:{" "}
              <span className="font-bold">"{searchQuery}"</span>
            </p>
            <button
              onClick={handleClearSearch}
              className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        <SectionHeading
          title="Featured Homestays"
          subtitle={
            loading
              ? "Loading properties..."
              : `${filtered.length} ${filtered.length === 1 ? "property" : "properties"} available`
          }
        />

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-red-500 dark:text-red-400 font-medium">
              Failed to load properties
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              {error}
            </p>
          </div>
        )}

        {/* Empty results */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-zinc-400">
              No properties found matching your criteria.
            </p>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="mt-3 px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl"
              >
                View all properties
              </button>
            )}
          </div>
        )}

        {/* Property grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <Card
                key={property.id}
                {...property}
                onClick={() => handleOpenDetail(property.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedProperty(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-gray-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-700 transition"
            >
              <X size={20} />
            </button>

            <div className="h-64 sm:h-80 overflow-hidden shrink-0">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 font-semibold">
                <MapPin size={16} />
                {selectedProperty.location}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedProperty.title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                {selectedProperty.description}
              </p>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{Number(selectedProperty.price).toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-zinc-400">
                    {" "}
                    / night
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 space-y-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Book Now
                </h3>

                {!authLoading && !user && (
                  <div className="rounded-xl border border-violet-200 dark:border-zinc-700 bg-violet-50 dark:bg-zinc-800 p-3 text-sm">
                    <p className="text-violet-900 dark:text-violet-300">
                      Please log in to book this stay.
                    </p>
                    <Link
                      to="/login"
                      className="inline-block mt-2 text-violet-700 dark:text-violet-300 font-semibold hover:underline"
                    >
                      Go to Login
                    </Link>
                  </div>
                )}

                {!authLoading && user && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="text-sm text-gray-700 dark:text-zinc-300">
                        Check-in
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-gray-700 dark:text-zinc-300">
                        Check-out
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
                        />
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleCreateBooking}
                      disabled={bookingLoading}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold"
                    >
                      {bookingLoading ? "Creating booking..." : "Book Now"}
                    </button>
                  </>
                )}

                {bookingSuccess && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {bookingSuccess}
                  </p>
                )}

                {bookingError && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {bookingError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
