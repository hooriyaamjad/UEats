import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import api from "../utils/api";
import BottomNavBar from "../components/BottomNavBar";

export default function WriteMenuItem({ edit_mode = false }) {
  const navigate = useNavigate();

  const { id, menu_item_index } = useParams();
  const [restaurantName, setRestaurantName] = useState("");
  const [menuData, setMenuData] = useState([]);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/restaurants/${id}/`)
      .then((res) => {
        setRestaurantName(res.data.name);
        const menuItems = Array.isArray(res.data.menu_items) ? res.data.menu_items : [];
        setMenuData(menuItems);

        if (edit_mode) {
          const selectedItem = menuItems[Number(menu_item_index)] || {};
          setItemName(selectedItem.name ?? "");
          setImageUrl(selectedItem.image_url ?? "");
          setPrice(selectedItem.price != null ? String(selectedItem.price) : "");
        }
      })
      .catch(() => {});

  }, [id, edit_mode, menu_item_index]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const updatedMenu = Array.isArray(menuData) ? [...menuData] : [];
      if (edit_mode) {
        updatedMenu[Number(menu_item_index)] = {
          name: itemName,
          price,
          image_url: imageUrl,
        };
      } else {
        updatedMenu.push({ name: itemName, price, image_url: imageUrl });
      }
      await api.patch(`/restaurants/${id}/`, { menu_items: updatedMenu });
      navigate(`/restaurant/${id}/menu`);
    } catch (err) {
      console.error("Failed to submit recommendation:", err);
      setError("Failed to submit recommendation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center rounded-full p-1 hover:bg-gray-100 transition"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <span className="text-base font-semibold text-gray-800">
          {edit_mode ? "Edit a menu item" : "Create a menu item"}
        </span>
      </div>

      <div className="mx-4 mt-2 flex flex-col gap-4">
        {/* Restaurant name */}
        {restaurantName && (
          <p className="text-sm text-gray-500 px-1">
            Menu item for{" "}
            <span className="font-semibold text-gray-800">{restaurantName}</span>
          </p>
        )}

        {/* Item Name */}
        <div className="rounded-2xl bg-white px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Item Name
          </p>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name..."
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm
              focus:outline-none focus:bg-white focus:border-red-400 transition-all duration-200"
          />
        </div>

        {/* Item Price */}
        <div className="rounded-2xl bg-white px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Item Price
          </p>
          <div className="flex flex-row items-center gap-2">
            <span>$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="5.99"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm
                focus:outline-none focus:bg-white focus:border-red-400 transition-all duration-200"
            />
          </div>

        </div>

        {/* Image URL */}
        <div className="rounded-2xl bg-white px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Image URL
          </p>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm
              focus:outline-none focus:bg-white focus:border-red-400 transition-all duration-200"
          />
        </div>
  


        {/* Error */}
        {error && <p className="text-sm text-red-500 px-1">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full rounded-2xl bg-red-500 py-3 text-sm font-semibold text-white shadow-sm
            hover:bg-red-600 transition-colors disabled:opacity-60"
        >
          {submitting
            ? "Submitting..."
            : edit_mode
            ? "Save Item"
            : "Submit Item"}
        </button>
      </div>

      <BottomNavBar />
    </div>
  );
}
