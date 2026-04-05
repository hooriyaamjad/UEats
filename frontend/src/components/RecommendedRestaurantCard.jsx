import { Star } from "lucide-react";

export default function RecommendedRestaurantCard({
  image,
  maxPrice,
  dietary = [],
  allergens = [],
  opening,
  closing,
  rating,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_6px_12px_rgba(0,0,0,0.1)] overflow-hidden w-full max-w-[320px]">
      
        <img
            src={image}
            alt="Restaurant"
            className="w-full h-[140px] object-cover"
        />

        <div className="p-4 flex flex-col gap-2">

            <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-700">
                Up to ${maxPrice}
            </p>

            <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">{rating}</span>
            </div>
            </div>

        </div>
    </div>
  );
}