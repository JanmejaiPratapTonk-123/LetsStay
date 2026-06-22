import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div
            className={
                darkMode
                    ? "min-h-screen bg-black text-white"
                    : "min-h-screen bg-white text-black"
            }
        >
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="fixed top-4 right-4 border px-3 py-1 rounded bg-gray-200 text-black z-50"
            >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <Navbar />
            <Hero />

            <div className="px-4">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card />
                    <Card />
                    <Card />
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default Home;