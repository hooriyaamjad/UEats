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

export default function Preferences() {
return (
    <div>
      Preferences
      <Link to="/">Landing</Link>
    </div>
  );
}