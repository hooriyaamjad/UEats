import { Link } from "react-router-dom";
import "./preferences.css";
import Header from "../components/Header";

export default function ViewRestaurants() {
  return (
    
    <div>
      <Header
        showBack={true}
        onBack={() => navigate(-1)}
        title="University of Calgary"
        />
    </div>
  );
}