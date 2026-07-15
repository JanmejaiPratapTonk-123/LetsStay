import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bookmark, Clock, MapPinHouse, Wallet } from "lucide-react";

const STATS = [
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
    value: 1,
    colorClasses:
      "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Clock,
    label: "Pending",
    value: 5,
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

function HostDashboard() {



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
          {STATS.map(({ icon: Icon, label, value, colorClasses }) => (
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

      </main>

      <Footer />
      
    </div>
  );
}

export default HostDashboard;
