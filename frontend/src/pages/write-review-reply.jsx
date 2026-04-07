import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import api from "../utils/api";
import BottomNavBar from "../components/BottomNavBar";

export default function WriteMenuItem({ edit_mode = true }) {
  const navigate = useNavigate();

  const { id, review_id } = useParams();
  const [restaurantName, setRestaurantName] = useState("");

  const [reply, setReply] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get(`/restaurants/${id}/`),
      api.get(`/restaurants/${id}/reviews/${review_id}`),
    ])
      .then(([restaurantRes, reviewRes]) => {
        setRestaurantName(restaurantRes.data.name);
        setReply(reviewRes.data.restaurant_reply || "");
      })
      .catch(() => {});

  }, [id, review_id, edit_mode]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await api.post(`/restaurants/${id}/reviews/${review_id}/reply/`, { reply });
      navigate(`/restaurant/${id}/reviews`);
    } catch (err) {
      console.error("Failed to submit reply:", err);
      setError("Failed to submit reply. Please try again.");
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
          Reply to a review
        </span>
      </div>

      <div className="mx-4 mt-2 flex flex-col gap-4">
        {/* Restaurant name */}
        {restaurantName && (
          <p className="text-sm text-gray-500 px-1">
            Replying on behalf of{" "}
            <span className="font-semibold text-gray-800">{restaurantName}</span>
          </p>
        )}

        {/* Reply*/}
        <div className="rounded-2xl bg-white px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Reply
          </p>
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Your reply..."
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
