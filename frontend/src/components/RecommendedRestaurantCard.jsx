import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecommendedRestaurantCard({
    id,
    image,
    name,
    maxPrice,
    dietary = [],
    allergens = [],
    opening,
    closing,
    rating,
}) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/restaurant/${id}`)}
    className="bg-white rounded-2xl border border-gray-200 
    shadow-[0_6px_12px_rgba(0,0,0,0.1)] overflow-hidden w-full max-w-[320px] mx-auto">        
        <img
            src={image}
            alt="Restaurant"
            className="w-full h-[140px] object-cover"
        />

        <div className="p-4 flex flex-col gap-2">
            <h2 className="text-lg font-bold text-black">{name}</h2>

            <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-700">
                Up to ${maxPrice}
            </p>

            <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">{rating}</span>
            </div>
            </div>

            <p className="text-xs text-gray-500">
            {opening} - {closing}
            </p>

            {dietary.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                    {dietary.map((item) => (
                    <span
                        key={item}
                        className="text-[10px] bg-green-100 text-green-700 px-2 py-[2px] rounded-full font-medium"
                    >
                        {item}
                    </span>
                    ))}
                </div>
            )}

            {allergens.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                    {allergens.map((item) => (
                    <span
                        key={item}
                        className="text-[10px] bg-red-100 text-red-600 px-2 py-[2px] rounded-full font-medium"
                    >
                        <p>no {item}</p>
                    </span>
                    ))}
                </div>
            )}

        </div>
    </div>
  );
}