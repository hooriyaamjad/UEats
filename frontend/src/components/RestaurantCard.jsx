import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

function renderStars(rating = 0) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center justify-center gap-1 text-3xl">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      ))}

      {hasHalf && <span className="text-yellow-400">⯨</span>}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
}

export default function RestaurantCard({ restaurant, onFavorite }) {
  return (
    <div className="mx-auto w-[86%] max-w-[360px] overflow-hidden rounded-[24px] bg-[#f7f7f7] shadow-[0px_6px_18px_rgba(0,0,0,0.18)]">
      <img
        src={restaurant.image_url}
        alt={restaurant.name}
        className="h-[220px] w-full object-contain"
      />

      <div className="px-6 py-5 text-center">
        <h2 className="text-2xl font-extrabold text-black">
          {restaurant.name}
        </h2>

        <div className="mt-5 flex items-center justify-center gap-8 font-bold">
          <span className="text-green-600">{restaurant.price_range}</span>

          <div className="flex items-center gap-2 text-black">
            <FontAwesomeIcon icon={faClock} />
            <span>{restaurant.opening_hours} - {restaurant.closing_hours} ({restaurant.days_of_operation})</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 font-bold text-black">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{restaurant.location}</span>
        </div>

        <div className="mt-5">{renderStars(restaurant.rating)}</div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {restaurant.tags?.map((tag, index) => (
            <span
              key={index}
              className="rounded-full border border-gray-300 px-5 py-2 text-base text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

       <button
            onClick={() => onFavorite?.(restaurant)}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#FCFCFC] px-6 h-[40px] text-base font-bold text-black shadow-[0px_4px_10px_rgba(0,0,0,0.12)]"
            >
            <FontAwesomeIcon icon={faHeart} className="text-red-500 text-xl" />
            <span>Add To Favourites</span>
        </button>
      </div>
    </div>
  );
}