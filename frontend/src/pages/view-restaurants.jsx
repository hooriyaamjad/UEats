import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./preferences.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ExpandedRestaurantCard from "../components/ExpandedRestaurantCard";
import BottomNavBar from "../components/BottomNavBar";
import TagFilter from "../components/TagFilter";

export default function ViewRestaurants() {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState(null);

  // TODO: Hardcoded restaurant + filter data for now, will fetch from backend

  const filterTags = ["Halal", "Vegetarian", "Coffee", "Pizza", "Burgers"];

  const restaurants = [
    {
      id: 1,
      name: "Bake Chef",
      image: "/bakechef.png",
      priceRange: "$$$",
      hours: "7am - 8pm",
      location: "MacEwan Hall (Main Campus)",
      rating: 4.5,
      tags: [
        "Halal",
        "Filling",
        "Baked Goods",
        "Vegetarian",
        "Desserts",
        "Top-Rated",
      ],
      isFavourite: false,
    },
    {
      id: 2,
      name: "Canadian Pizza",
      image: "/canadianpizza.png",
      priceRange: "$$",
      hours: "10am - 9pm",
      location: "MacEwan Hall (Main Campus)",
      rating: 4.5,
      tags: ["Pizza", "Halal", "Quick Meal", "Popular"],
      isFavourite: false,
    },
    {
      id: 3,
      name: "Korean BBQ House",
      image: "/koreanbbq.png",
      priceRange: "$$",
      hours: "11am - 8pm",
      location: "MacEwan Hall (Main Campus)",
      rating: 4,
      tags: ["Korean", "Spicy", "Filling", "Top-Rated"],
      isFavourite: true,
    },
  ];

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