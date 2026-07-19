import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  MapPin,
  CalendarDays,
  Wallet,
  Users,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/ui/Loader";
import { generateTrip } from "../services/aiService";

function AITripPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelType, setTravelType] = useState("");

  const [trip, setTrip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputStyle = `
    w-full
    rounded-xl
    border
    border-zinc-300
    dark:border-zinc-700
    bg-white
    dark:bg-zinc-900
    text-black
    dark:text-white
    placeholder:text-gray-500
    dark:placeholder:text-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-violet-500
    focus:border-violet-500
    transition
    p-4
  `;

  const handleGenerate = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setTrip("");

    try {
      const data = await generateTrip({
        destination,
        days,
        budget,
        travelType,
      });

      setTrip(data.trip);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        {/* Heading */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold flex justify-center items-center gap-3">
            <Sparkles className="text-violet-500" size={42} />
            AI Trip Planner
          </h1>

          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            Tell us where you're going and let AI build your perfect itinerary.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* LEFT CARD */}

          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-8">

            <form
              onSubmit={handleGenerate}
              className="space-y-6"
            >

              <div>

                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <MapPin size={18} />
                  Destination
                </label>

                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Goa"
                  className={inputStyle}
                  required
                />

              </div>

              <div>

                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <CalendarDays size={18} />
                  Number of Days
                </label>

                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="e.g. 5"
                  className={inputStyle}
                  required
                />

              </div>

              <div>

                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <Wallet size={18} />
                  Budget (₹)
                </label>

                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 15000"
                  className={inputStyle}
                  required
                />

              </div>

              <div>

                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <Users size={18} />
                  Travel Type
                </label>

                <select
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value)}
                  className={inputStyle}
                  required
                >
                  <option value="" disabled>
                    Select Travel Type
                  </option>

                  <option value="Solo">Solo</option>
                  <option value="Friends">Friends</option>
                  <option value="Family">Family</option>
                  <option value="Couple">Couple</option>
                </select>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-500 text-white py-4 font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading
                  ? "Generating your trip..."
                  : "✨ Generate My Trip"}
              </button>

            </form>

          </div>

          {/* RIGHT CARD */}

          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-8 min-h-162.5">

            {!loading && !trip && !error && (

              <div className="h-full flex flex-col justify-center items-center text-center">

                <Sparkles
                  size={72}
                  className="text-violet-500 mb-6"
                />

                <h2 className="text-2xl font-bold mb-3">
                  Your itinerary will appear here
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400">
                  Enter your travel details on the left and click
                  <br />
                  <span className="font-semibold">
                    Generate My Trip
                  </span>
                  .
                </p>

              </div>

            )}

            {loading && (

              <div className="flex flex-col items-center justify-center py-24">

                <Loader />

                <p className="mt-6 text-zinc-500">
                  Creating your personalized itinerary...
                </p>

              </div>

            )}

            {error && (

              <div className="rounded-xl bg-red-100 dark:bg-red-900/20 p-4 text-red-600 dark:text-red-400">
                {error}
              </div>

            )}

            {trip && (

              <div className="prose prose-lg dark:prose-invert max-w-none">

                <ReactMarkdown>
                  {trip}
                </ReactMarkdown>

              </div>

            )}

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default AITripPlanner;