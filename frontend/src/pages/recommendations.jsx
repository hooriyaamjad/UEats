import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import api from "../utils/api";
import { useEffect } from "react";
import RecommendedRestaurantCard from "../components/RecommendedRestaurantCard";
import { useState } from "react";

export default function Recommendations() {
  const [preferences, setPreferences] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [matchedRestaurants, setMatchedRestaurants] = useState([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get("/profiles/me/");
        const savedPreferences = response.data?.preferences || {};
        setPreferences(savedPreferences);
      } catch (error) {
        console.error(
          "Failed to fetch preferences:",
          error?.response?.data || error.message
        );
      } 
    };

    fetchPreferences();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants/");
        const restaurants = response.data;
        console.log("All restaurants:", restaurants);
        setRestaurants(restaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error?.response?.data || error.message);
      } 
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!preferences || restaurants.length === 0) return;

    const userDietary = (preferences.dietary || []).map((i) => i.toLowerCase());
    const userAllergens = (preferences.allergens || []).map((i) => i.toLowerCase());
    const userMaxPrice = Number(preferences.price_range || 100);

    console.log("User dietary:", userDietary);
    console.log("User allergens:", userAllergens);
    console.log("User max price:", userMaxPrice);

    const restaurantsMatched = restaurants.filter((restaurant) => {
      const restaurantDietary = (restaurant.dietary_restrictions || []).map((i) => i.toLowerCase());
      const restaurantAllergens = (restaurant.allergens || []).map((i) => i.toLowerCase());
      const restaurantMaxPrice = Number(restaurant.max_price);

      const matchesDietary = userDietary.every((dietaryRestriction) =>
        restaurantDietary.includes(dietaryRestriction)
      );

      const matchesAllergens = userAllergens.every((allergen) =>
        !restaurantAllergens.includes(allergen)
      );

      const matchesPrice = restaurantMaxPrice <= userMaxPrice;
      
      if (matchesDietary && matchesAllergens && matchesPrice) {
        console.log("Matched restaurant:", restaurant.name);
        return true;
      }

      return false
    });

    setMatchedRestaurants(restaurantsMatched);

  }, [preferences, restaurants]);
  
  return (
    <div className="font-sans max-[393px]:max-w-full">
      <Header
        showBack={true}
        title="Your Recommendations"
      />

      <div className="mx-auto pt-[5px] px-[20px] pb-[20px] text-[14px]">

        {matchedRestaurants.length > 0 ? (
          <div className="flex flex-col gap-4">
            {matchedRestaurants.map((restaurant) => (
              <RecommendedRestaurantCard
                id={restaurant.id}
                image={restaurant.image_url}
                name={restaurant.name}
                maxPrice={restaurant.max_price}
                rating={restaurant.rating}
                opening={restaurant.opening_hours}
                closing={restaurant.closing_hours}
                dietary={preferences.dietary || []}
                allergens={preferences.allergens || []}
              />
            ))}
          </div>
        ) : (
          <p>No restaurants matched your preferences.</p>
        )}

      </div>
      <BottomNavBar />
    </div>
  );
}