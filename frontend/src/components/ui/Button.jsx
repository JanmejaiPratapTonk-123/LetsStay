import { Loader2 } from "lucide-react";

/**
 * Button — reusable button primitive.
 *
 * Refactored last (Phase 10) so variant and size choices reflect
 * actual usage patterns observed across all pages.
 *
 * Props:
 * - variant  'primary' | 'secondary' | 'ghost' | 'danger'  (default: 'primary')
 * - size     'sm' | 'md' | 'lg'                            (default: 'md')
 * - children ReactNode
 * - onClick  function
 * - disabled boolean
 * - loading  boolean — shows spinner, disables button
 * - type     'button' | 'submit' | 'reset'                 (default: 'button')
 * - className string — merged with generated classes
 */

const VARIANTS = {
  primary:
    "bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white disabled:bg-violet-300 dark:disabled:bg-violet-900",
  secondary:
    "border border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950 disabled:opacity-50",
  ghost:
    "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50",
  danger:
    "bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white disabled:bg-rose-300 dark:disabled:bg-rose-900",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center font-semibold rounded-xl",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        className,
      ].join(" ")}
    >
      {loading && (
        <Loader2 size={16} className="animate-spin shrink-0" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}