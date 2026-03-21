import { useEffect, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantCarousel({ restaurants = [], onFavorite }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.offsetWidth;
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    

    container.scrollTo({
      left: index * container.offsetWidth,
      behavior: "smooth",
    });
  };

  if (!restaurants.length) {
    return (
      <div className="block md:hidden py-6 text-center text-gray-500">
        No restaurants found.
      </div>
    );
  }

  return (
    <div className="block md:hidden">
      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="flex w-full shrink-0 snap-center justify-center py-4"
          >
            <RestaurantCard
              restaurant={restaurant}
              onFavorite={onFavorite}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        {restaurants.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-4 w-4 rounded-full ${
              activeIndex === index ? "bg-red-500" : "bg-gray-300"
            }`}
            aria-label={`Go to restaurant ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}