import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
];

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const { token, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const desktopLinkClass = ({ isActive }) =>
    [
      "text-sm font-medium transition-colors duration-200",
      isActive
        ? "text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 dark:border-violet-400 pb-0.5"
        : "text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-violet-600 dark:text-violet-400 shrink-0"
          >
            LetsStay
          </Link>

          {/* Desktop Navigation */}

          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={desktopLinkClass}
              >
                {label}
              </NavLink>
            ))}

            {/* AI Planner */}

            <Link
              to="/ai-trip-planner"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
            >
              <Sparkles size={16} />
              AI Planner
            </Link>
          </nav>

          {/* Desktop Right */}

          <div className="hidden md:flex items-center gap-2">

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {token ? (
              <div className="flex items-center gap-2">

                <button
                  aria-label="Account"
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <User size={20} />
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="ml-1 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl"
                >
                  Logout
                </button>

              </div>
            ) : (
              <Link
                to="/login"
                className="ml-1 px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors"
              >
                Sign In
              </Link>
            )}

          </div>

          {/* Mobile Controls */}

          <div className="flex md:hidden items-center gap-1">

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {token && (
              <button
                aria-label="Account"
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <User size={20} />
              </button>
            )}

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Drawer */}

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">

          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">

            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            ))}

            {/* AI Planner */}

            <Link
              to="/ai-trip-planner"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold"
            >
              <Sparkles size={18} />
              AI Planner
            </Link>

            {token ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                  navigate("/");
                }}
                className="mt-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 text-center"
              >
                Sign In
              </Link>
            )}

          </nav>

        </div>
      )}
    </header>
  );
}

export default Navbar;