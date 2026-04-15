import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import api from "../utils/api";
import BottomNavBar from "../components/BottomNavBar";

export default function WriteRecommendation({ edit_mode = false }) {
  const { id, recc_id } = useParams();
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/restaurants/${id}/`)
      .then((res) => setRestaurantName(res.data.name))
      .catch(() => {});

      if (edit_mode) {
        api.get(`/restaurants/${id}/recommendations/${recc_id}`)
        .then((res) => setDescription(res.data.description))
      }
  }, [id, edit_mode, recc_id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      if (edit_mode && recc_id) {
        await api.patch(`/restaurants/${id}/recommendations/${recc_id}/`, {
          description,
        });
      } else {
        await api.post(`/restaurants/${id}/recommendations/`, { description });
      }
      navigate(`/restaurant/${id}/recommendations`);
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
          Write a Recommendation
        </span>
      </div>

      <div className="mx-4 mt-2 flex flex-col gap-4">
        {/* Restaurant name */}
        {restaurantName && (
          <p className="text-sm text-gray-500 px-1">
            Food recommendations for{" "}
            <span className="font-semibold text-gray-800">{restaurantName}</span>
          </p>
        )}

        {/* Description */}
        <div className="rounded-2xl bg-white px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Your Recommendation
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recommend something..."
            rows={5}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm
              focus:outline-none focus:bg-white focus:border-red-400 transition-all duration-200
              resize-none"
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
            ? "Save Recommendation"
            : "Submit Recommendation"}
        </button>
      </div>

      <BottomNavBar />
    </div>
  );
}
