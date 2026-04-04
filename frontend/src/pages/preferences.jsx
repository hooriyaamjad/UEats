import { useState } from "react";
import "./preferences.css";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import { Chip } from "@mui/material";
import api from "../utils/api";
import { useEffect } from "react";

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
  "Sesame",
  "Mustard",
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

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");

    const updatedJson = {
      preferences: {
        dietary: selectedDietary,
        allergens: selectedAllergens,
        price_range: String(priceRange),
      },
    };

    try {
      const response = await api.put(
        "/profiles/preferences/",
        updatedJson,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Preferences saved:", response.data);
    } catch (error) {
      console.error(
        "Failed to save preferences:",
        error?.response?.data || error.message
      );
    }
  };

  const isItemSelected = (item, selectedItems) => {
    return selectedItems.includes(item.toLowerCase());
  };

  const toggleSelection = (item, setSelectedItems) => {
    const itemLowerCase = item.toLowerCase();

    setSelectedItems((prev) =>
      prev.includes(itemLowerCase)
        ? prev.filter((value) => value !== itemLowerCase)
        : [...prev, itemLowerCase]
    );
  };

  const preferencesChips = (options, selectedItems, setSelectedItems, type) => {
    return (
      <div className="flex flex-wrap gap-4">
        {options.map((item) => {
          const selected = isItemSelected(item, selectedItems);

          return (
            <Chip
              key={item}
              label={item}
              clickable
              onClick={() =>
                toggleSelection(item, selectedItems, setSelectedItems)
              }
              onDelete={
                selected
                  ? () => toggleSelection(item, selectedItems, setSelectedItems)
                  : undefined
              }
              sx={{
                height: 40,
                borderRadius: "700px",
                backgroundColor: selected
                  ? type === "dietary"
                    ? "#d9e8c8"
                    : "#f7c4c4"
                  : "transparent",
                color: "#111",
                border: "none",
                fontWeight: 700,
                fontSize: "14px",
              }}
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="font-sans max-[393px]:max-w-full">
      <Header
        showBack={true}
        title="Your Preferences"
      />

      <div className="mx-auto pt-[5px] px-[20px] pb-[20px] text-[14px]">

        <h2 className="pt-5 mb-[10px] text-[18px] font-bold">
          Dietary Restrictions
        </h2>

        {preferencesChips(dietaryOptions, selectedDietary, setSelectedDietaryRestrictions, "dietary")}

        <h2 className="pt-5 mb-[10px] text-[18px] font-bold">
          Allergens
        </h2>

        {preferencesChips(allergenOptions, selectedAllergens, setSelectedAllergens, "allergens")}

        <h2 className="pt-5 mb-[10px] text-[18px] font-bold">
          Price Range
        </h2>
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
        
        <div className="flex justify-end pb-6 pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-[12px] bg-gray-200 px-3 py-2 text-sm font-bold text-black hover:bg-gray-300 transition"
          >
            Save Preferences
          </button>
        </div>

      </div>
      <BottomNavBar />
    </div>
  );
}