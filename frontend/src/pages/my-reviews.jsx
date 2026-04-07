import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import api from "../utils/api";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg leading-none ${
            star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function MyReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/profiles/me/reviews/")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <Header showBack={true} title="Your Reviews" />

      <main className="w-full max-w-2xl mx-auto px-4 pb-32 flex flex-col gap-4 mt-2">
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">Loading...</div>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            You haven't written any reviews yet.
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Restaurant image */}
              {review.restaurant_image_url ? (
                <img
                  src={review.restaurant_image_url}
                  alt={review.restaurant_name}
                  className="w-full h-28 object-contain bg-white pt-3"
                />
              ) : (
                <div className="w-full h-28 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-medium">
                    {review.restaurant_name}
                  </span>
                </div>
              )}

              <div className="px-4 pb-4 pt-2">
                {/* Stars + edit */}
                <div className="flex items-center justify-between">
                  <StarRating rating={parseFloat(review.rating)} />
                  <button
                    onClick={() =>
                      navigate(`/restaurant/${review.restaurant_id}/reviews/new`, {
                        state: {
                          reviewId: review.id,
                          initialRating: parseFloat(review.rating),
                          initialDescription: review.description,
                          initialTags: review.tags,
                        },
                      })
                    }
                    aria-label="Edit review"
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>

                {/* Description */}
                {review.description && (
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                    {review.description}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}
