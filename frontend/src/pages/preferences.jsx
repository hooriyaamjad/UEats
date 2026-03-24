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
    <div>
      Preferences
      <Link to="/">Landing</Link>
    </div>
  );
}