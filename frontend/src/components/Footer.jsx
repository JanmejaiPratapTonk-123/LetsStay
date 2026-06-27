import { Link } from "react-router-dom";
import { Globe, MessageCircle, Camera, Mail } from "lucide-react";

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Sign In", to: "/login" },
];

const SUPPORT_LINKS = ["Help Center", "Contact Us", "Safety", "Cancellation Policy"];
const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"];

const SOCIAL_ICONS = [
  { icon: Globe, label: "Website" },
  { icon: MessageCircle, label: "Twitter" },
  { icon: Camera, label: "Instagram" },
  { icon: Mail, label: "Email" },
];

function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xl font-bold text-violet-600 dark:text-violet-400">LetsStay</p>
            <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Discover unique homestays and eco-friendly travel experiences across India.
            </p>
            <div className="mt-5 flex items-center gap-1">
              {SOCIAL_ICONS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2 rounded-lg text-gray-400 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore — internal routes use <Link> */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support — placeholder links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {SUPPORT_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal — placeholder links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-sm text-center text-gray-400 dark:text-zinc-500">
            © 2026 LetsStay. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;