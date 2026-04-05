
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

    </div>
  );
}