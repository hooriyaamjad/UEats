import { useState } from "react";
import "./preferences.css";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

const dietaryOptions = [
  "Halal",
  "Vegetarian",
  "Kosher",
  "Vegan",
  "Pescatarian",
  "Gluten-Free",
  "Lactose-Intolerance",
  "Dairy-Free",
];

const allergenOptions = [
  "Peanuts",
  "Wheat",
  "Milk",
  "Soy",
  "Eggs",
  "Shellfish",
  "Treenuts",
  "Fish",
];

export default function Preferences() {

    const [priceRange, setPriceRange] = useState(100);
    const [selectedDietary, setSelectedDietaryRestrictions] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);

    const [savedJson, setSavedJson] = useState({
      preferences: {
        dietary: [],
        allergens: [],
        price_range: "100",
      },
    });

    const handleSave = () => {
      const updatedJson = {
        preferences: {
          dietary: selectedDietary,
          allergens: selectedAllergens,
          price_range: String(priceRange),
        },
      };
      setSavedJson(updatedJson);
      console.log("Saved JSON:", updatedJson);
    };
    
    return (
        
          <div className="font-sans max-[393px]:max-w-full">
            <Header
              showBack={true}
              onBack={() => navigate(-1)}
              title="University of Calgary"
            />

            <div className="mx-auto p-[20px] text-[14px] text-[#5d5d5d]">
              <h2 className="mb-[10px] text-[18px] font-bold">Dietary Restrictions</h2>
              <h2 className="mb-[10px] text-[18px] font-bold">Allergens</h2>
              <h2 className="mb-[5px] text-[18px] font-bold">Price Range</h2>
              <div className="mb-[5px] text-right text-[14px]">$100</div>
              <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="slider w-full h-[6px] appearance-none outline-none"
                  style={{
                    "--value": `${priceRange}%`,
                  }}
              />

              <p className="text-[12px] text-[#5d5d5d]"> Set Price Range: $0 - ${priceRange} </p>

            </div>
            <BottomNavBar />
        </div>
    );
}