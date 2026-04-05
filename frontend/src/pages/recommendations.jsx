import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import api from "../utils/api";
import { useEffect } from "react";
import RecommendedRestaurantCard from "../components/RecommendedRestaurantCard";

export default function Recommendations() {

  
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get("/profiles/me/");
        const savedPreferences = response.data?.preferences || {};

        console.log("Fetched preferences:", savedPreferences);

      } catch (error) {
        console.error(
          "Failed to fetch preferences:",
          error?.response?.data || error.message
        );
      } 
    };

    fetchPreferences();
  }, []);
  
  return (
    <div className="font-sans max-[393px]:max-w-full">
      <Header
        showBack={true}
        title="Your Recommendations"
      />

      <div className="mx-auto pt-[5px] px-[20px] pb-[20px] text-[14px]">
      </div>
      <BottomNavBar />
    </div>
  );
}