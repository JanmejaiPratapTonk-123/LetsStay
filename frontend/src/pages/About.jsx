import { Link } from "react-router-dom";
import { Leaf, Smile, Shield, Search, BookOpen, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";

const MISSION_CARDS = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description:
      "We partner only with hosts committed to sustainable practices and a low environmental footprint.",
  },
  {
    icon: Smile,
    title: "Community-First",
    description:
      "Every booking directly supports local families and small businesses across India.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Verified hosts, transparent pricing, and 24/7 guest support on every booking.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Search",
    description: "Browse curated homestays by location, dates, and your travel preferences.",
  },
  {
    step: "02",
    icon: BookOpen,
    title: "Book",
    description: "Reserve instantly or send a request to the host — no hidden fees, ever.",
  },
  {
    step: "03",
    icon: Star,
    title: "Experience",
    description: "Check in, connect with your host, and enjoy a genuine home away from home.",
  },
];

const STATS = [
  { value: "1,200+", label: "Verified Stays" },
  { value: "80+",    label: "Cities Covered" },
  { value: "4.8★",   label: "Average Rating" },
  { value: "10K+",   label: "Happy Guests" },
];

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
      <Navbar />

      {/* Hero banner */}
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            We're reimagining homestay travel
          </h1>
          <p className="mt-5 text-lg text-violet-100 leading-relaxed">
            LetsStay connects mindful travellers with welcoming hosts across India, making
            every journey personal, authentic, and meaningful.
          </p>
          <Link
            to="/"
            className="inline-flex mt-8 px-6 py-3 bg-white text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Explore Stays
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeading
          title="Our Mission"
          subtitle="Three values that guide everything we build."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MISSION_CARDS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-zinc-800"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 mb-5">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white dark:bg-zinc-900 border-y border-gray-100 dark:border-zinc-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SectionHeading
            title="How It Works"
            subtitle="Three simple steps to your next stay."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, description }) => (
              <div key={step} className="flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold text-violet-100 dark:text-violet-950 select-none leading-none">
                    {step}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-600 text-white shrink-0">
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-violet-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl md:text-4xl font-bold text-white">{value}</p>
                <p className="mt-1 text-sm text-violet-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;