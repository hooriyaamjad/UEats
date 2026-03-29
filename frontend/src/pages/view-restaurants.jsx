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

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants/");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error?.response?.data || error.message);
        setError("Failed to load restaurants.");
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
        <ExpandedRestaurantCard
            restaurants={restaurants}
            onFavouriteToggle={handleFavouriteToggle}
        />
    </div>

        <BottomNavBar />
    </div>
  );
}