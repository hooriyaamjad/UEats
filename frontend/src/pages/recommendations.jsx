import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import api from "../utils/api";
import { useEffect } from "react";
import RecommendedRestaurantCard from "../components/RecommendedRestaurantCard";

export default function Recommendations() {
  const [preferences, setPreferences] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [matchedRestaurants, setMatchedRestaurants] = useState([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get("/profiles/me/");
        const savedPreferences = response.data?.preferences || {};

        console.log("Fetched preferences:", savedPreferences);
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

        restaurants.forEach((restaurant) => {
          console.log("Dietary:", restaurant.dietary_restrictions);
          console.log("Allergens:", restaurant.allergens);
          console.log("Max price:", restaurant.max_price);
        });

        setRestaurants(restaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error?.response?.data || error.message);
      } 
    };

    fetchRestaurants();
  }, []);
  
  return (
    <div className="font-sans max-[393px]:max-w-full">
      <Header
        showBack={true}
        title="Your Recommendations"
      />

      <div className="mx-auto pt-[5px] px-[20px] pb-[20px] text-[14px]">

        <RecommendedRestaurantCard  
          image="https://images.unsplash.com/photo-1555992336-03a23c0e9b9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          maxPrice={20}
          rating={4.5}
          opening="10:00 AM"
          closing="10:00 PM"
          dietary={["Vegan", "Gluten-Free"]}
          allergens={["Peanuts", "Dairy"]}
        />
      </div>
      <BottomNavBar />
    </div>
  );
}