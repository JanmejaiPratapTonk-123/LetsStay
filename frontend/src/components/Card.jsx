import { MapPin, Heart } from "lucide-react";

/**
 * Card component for displaying a property listing.
 *
 * Receives property data from the backend API
 * and renders the property image, location,
 * title, price, and favourite button.
 *
 * Favourite functionality is currently static
 * and will be connected to the backend later.
 */

function Card({ image, title, location, price, isFavorited = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >

      {/* Property image */}
      <div className="h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Favourite button — top right */}
      <button
        type="button"
        aria-label="Save to wishlist"
        onClick={(e) => {
          e.stopPropagation();
        }}
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

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            ₹{Number(price).toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-500 dark:text-zinc-400">/ night</span>
        </div>

      </div>
    </div>
  );
}

export default Card;