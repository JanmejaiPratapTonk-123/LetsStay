import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  Clock,
  Heart,
  Star,
  MapPin,
  CalendarDays,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import { useAuth } from "../contexts/AuthContext";
import { getMyBookings } from "../services/bookingService";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return DATE_FORMATTER.format(date);
}

function Dashboard() {
  const { user, token, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      if (!token) {
        setBookings([]);
        setLoadingBookings(false);
        return;
      }

      try {
        setLoadingBookings(true);
        setBookingsError("");
        const res = await getMyBookings(token);
        setBookings(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        setBookingsError(err.message || "Failed to load your bookings.");
      } finally {
        setLoadingBookings(false);
      }
    };

    if (!authLoading) {
      loadBookings();
    }
  }, [token, authLoading]);

  const stats = useMemo(() => {
    const now = new Date();

    const upcoming = bookings.filter((booking) => {
      const checkIn = new Date(booking.checkIn);
      return !Number.isNaN(checkIn.getTime()) && checkIn >= now;
    }).length;

    const pending = bookings.filter(
      (booking) => booking.status === "PENDING",
    ).length;
    const confirmed = bookings.filter(
      (booking) => booking.status === "CONFIRMED",
    ).length;

    return [
      {
        icon: Bookmark,
        label: "Total Bookings",
        value: bookings.length,
        colorClasses:
          "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
      },
      {
        icon: Clock,
        label: "Upcoming Stays",
        value: upcoming,
        colorClasses:
          "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
      },
      {
        icon: Heart,
        label: "Pending",
        value: pending,
        colorClasses:
          "bg-rose-50 dark:bg-rose-950 text-rose-500 dark:text-rose-400",
      },
      {
        icon: Star,
        label: "Confirmed",
        value: confirmed,
        colorClasses:
          "bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400",
      },
    ];
  }, [bookings]);

  const displayName = user?.name || "Traveller";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome banner */}
        <div className="flex items-center gap-5 mb-10">
          <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-white text-xl font-bold shrink-0 select-none">
            {initial}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {displayName} 👋
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-zinc-400">
              Here's a summary of your activity on LetsStay.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map(({ icon: Icon, label, value, colorClasses }) => (
            <div
              key={label}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-xl mb-4 ${colorClasses}`}
              >
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming Stays */}
        <SectionHeading
          title="Upcoming Stays"
          subtitle="Your confirmed and pending bookings."
        />
        {loadingBookings && (
          <div className="mb-12 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-sm text-gray-500 dark:text-zinc-400">
            Loading your bookings...
          </div>
        )}

        {!loadingBookings && !token && (
          <div className="mb-12 rounded-2xl border border-violet-200 dark:border-zinc-700 bg-violet-50 dark:bg-zinc-900 p-5 text-sm text-violet-900 dark:text-violet-300">
            Please log in to view your bookings.
          </div>
        )}

        {!loadingBookings && bookingsError && (
          <div className="mb-12 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-zinc-900 p-5 text-sm text-red-700 dark:text-red-300">
            {bookingsError}
          </div>
        )}

        {!loadingBookings &&
          !bookingsError &&
          token &&
          bookings.length === 0 && (
            <div className="mb-12 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-sm text-gray-500 dark:text-zinc-400">
              You do not have any bookings yet.
            </div>
          )}

        {!loadingBookings && !bookingsError && bookings.length > 0 && (
          <div className="space-y-4 mb-12">
            {bookings.map((booking) => {
              const propertyTitle = booking?.property?.title || "Property";
              const location =
                booking?.property?.location || "Location unavailable";
              const image =
                booking?.property?.image || "/images/property-1.jpg";
              const status = booking?.status || "PENDING";

              return (
                <div
                  key={booking.id}
                  className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-zinc-800"
                >
                  <img
                    src={image}
                    alt={propertyTitle}
                    className="w-full sm:w-28 h-36 sm:h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug">
                        {propertyTitle}
                      </h3>
                      <span
                        className={[
                          "shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full",
                          status === "CONFIRMED"
                            ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                            : status === "CANCELLED"
                              ? "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400"
                              : "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400",
                        ].join(" ")}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="flex items-center gap-1 mt-1.5 text-sm text-gray-500 dark:text-zinc-400">
                      <MapPin size={13} className="shrink-0" />
                      {location}
                    </p>
                    <p className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-zinc-400">
                      <CalendarDays size={13} className="shrink-0" />
                      {formatDate(booking.checkIn)} →{" "}
                      {formatDate(booking.checkOut)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <SectionHeading title="Quick Actions" />
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            Browse Stays
          </Link>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center px-6 py-3 rounded-xl border border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 font-semibold text-sm hover:bg-violet-50 dark:hover:bg-violet-950 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            List a Property
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
