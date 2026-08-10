import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bookmark, Clock, MapPinHouse, Wallet } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { getHostBookings } from "../services/bookingService";

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

function HostDashboard() {
  const { token, loading: authLoading } = useAuth();
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
        const res = await getHostBookings(token);
        setBookings(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        setBookingsError(err.message || "Failed to load host bookings.");
      } finally {
        setLoadingBookings(false);
      }
    };

    if (!authLoading) {
      loadBookings();
    }
  }, [token, authLoading]);

  const stats = useMemo(() => {
    const pending = bookings.filter(
      (booking) => booking.status === "PENDING",
    ).length;

    return [
      {
        icon: MapPinHouse,
        label: "My Properties",
        value: 3,
        colorClasses:
          "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
      },
      {
        icon: Bookmark,
        label: "Total Bookings",
        value: bookings.length,
        colorClasses:
          "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
      },
      {
        icon: Clock,
        label: "Pending",
        value: pending,
        colorClasses:
          "bg-rose-50 dark:bg-rose-950 text-rose-500 dark:text-rose-400",
      },
      {
        icon: Wallet,
        label: "Earning",
        value: 2,
        colorClasses:
          "bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400",
      },
    ];
  }, [bookings]);
  return (
    <div>
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome banner */}
        <div className="flex items-center gap-5 mb-10">
          <div>
            <p className="font-bold rounded-full w-14 h-14 items-center flex justify-center bg-violet-600 text-xl">
              T
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">Welcome back, Host 👋</p>
            <p className="text-gray-500 text-sm">
              Manage your homestays and bookings from one place.
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

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Bookings
          </h2>

          {loadingBookings && (
            <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-sm text-gray-500 dark:text-zinc-400">
              Loading host bookings...
            </div>
          )}

          {!loadingBookings && !token && (
            <div className="rounded-2xl border border-violet-200 dark:border-zinc-700 bg-violet-50 dark:bg-zinc-900 p-5 text-sm text-violet-900 dark:text-violet-300">
              Please log in as a host to view bookings.
            </div>
          )}

          {!loadingBookings && bookingsError && (
            <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-zinc-900 p-5 text-sm text-red-700 dark:text-red-300">
              {bookingsError}
            </div>
          )}

          {!loadingBookings &&
            !bookingsError &&
            token &&
            bookings.length === 0 && (
              <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-sm text-gray-500 dark:text-zinc-400">
                No bookings found for your properties.
              </div>
            )}

          {!loadingBookings && !bookingsError && bookings.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">
                      Property
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">Guest</th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Check-in
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Check-out
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-gray-100 dark:border-zinc-800 text-gray-700 dark:text-zinc-200"
                    >
                      <td className="px-4 py-3">
                        {booking?.property?.title || "Property"}
                      </td>
                      <td className="px-4 py-3">
                        {booking?.user?.name || booking?.user?.email || "Guest"}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(booking.checkIn)}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(booking.checkOut)}
                      </td>
                      <td className="px-4 py-3">
                        {booking?.status || "PENDING"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HostDashboard;
