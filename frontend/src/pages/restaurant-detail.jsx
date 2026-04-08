import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Heart, BadgeCheck, Pencil, Trash2, TriangleAlert, ChevronUp, ChevronDown, HeartIcon, Reply } from "lucide-react";
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
        const isLoggedIn = !!localStorage.getItem('access_token');
        const requests = [api.get(`/restaurants/${id}/`)];
        if (isLoggedIn) requests.push(api.get("/profiles/me/favourites/"));

        const [restaurantRes, favouritesRes] = await Promise.all(requests);
        setRestaurant(restaurantRes.data);
        if (favouritesRes) {
          setIsFavourite(favouritesRes.data.includes(parseInt(id)));
        }
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

  const handleFavouriteToggle = async () => {
    const isLoggedIn = !!localStorage.getItem('access_token');
    if (!isLoggedIn) return;

    setIsFavourite((prev) => !prev);
    try {
      await api.post("/profiles/me/favourites/toggle/", { restaurant_id: parseInt(id) });
    } catch (err) {
      setIsFavourite((prev) => !prev); // revert on failure
      console.error("Failed to toggle favourite:", err?.response?.data || err.message);
    }
  };

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
          Restaurant Profile
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
            onClick={handleFavouriteToggle}
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
        <div className="flex px-5 border-b border-gray-200 pt-4">
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
          {activeTab === "Menu" && <MenuTab restaurantId={id}/>}
          {activeTab === "Recommendations" && <RecommendationsTab restaurantId={id} />}
          {activeTab === "Reviews" && (
            <ReviewsTab restaurantId={id} restaurantRating={restaurant.rating} restaurantName={restaurant.name} />
          )}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}

