/**
 * Input — reusable input primitive with label, icon, and error state.
 *
 * Refactored last (Phase 10) so prop surface reflects actual usage
 * patterns seen across Login and Hero search bar.
 *
 * Props:
 * - id        string — links label to input (required for accessibility)
 * - label     string — renders a label above the input
 * - placeholder string
 * - type      string                       (default: 'text')
 * - value     string
 * - onChange  function
 * - error     string — renders an error message below in red
 * - icon      Lucide component — renders inside the left edge of the input
 * - required  boolean
 * - className string — applied to the outer wrapper div
 */
export default function Input({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>

      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
          {required && (
            <span className="ml-1 text-rose-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 pointer-events-none"
            aria-hidden="true"
          />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? "true" : undefined}
          className={[
            "w-full py-2.5 rounded-xl border text-sm transition-colors duration-200",
            "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white",
            "placeholder-gray-400 dark:placeholder-zinc-500",
            "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500",
            Icon ? "pl-10 pr-4" : "px-4",
            error
              ? "border-rose-400 dark:border-rose-500"
              : "border-gray-300 dark:border-zinc-700",
          ].join(" ")}
        />
      </div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      )}

    </div>
  );
}