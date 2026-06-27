import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import { PROPERTIES, CATEGORIES } from "../data/properties";

function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
      <Navbar />
      <Hero />

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

      {/* Property listings */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          title="Featured Homestays"
          subtitle={`${filtered.length} ${filtered.length === 1 ? "property" : "properties"} available`}
        />

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-zinc-400 py-16">
            No properties found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <Card key={property.id} {...property} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;