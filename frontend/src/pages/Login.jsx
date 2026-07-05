import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Eye, EyeOff, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BRAND_FEATURES = [
  "Verified eco-friendly homestays across India",
  "Transparent pricing with no hidden fees",
  "24/7 guest support on every booking",
];

/**
 * Login — authentication UI.
 *
 * Form is fully presentational during the UI phase.
 * onSubmit calls e.preventDefault() only — no API call.
 * Backend integration (POST /api/auth/login, JWT storage) is out of scope here.
 */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
      <Navbar />

      <main className="flex-1 flex">

        {/* Left brand panel — desktop only */}
        <div className="hidden lg:flex lg:w-2/5 bg-linear-to-br from-violet-600 via-violet-700 to-indigo-700 flex-col justify-between p-12">
          <Link to="/" className="text-2xl font-bold text-white">
            LetsStay
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight">
              Your home away from home.
            </h2>
            <p className="mt-4 text-violet-200 text-base leading-relaxed">
              Thousands of verified homestays across India, ready for your next adventure.
            </p>
            <ul className="mt-8 space-y-4">
              {BRAND_FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-violet-100 text-sm">
                  <CheckCircle size={18} className="shrink-0 mt-0.5 text-violet-300" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-violet-300 text-xs">© 2026 LetsStay. All rights reserved.</p>
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              Sign in to continue to LetsStay.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>

              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 pointer-events-none"
                  />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-sm rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 mt-2"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700" />
              <span className="text-xs text-gray-400 dark:text-zinc-500 whitespace-nowrap">
                or continue with
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700" />
            </div>

            {/* Google sign-in — presentational only, no handler */}
            <button
              type="button"
              className="mt-4 w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-violet-600 dark:text-violet-400 font-medium hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Login;