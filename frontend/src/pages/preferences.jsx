import { Link } from "react-router-dom";
import "../preferences.css";

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
return (
    <div className="main-container">
        <h2 className="price-range-title">Price Range</h2>
        <div className="price-range">$0 - $100</div>
        <input
            type="range"
            min="0"
            max="100"
            className="slider"
        />
    </div>
  );
}