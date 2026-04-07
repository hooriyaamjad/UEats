import { useState, useEffect } from "react";
import api from "../utils/api";
import Header from "../components/Header";
import TagFilter from "../components/TagFilter";
import RestaurantCard from "../components/RestaurantCard";
import Carousel from "../components/Carousel";
import BottomNavBar from "../components/BottomNavBar";

const FILTER_TAGS = ["Halal", "Vegetarian", "Filling", "Baked Goods", "Clean", "Cheap"];

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [favouriteIds, setFavouriteIds] = useState(new Set());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants/");
        const normalized = response.data.map((r) => ({
          ...r,
          image: r.image_url || `https://placehold.co/300x200/e8d5b7/555?text=${encodeURIComponent(r.name)}`,
          tags: r.tags ?? [],
        }));
        setRestaurants(normalized);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error?.response?.data || error.message);
        setError("Couldn't connect to the backend. Is the server running?");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleFavouriteToggle = (id) => {
    setFavouriteIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const favourites = restaurants.filter((r) => favouriteIds.has(r.id));

  const forYou = selectedTag
    ? restaurants.filter((r) => r.tags.includes(selectedTag))
    : restaurants;

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <Header title="University of Calgary" />

      <main className="w-full max-w-2xl mx-auto px-5 pt-5 pb-32 flex flex-col gap-8">
        {/* Explore by Tags */}
        <section>
          <h2 className="text-base font-semibold mb-3">Explore by Tags</h2>
          <TagFilter
            tags={FILTER_TAGS}
            selectedTag={selectedTag}
            onSelect={setSelectedTag}
          />
        </section>

        {/* Error / loading state */}
        {loading && (
          <p className="text-sm text-gray-400">Loading restaurants...</p>
        )}
        {error && (
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="text-sm font-medium text-gray-700">{error}</p>
          </div>
        )}

        {/* Your Favourites */}
        {!loading && !error && favourites.length > 0 && (
          <section>
            <h2 className="text-base font-semibold mb-3">Your Favourites</h2>
            <Carousel>
              {favourites.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={{ ...r, isFavourite: favouriteIds.has(r.id) }}
                  onFavouriteToggle={handleFavouriteToggle}
                />
              ))}
            </Carousel>
          </section>
        )}

        {/* For You */}
        {!loading && !error && (
          <section>
            <h2 className="text-base font-semibold mb-3">For You</h2>
            {forYou.length === 0 ? (
              <p className="text-sm text-gray-400">No restaurants match this tag.</p>
            ) : (
              <Carousel>
                {forYou.map((r) => (
                  <RestaurantCard
                    key={r.id}
                    restaurant={{ ...r, isFavourite: favouriteIds.has(r.id) }}
                    onFavouriteToggle={handleFavouriteToggle}
                  />
                ))}
              </Carousel>
            )}
          </section>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}
