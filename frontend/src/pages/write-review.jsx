import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Plus, X } from "lucide-react";
import api from "../utils/api";
import BottomNavBar from "../components/BottomNavBar";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

const PRESET_TAGS = ["Halal", "Filling", "Vegetarian", "Baked Goods", "Clean", "Expensive"];

function TagPopup({ currentTags, onSubmit, onCancel }) {
  const [pendingTags, setPendingTags] = useState([...currentTags]);
  const [selected, setSelected] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const customRef = useRef(null);

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !pendingTags.includes(trimmed)) {
      setPendingTags([...pendingTags, trimmed]);
    }
    setSelected("");
    setCustomInput("");
    setShowCustom(false);
  };

  const handleDropdownChange = (e) => {
    const val = e.target.value;
    if (val === "__custom__") {
      setShowCustom(true);
      setSelected("");
      setTimeout(() => customRef.current?.focus(), 50);
    } else if (val) {
      addTag(val);
    }
  };

  const removeTag = (tag) => {
    setPendingTags(pendingTags.filter((t) => t !== tag));
  };

  const availablePresets = PRESET_TAGS.filter((t) => !pendingTags.includes(t));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900 mb-5 text-center">Add a Tag!</h2>

        {/* Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Tags to add:
          </label>
          <select
            value={selected}
            onChange={handleDropdownChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm
              focus:outline-none focus:border-red-400 focus:bg-white transition"
          >
            <option value="">— select a tag —</option>
            {availablePresets.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
            <option value="__custom__">Add custom tag...</option>
          </select>
        </div>

        {/* Custom tag input */}
        {showCustom && (
          <div className="mb-4 flex gap-2">
            <input
              ref={customRef}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag(customInput)}
              placeholder="Type your tag..."
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm
                focus:outline-none focus:border-red-400 focus:bg-white transition"
            />
            <button
              onClick={() => addTag(customInput)}
              disabled={!customInput.trim()}
              className="rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white
                hover:bg-red-600 disabled:opacity-40 transition"
            >
              Add
            </button>
          </div>
        )}

        {/* Added tags */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-2">Added Tags:</p>
          {pendingTags.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No tags added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pendingTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-0.5 text-gray-400 hover:text-red-500 transition"
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold
              text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(pendingTags)}
            className="flex-1 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white
              hover:bg-gray-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WriteReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editState = location.state ?? {};
  const isEditing = !!editState.reviewId;

  const [restaurantName, setRestaurantName] = useState("");
  const [rating, setRating] = useState(editState.initialRating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState(editState.initialDescription ?? "");
  const [tags, setTags] = useState(editState.initialTags ?? []);
  const [showTagPopup, setShowTagPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/restaurants/${id}/`)
      .then((res) => setRestaurantName(res.data.name))
      .catch(() => {});
  }, [id]);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!description.trim()) {
      setError("Please write something about your experience.");
      return;
    }
    if (tags.length === 0) {
      setError("Please add at least one tag.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      if (isEditing) {
        await api.put(`/restaurants/${id}/reviews/${editState.reviewId}/`, { rating, description, tags });
      } else {
        await api.post(`/restaurants/${id}/reviews/`, { rating, description, tags });
      }
      navigate(`/restaurant/${id}/reviews`);
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = hoverRating || rating;

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
          {isEditing ? "Edit Review" : "Write a Review"}
        </span>
      </div>

      <div className="mx-4 mt-2 flex flex-col gap-4">
        {/* Restaurant name */}
        {restaurantName && (
          <p className="text-sm text-gray-500 px-1">
            Reviewing{" "}
            <span className="font-semibold text-gray-800">{restaurantName}</span>
          </p>
        )}

        {/* Star picker */}
        <div className="rounded-2xl bg-white px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Your Rating
          </p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-4xl leading-none transition-transform hover:scale-110 active:scale-95"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <span
                  className={
                    star <= displayRating ? "text-yellow-400" : "text-gray-200"
                  }
                >
                  ★
                </span>
              </button>
            ))}
            {displayRating > 0 && (
              <span className="ml-1 text-sm font-medium text-gray-500">
                {RATING_LABELS[displayRating]}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl bg-white px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Your Review
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell others about your experience..."
            rows={5}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm
              focus:outline-none focus:bg-white focus:border-red-400 transition-all duration-200
              resize-none"
          />
        </div>

        {/* Additional Tags */}
        <div className="rounded-2xl bg-white px-5 py-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Additional Tags</p>
            <button
              onClick={() => setShowTagPopup(true)}
              className="flex items-center justify-center rounded-full border border-gray-300
                h-7 w-7 hover:bg-gray-100 transition"
              aria-label="Add tags"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          {tags.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No tags added yet. Press + to add some!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="ml-0.5 text-gray-400 hover:text-red-500 transition"
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
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
          {submitting ? "Submitting..." : isEditing ? "Update Review" : "Submit Review"}
        </button>
      </div>

      {/* Tag popup */}
      {showTagPopup && (
        <TagPopup
          currentTags={tags}
          onSubmit={(newTags) => {
            setTags(newTags);
            setShowTagPopup(false);
          }}
          onCancel={() => setShowTagPopup(false)}
        />
      )}

      <BottomNavBar />
    </div>
  );
}
