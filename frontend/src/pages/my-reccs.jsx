import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import api from "../utils/api";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

export default function MyReccs() {
  const navigate = useNavigate();
  const [reccs, setReccs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/profiles/me/recommendations/")
      .then((res) => setReccs(res.data))
      .catch((err) => console.error("Failed to fetch recommendations:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <Header showBack={true} title="My recommendations" />

      <main className="w-full max-w-2xl mx-auto px-5 pt-5 pb-32 flex flex-col gap-6">
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">Loading...</div>
        ) : reccs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            You haven't written any recommendations yet.
          </div>
        ) : (
          reccs.map((recommendation) => (
            <div
              key={recommendation.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Restaurant image */}
              {recommendation.restaurant_image_url ? (
                <img
                  src={recommendation.restaurant_image_url}
                  alt={recommendation.restaurant_name}
                  className="w-full h-28 object-contain bg-white pt-3"
                />
              ) : (
                <div className="w-full h-28 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-medium">
                    {recommendation.restaurant_name}
                  </span>
                </div>
              )}

              <div className="px-4 pb-4 pt-2">
                {/* Stars + edit */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() =>
                      navigate(`/restaurant/${recommendation.restaurant_id}/recommendations/${recommendation.id}`)
                    }
                    aria-label="Edit recommendation"
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>

                {/* Description */}
                {recommendation.description && (
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                    {recommendation.description}
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
