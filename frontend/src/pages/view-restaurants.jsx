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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants/");
        setRestaurants(response.data);
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

    fetchRestaurants();
  }, []);

  // TODO: Hardcoded filter data for now, have to decide how we want to implement this

  const filterTags = [
    "Halal",
    "Vegetarian",
    "Filling",
    "Baked Goods",
    "Clean",
    "Cheap",
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleFavouriteToggle = (restaurant) => {
    console.log("Favourite clicked:", restaurant);
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