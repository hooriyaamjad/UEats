import api from "../utils/api";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/Searchbar";
import ExpandedRestaurantCard from "../components/ExpandedRestaurantCard";
import BottomNavBar from "../components/BottomNavBar";
import TagFilter from "../components/TagFilter";

export default function ViewRestaurants() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [favouriteIds, setFavouriteIds] = useState(new Set());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = !!localStorage.getItem('access_token');
        const requests = [api.get("/restaurants/")];
        if (isLoggedIn) requests.push(api.get("/profiles/me/favourites/"));

        const [restaurantsRes, favouritesRes] = await Promise.all(requests);
        setRestaurants(restaurantsRes.data);
        if (favouritesRes) {
          setFavouriteIds(new Set(favouritesRes.data));
        }
      } catch (error) {
        console.error(
          "Failed to fetch restaurants:",
          error?.response?.data || error.message
        );
        setError("Couldn't connect to the backend. Is the server running?");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterTags = ["Halal", "Vegetarian", "Filling", "Baked Goods", "Clean", "Cheap"];

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleFavouriteToggle = async (id) => {
    const isLoggedIn = !!localStorage.getItem('access_token');
    if (!isLoggedIn) return;

    setFavouriteIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    try {
      await api.post("/profiles/me/favourites/toggle/", { restaurant_id: id });
    } catch (error) {
      setFavouriteIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
      console.error("Failed to toggle favourite:", error?.response?.data || error.message);
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesTag = !selectedTag || restaurant.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <Header showBack={false} title="University of Calgary" />

      <main className="w-full max-w-2xl mx-auto px-5 pt-5 pb-32 flex flex-col gap-6">
        <SearchBar
          placeholder="Search restaurants..."
          onSearch={handleSearch}
        />

        <TagFilter
          tags={filterTags}
          selectedTag={selectedTag}
          onSelect={setSelectedTag}
        />

        {loading ? (
          <p className="text-sm text-gray-400 mt-10">Loading restaurants...</p>
        ) : error ? (
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="text-sm font-medium text-gray-700">{error}</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <ExpandedRestaurantCard
              restaurants={restaurants}
              favouriteIds={favouriteIds}
              restaurants={filteredRestaurants}
              onFavouriteToggle={handleFavouriteToggle}
            />
          </div>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}