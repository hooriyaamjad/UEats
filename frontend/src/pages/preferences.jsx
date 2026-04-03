import "../preferences.css";
import { useState } from "react";

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
    
    return (
        <div className="mx-auto p-[30px] font-sans max-[393px]:max-w-full">
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
                className="slider"
                style={{ "--value": `${priceRange}%` }}
            />

            <p className="set-price-range"> Set Price Range: $0 - ${priceRange} </p>
        </div>
    );
}