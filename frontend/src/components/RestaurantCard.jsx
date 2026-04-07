import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant, onFavouriteToggle }) {
  const [localFav, setLocalFav] = useState(restaurant.isFavourite ?? false);
  const controlled = onFavouriteToggle != null;
  const isFavourite = controlled ? (restaurant.isFavourite ?? false) : localFav;

  const handleFavClick = (e) => {
    e.preventDefault();
    if (controlled) {
      onFavouriteToggle(restaurant.id);
    } else {
      setLocalFav((v) => !v);
    }
  };

  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md
  hover:bg-gray-50
  hover:-translate-y-1 transition-shadow w-52 shrink-0 block"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-36 object-contain"
        />
        <button
          onClick={handleFavClick}
          className="absolute top-2 right-2 text-xl leading-none drop-shadow"
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <HeartIcon
            className={`h-6 w-6 transition ${
            isFavourite
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-400"
          }`}
  />
          
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-1.5 font-semibold text-sm truncate">
          <span className="truncate">{restaurant.name}</span>
          <span className="text-yellow-400 shrink-0">★</span>
          <span className="text-gray-500 shrink-0">{restaurant.rating}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
