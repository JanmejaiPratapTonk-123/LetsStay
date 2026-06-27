import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * SectionHeading — shared section title component.
 * Used in: Home (Featured Homestays), About (Mission, How It Works),
 *          Dashboard (Upcoming Stays).
 *
 * Props:
 * - title    {string}  Required. The section heading text.
 * - subtitle {string}  Optional. Muted line displayed below the title.
 * - action   {{ label: string, href: string }}
 *            Optional. Renders a right-aligned "View all →" style link.
 *            Use a path string for internal routes; the component uses
 *            <Link> so React Router handles navigation without a full reload.
 */
function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <Link
          to={action.href}
          className="flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors shrink-0"
        >
          {action.label}
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}

export default SectionHeading;
