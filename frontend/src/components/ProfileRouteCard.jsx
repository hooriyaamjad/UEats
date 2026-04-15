import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ProfileRouteCard({
  icon,
  text,
  to,
  state,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(to, {
          state,
        })
      }
     className="
      flex items-center justify-between
      cursor-pointer
      bg-white
      rounded-xl
      shadow-[0_6px_12px_rgba(0,0,0,0.12)]
      hover:shadow-[0_12px_22px_rgba(0,0,0,0.18)]
      hover:bg-gray-50
      hover:-translate-y-1
      transform
      transition-all duration-300 ease-out
      px-5 py-4
      w-full
    "
    >
      <div className="flex items-center gap-4">

        <div className="text-xl text-gray-600">
          {typeof icon === "string" ? (
            <img
              src={icon}
              alt={text}
              className="w-6 h-6 object-contain"
            />
          ) : (
            icon
          )}
        </div>

        <p className="text-base font-semibold text-black">
          {text}
        </p>

      </div>

      <ChevronRight className="h-5 w-5 text-gray-400" />

    </div>
  );
}