// placeholder text, for development of features
function MenuTab({ restaurantId }) {
  const navigate = useNavigate();
  const [restData, setRestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStoreEmployee, setisStoreEmployee] = useState(false)

  const handleDelete = async (menu_item_index) => {
    try {
      const updatedMenu = [...(restData.menu_items ?? [])];
      updatedMenu.splice(Number(menu_item_index), 1);

      await api.patch(`/restaurants/${restaurantId}/`, { menu_items: updatedMenu });
      setRestData((prev) => ({ ...prev, menu_items: updatedMenu }));
    } catch (err) {
      console.error("Failed to delete menu item:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restRes, profileRes] = await Promise.all([
          api.get(`/restaurants/${restaurantId}/`),
          api.get("/profiles/me/"),
        ]);
        setRestData(restRes.data)
        setisStoreEmployee(profileRes.data.works_for === parseInt(restaurantId));
      } catch (err) {
        console.error("Failed to fetch restaurant:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">
        Loading menu...
      </div>
    );
  }

  return (
    <div className="text-center text-gray-400 text-xs">
      {isStoreEmployee &&
        <div className="flex items-center justify-between py-4 border-gray-100">
          <button
            onClick={() => navigate(`/restaurant/${restaurantId}/menu_item/new`)}
            className="m-auto rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition-colors cursor-pointer"
          >
            Add an Item
          </button>
        </div>
      }
      <div className="m-auto grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {restData.menu_items.map((menu_item, index) => {
          return (
            <div className="md:w-2/3 lg:w-4/5 flex flex-col gap-1 items-center" key={menu_item.name}>
              {/* Image Sqaure */}
              <div
                className="w-full aspect-square bg-gray-200 bg-cover bg-center bg-no-repeat rounded-md shadow-sm flex flex-row-reverse"
                style={menu_item.image_url ? { backgroundImage: `url(${menu_item.image_url})` } : undefined}
              >
                {isStoreEmployee &&
                  <div>
                    <div className="p-1 shadow-xs rounded w-fit h-fit bg-white m-1 cursor-pointer">
                      <Pencil className="h-4 w-4 text-gray-400" onClick={() => navigate(`/restaurant/${restaurantId}/menu_item/${index}`)}/>
                    </div>
                    <div className="p-1 shadow-xs rounded w-fit h-fit bg-white m-1 cursor-pointer">
                      <Trash2 className="h-4 w-4 text-gray-400" onClick={() => handleDelete(index)} />
                    </div>
                  </div>
                }
              </div>
              <div>{menu_item.name}</div>
              <div>${menu_item.price}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

// placeholder text, for development of features
function RecommendationsTab({ restaurantId }) {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [myProfileId, setMyProfileId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleVote = async (recommendationId, vote) => {
    try {
      const voteRes = await api.post(
        `/restaurants/${restaurantId}/recommendations/${recommendationId}/vote/`,
        { vote }
      );
      const rank = (voteRes.data?.like_count ?? 0) - (voteRes.data?.dislike_count ?? 0);

      setRecommendations((prev) =>
        prev
          .map((recc) => (recc.id === recommendationId ? { ...recc, rank, current_user_vote : voteRes.data.side } : recc))
          .sort((r1, r2) => r2.rank - r1.rank)
      );
    } catch (err) {
      console.error("Failed to vote on recommendation:", err?.response?.data || err.message);
    }
  };

  const handleDelete = async (recc_id) => {
    try {
      await api.delete(`/restaurants/${restaurantId}/recommendations/${recc_id}/`);
      setRecommendations((prev) => prev.filter((r) => r.id !== recc_id));
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reccRes, profileRes] = await Promise.all([
          api.get(`/restaurants/${restaurantId}/recommendations/`),
          api.get("/profiles/me/"),
        ]);
        const rankedRecommendations = reccRes.data
          .map(({ liked_by, disliked_by, ...rest }) => ({
            ...rest,
            rank: (liked_by?.length ?? 0) - (disliked_by?.length ?? 0),
          }))
          .sort((r1, r2) => r2.rank - r1.rank);
        setRecommendations(rankedRecommendations);
        setMyProfileId(profileRes.data.id);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">
        Loading reviews...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4 border-b border-gray-100">
        <button
          onClick={() => navigate(`/restaurant/${restaurantId}/recommendations/new`)}
          className="m-auto rounded-full bg-red-500 rounded-2xl px-6 py-2 text-sm text-white font-semibold shadow-sm 
  cursor-pointer hover:shadow-md hover:bg-red-600 hover:shadow-[0_12px_22px_rgba(0,0,0,0.18)]
  hover:-translate-y-1
  transition-all duration-200"
 >
          Recommend Something
        </button>
      </div>
      {/* Reccomendations list */}
      {recommendations.length == 0 ? (
        <p className="text-center text-gray-400 text-sm py-10">
          No recommendations yet. Be the first!
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {recommendations.map((recc) => {
            const isOwner = recc.profile === myProfileId;
            const pd = recc.profile_data;
            const displayName = pd
              ? `${pd.first_name} ${pd.last_name?.[0] ?? ""}.`
              : "Anonymous";
            const initial = pd?.first_name?.[0]?.toUpperCase() ?? "?";
            return (
              <div key={recc.id} className="py-4">
                <div className="flex items-center justify-between gap-2">
                  {/* Avatar + name + stars */}
                  <div className="flex items-center gap-3">
                     <div className="h-9 w-9 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                     <img
                        src={pd.image_url ?? initial}
                        alt={displayName}
                        className="h-full w-full object-cover rounded-full"
                      />
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
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isOwner ? (
                      <>
                        <button aria-label="Edit recommendation" onClick={() => navigate(`/restaurant/${restaurantId}/recommendations/${recc.id}`)}>
                          <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        </button>
                        <button
                          onClick={() => handleDelete(recc.id)}
                          aria-label="Delete recommendation"
                        >
                          <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                        </button>
                      </>
                    ) : (
                      <button aria-label="Report recommendation">
                        <TriangleAlert className="h-4 w-4 text-yellow-500 hover:text-yellow-600 transition-colors" />
                      </button>
                    )}
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleVote(recc.id, "like")}
                        aria-label="Upvote recommendation"
                      >
                        <ChevronUp className={`h-4 w-4 hover:text-green-600 transition-colors ${recc.current_user_vote === 'like' ? 'text-green-600' : ''}`} />
                        {recc.rank}
                      </button>
                      <button
                        onClick={() => handleVote(recc.id, "dislike")}
                        aria-label="Downvote recommendation"
                      >
                        <ChevronDown className={`h-4 w-4 hover:text-red-600 transition-colors  ${recc.current_user_vote === 'dislike' ? 'text-red-600' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {recc.description && (
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed pl-12">
                    {recc.description}
                  </p>
                )}
              </div>
            );

          })}
        </div>
      )}
    </div>
  );
}

const REPORT_REASONS = [
  "Off topic",
  "Spam",
  "Bullying & Harassment",
  "Profanity and/or Harmful Language",
];

function ReportModal({ restaurantId, reviewId, onClose }) {
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) return;
    setSubmitting(true);
    try {
      await api.post(`/restaurants/${restaurantId}/reviews/${reviewId}/report/`, {
        reason,
        comments,
      });
      onClose();
    } catch (err) {
      console.error("Failed to report review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
          Report this Review
        </h2>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Please Select your Reasoning:
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="" disabled />
          {REPORT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Any Additional Comments?
        </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Type here."
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 resize-none mb-5 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason || submitting}
            className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-40"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ restaurantId, restaurantRating, restaurantName }) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [myProfileId, setMyProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportingReviewId, setReportingReviewId] = useState(null);
  const [isStoreEmployee, setisStoreEmployee] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, profileRes] = await Promise.all([
          api.get(`/restaurants/${restaurantId}/reviews/`),
          api.get("/profiles/me/"),
        ]);
        setReviews(reviewsRes.data);
        setMyProfileId(profileRes.data.id);
        setisStoreEmployee(profileRes.data.works_for === parseInt(restaurantId));
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

  const handleDeleteReply = async (reviewId) => {
  try {
    await api.delete(`/restaurants/${restaurantId}/reviews/${reviewId}/reply/`);
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, restaurant_reply: "" } : r)));
  } catch (err) {
    console.error("Failed to delete reply:", err);
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
      {reportingReviewId && (
        <ReportModal
          restaurantId={restaurantId}
          reviewId={reportingReviewId}
          onClose={() => setReportingReviewId(null)}
        />
      )}
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
 className="rounded-full bg-red-500 rounded-2xl px-6 py-2 text-sm text-white font-semibold shadow-sm 
  cursor-pointer hover:shadow-md hover:bg-red-600 hover:shadow-[0_12px_22px_rgba(0,0,0,0.18)]
  hover:-translate-y-1
  transition-all duration-200"        >
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
                     <img
                        src={pd.image_url ?? initial}
                        alt={displayName}
                        className="h-full w-full object-cover rounded-full"
                      />
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
                    {isStoreEmployee && (
                      <button
                        onClick={() => navigate(`/restaurant/${restaurantId}/reviews/${review.id}/reply`)}
                        aria-label="reply review"
                      >
                        <Reply className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                      </button>
                    )}
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
                      <button
                        onClick={() => setReportingReviewId(review.id)}
                        aria-label="Report review"
                      >
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
                <div>
                  {review.restaurant_reply && (
                    <div className="ml-12 border-gray-400 mt-4">
                      <div className="flex flex-row gap-3">
                        <text className="text-sm mb-1">{restaurantName}'s reply</text>
                        {isStoreEmployee &&
                          <button
                            onClick={() => handleDeleteReply(review.id)}
                            aria-label="Delete reply"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                          </button>
                        }
                      </div>
                      <p className="text-sm leading-relaxed pl-2 border-l border-gray-400 text-gray-600">
                        {review.restaurant_reply}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
