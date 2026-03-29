import "./preferences.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

export default function ViewRestaurants() {
  return (
    <div>
      <Header
        showBack={true}
        onBack={() => navigate(-1)}
        title="University of Calgary"
      />

      {/* Search section */}
      <div className="px-5 pt-5">
        <SearchBar placeholder="Search restaurants..." />
      </div>

    </div>
  );
}