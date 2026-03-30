import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import "./preferences.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ExpandedRestaurantCard from "../components/ExpandedRestaurantCard";
import BottomNavBar from "../components/BottomNavBar";
import TagFilter from "../components/TagFilter";

export default function ViewRestaurants() {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants/");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error?.response?.data || error.message);
        setError("Couldn't connect to the backend. Is the server running?");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);


  // TODO: Hardcoded filter data for now, have to decide how we want to implement this

  const filterTags = ["Halal", "Vegetarian", "Coffee", "Pizza", "Burgers"];

  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  const handleFavouriteToggle = (restaurant) => {
    console.log("Favourite clicked:", restaurant);
  };

  return (
    <div className="min-h-screen">
      <Header
        showBack={true}
        onBack={() => navigate(-1)}
        title="University of Calgary"
      />

      <div className="px-5 pt-5">
        <SearchBar
          placeholder="Search restaurants..."
          onSearch={handleSearch}
        />
      </div>

      <div className="px-5 pt-5">
         <TagFilter
          tags={filterTags}
          selectedTag={selectedTag}
          onSelect={setSelectedTag}
        />
      </div>

      <div className="px-5 pt-6 pb-16 flex justify-center">
        {loading ? (
          <p className="text-sm text-gray-400 mt-10">Loading restaurants...</p>
        ) : error ? (
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="text-sm font-medium text-gray-700">{error}</p>
          </div>
        ) : (
          <ExpandedRestaurantCard
            restaurants={restaurants}
            onFavouriteToggle={handleFavouriteToggle}
          />
        )}
      </div>

        <BottomNavBar />
    </div>
  );
}