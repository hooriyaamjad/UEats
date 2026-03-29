import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock3, MapPin, Heart } from "lucide-react";

const StarRating = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: totalStars }).map((_, index) => {
        if (index < fullStars) {
          return (
            <span key={index} className="text-yellow-400 text-xl leading-none">
              ★
            </span>
          );
        }

        if (index === fullStars && hasHalfStar) {
          return (
            <span
              key={index}
              className="text-xl leading-none bg-gradient-to-r from-yellow-400 to-yellow-400 from-50% to-gray-200 to-50% bg-clip-text text-transparent"
            >
              ★
            </span>
          );
        }

        return (
          <span key={index} className="text-gray-200 text-xl leading-none">
            ★
          </span>
        );
      })}
    </div>
  );
};

const TagPill = ({ label }) => {
  return (
    <span className="rounded-full border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-800 shadow-sm">
      {label}
    </span>
  );
};

export default function ExpandedRestaurantCard({
  restaurants = [],
  onFavouriteToggle,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!restaurants.length) return null;

  const currentRestaurant = restaurants[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? restaurants.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === restaurants.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative flex justify-center ${className}`}>
      <button
        onClick={goToPrevious}
        className="absolute left-[-8px] top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-2 shadow-md"
        aria-label="Previous restaurant"
      >
        <ChevronLeft className="h-6 w-6 text-gray-500" />
      </button>

      <div className="w-full max-w-[400px] rounded-[24px] bg-[#f7f7f7] p-3 shadow-[0_6px_18px_rgba(0,0,0,0.12)] md:max-w-[430px]">
        <div className="overflow-hidden rounded-[14px] bg-white">
          <img
            src={currentRestaurant.image}
            alt={currentRestaurant.name}
            className="h-[170px] w-full object-cover md:h-[190px]"
          />
        </div>

        <div className="px-2 pb-1 pt-4 text-center">
          <h2 className="text-2xl font-bold text-black">
            {currentRestaurant.name}
          </h2>

          <div className="mt-4 flex items-center justify-center gap-8 text-black">
            <div className="text-2xl font-bold text-green-600">
              {currentRestaurant.priceRange}
            </div>

            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock3 className="h-5 w-5" />
              <span>{currentRestaurant.hours}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-center text-lg font-semibold text-black">
            <MapPin className="h-5 w-5 shrink-0" />
            <span>{currentRestaurant.location}</span>
          </div>

          <div className="mt-4">
            <StarRating rating={currentRestaurant.rating} />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {currentRestaurant.tags?.map((tag, index) => (
              <TagPill key={index} label={tag} />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onFavouriteToggle?.(currentRestaurant)}
              className="flex items-center gap-3 rounded-2xl bg-white px-5 py-2 text-base font-bold text-black shadow-md transition hover:scale-[1.02]"
            >
              <Heart
                className={`h-6 w-6 ${
                  currentRestaurant.isFavourite
                    ? "fill-red-500 text-red-500"
                    : "text-red-500"
                }`}
              />
              <span>
                {currentRestaurant.isFavourite
                  ? "Added To Favourites"
                  : "Add To Favourites"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={goToNext}
        className="absolute right-[-8px] top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-2 shadow-md"
        aria-label="Next restaurant"
      >
        <ChevronRight className="h-6 w-6 text-gray-500" />
      </button>

      <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {restaurants.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to restaurant ${index + 1}`}
            className={`h-3 w-3 rounded-full transition ${
              currentIndex === index
                ? "bg-red-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}