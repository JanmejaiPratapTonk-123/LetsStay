import { MapPin, Star, Heart } from "lucide-react";

/**
 * Card — property listing card.
 *
 * Props mirror the PROPERTIES mock data shape in src/data/properties.js,
 * which itself mirrors the expected backend API response. No changes to
 * this component are required during backend integration — only the
 * parent page changes (import → useEffect + axios).
 *
 * isFavorited is a static boolean during the UI phase.
 * Toggle functionality will be wired to the backend in the integration phase.
 */
function Card({ image, title, location, price, rating, reviews, type, isFavorited = false }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

      {/* Property image */}
      <div className="h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Property type badge — top left */}
      <div className="absolute top-3 left-3">
        <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">
          {type}
        </span>
      </div>

      {/* Favourite button — top right. Static during UI phase. */}
      <button
        type="button"
        aria-label="Save to wishlist"
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm hover:scale-110 transition-transform duration-200"
      >
        <Heart
          size={16}
          className={
            isFavorited
              ? "fill-rose-500 text-rose-500"
              : "text-gray-400 dark:text-zinc-400"
          }
        />
      </button>

      {/* Card body */}
      <div className="p-4">

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 dark:text-zinc-400">
          <MapPin size={13} className="shrink-0" />
          <span className="text-xs truncate">{location}</span>
        </div>

        {/* Title */}
        <h3 className="mt-1.5 font-semibold text-gray-900 dark:text-white text-base leading-snug line-clamp-1">
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          <Star size={13} className="fill-yellow-400 text-yellow-400 shrink-0" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {rating}
          </span>
          <span className="text-xs text-gray-500 dark:text-zinc-400">
            ({reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-500 dark:text-zinc-400">/ night</span>
        </div>

      </div>
    </div>
  );
}

export default Card;