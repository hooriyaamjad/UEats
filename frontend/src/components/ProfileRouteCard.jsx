import { useNavigate } from "react-router-dom";

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
        flex flex-col items-center justify-center text-center
        cursor-pointer
        bg-white
        rounded-xl
        shadow-[0_6px_12px_rgba(0,0,0,0.15)]
        hover:shadow-[0_10px_18px_rgba(0,0,0,0.2)]
        transition-all duration-200
        px-4 py-5
        w-full
      "
    >
      <div className="mb-3 text-3xl"> 
        {typeof icon === "string" ? (
          <img src={icon} alt={text} className="w-8 h-8 object-contain" /> 
        ) : (
          icon
        )}
      </div>

      <p className="text-sm font-semibold text-black"> 
        {text}
      </p>
    </div>
  );
}