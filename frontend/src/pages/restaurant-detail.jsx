import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Heart, BadgeCheck, Pencil, Trash2, TriangleAlert } from "lucide-react";
import api from "../utils/api";
import BottomNavBar from "../components/BottomNavBar";

const TABS = ["Menu", "Recommendations", "Reviews"];

const StarRating = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars)
          return (
            <span key={i} className="text-yellow-400 text-base leading-none">
              ★
            </span>
          );
        if (i === fullStars && hasHalfStar)
          return (
            <span key={i} className="text-yellow-400 text-base leading-none opacity-50">
              ★
            </span>
          );
        return (
          <span key={i} className="text-gray-300 text-base leading-none">
            ★
          </span>
        );
      })}
      <span className="ml-1 text-sm font-semibold text-gray-700">{rating}</span>
    </div>
  );
};

const TAB_PARAM_MAP = {
  menu: "Menu",
  recommendations: "Recommendations",
  reviews: "Reviews",
};

export default function RestaurantDetail() {
  const { id, tab } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const activeTab = TAB_PARAM_MAP[tab] ?? "Menu";

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await api.get(`/restaurants/${id}/`);
        setRestaurant(response.data);
        setIsFavourite(response.data.isFavourite ?? false);
      } catch (err) {
        const status = err?.response?.status;
        console.error("Failed to fetch restaurant:", err?.response?.data || err.message);
        setError(status === 404 ? "Restaurant not found (404)." : `Could not load restaurant${status ? ` (${status})` : ""}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-gray-500">
        <p>{error ?? "Restaurant not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white"
        >
          Go back
        </button>
      </div>
    );
  }

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
          Restaurant's Menu
        </span>
      </div>

      {/* Hero image */}
      <div className="w-full h-52 bg-white overflow-hidden">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info section */}
      <div className="mx-4 mt-4 rounded-2xl bg-white px-5 pt-4 pb-2 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
            {restaurant.price && (
              <p className="mt-0.5 text-sm font-medium text-gray-500">{restaurant.price}</p>
            )}
          </div>
          <button
            onClick={() => setIsFavourite((prev) => !prev)}
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            className="mt-1 ml-3"
          >
            <Heart
              className={`h-6 w-6 ${
                isFavourite ? "fill-red-500 text-red-500" : "text-red-400"
              }`}
            />
          </button>
        </div>

        {restaurant.location && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{restaurant.location}</span>
          </div>
        )}

        <div className="mt-2">
          <StarRating rating={restaurant.rating} />
        </div>

        {restaurant.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-300 bg-white px-3 py-0.5 text-xs font-medium text-gray-700 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs + Content */}
      <div className="mt-4 mx-4 rounded-2xl bg-white shadow-sm">
        <div className="flex px-5 border-b border-gray-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => navigate(`/restaurant/${id}/${t.toLowerCase()}`)}
              className={`mr-6 pb-2 text-sm font-semibold transition-colors ${
                activeTab === t
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="px-5 pt-2 pb-4">
          {activeTab === "Menu" && <MenuTab />}
          {activeTab === "Recommendations" && <RecommendationsTab />}
          {activeTab === "Reviews" && (
            <ReviewsTab restaurantId={id} restaurantRating={restaurant.rating} />
          )}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}

// placeholder text, for development of features
function MenuTab() {
  return (
    <div className="text-center py-12 text-gray-400 text-sm">
      Menu coming soon.
    </div>
  );
}

// placeholder text, for development of features
function RecommendationsTab() {
  return (
    <div className="text-center py-12 text-gray-400 text-sm">
      Recommendations coming soon. 
    </div>
  );
}

function ReviewsTab({ restaurantId, restaurantRating }) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [myProfileId, setMyProfileId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, profileRes] = await Promise.all([
          api.get(`/restaurants/${restaurantId}/reviews/`),
          api.get("/profiles/me/"),
        ]);
        setReviews(reviewsRes.data);
        setMyProfileId(profileRes.data.id);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [restaurantId]);

  const handleDelete = async (reviewId) => {
    try {
      await api.delete(`/restaurants/${restaurantId}/reviews/${reviewId}/`);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">
        Loading reviews...
      </div>
    );
  }

  return (
    <div>
      {/* Summary row */}
      <div className="flex items-center justify-between py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-gray-900">
            {parseFloat(restaurantRating).toFixed(1)}
          </span>
          <div>
            <StarRating rating={parseFloat(restaurantRating)} />
            <p className="text-xs text-gray-400 mt-0.5">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/restaurant/${restaurantId}/reviews/new`)}
          className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
        >
          Add a Review
        </button>
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-10">
          No reviews yet. Be the first!
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {reviews.map((review) => {
            const isOwner = review.profile === myProfileId;
            const pd = review.profile_data;
            const displayName = pd
              ? `${pd.first_name} ${pd.last_name?.[0] ?? ""}.`
              : "Anonymous";
            const initial = pd?.first_name?.[0]?.toUpperCase() ?? "?";

            return (
              <div key={review.id} className="py-4">
                <div className="flex items-start justify-between gap-2">
                  {/* Avatar + name + stars */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">
                          {displayName}
                        </span>
                        {pd?.is_student && (
                          <span className="flex items-center gap-0.5 text-xs text-blue-600 font-medium">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Verified Student
                          </span>
                        )}
                      </div>
                      <StarRating rating={parseFloat(review.rating)} />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isOwner ? (
                      <>
                        <button aria-label="Edit review">
                          <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          aria-label="Delete review"
                        >
                          <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                        </button>
                      </>
                    ) : (
                      <button aria-label="Report review">
                        <TriangleAlert className="h-4 w-4 text-yellow-500 hover:text-yellow-600 transition-colors" />
                      </button>
                    )}
                  </div>
                </div>

                {review.description && (
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed pl-12">
                    {review.description}
                  </p>
                )}
                {review.tags && review.tags.length > 0 && (
                  <div className="mt-2 pl-12 flex flex-wrap gap-1.5">
                    {review.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
