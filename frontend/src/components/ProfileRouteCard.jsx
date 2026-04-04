import { useNavigate } from "react-router-dom";

export default function ProfileRouteCard({
  icon,
  text,
  to,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className={`
        flex flex-col justify-center
        cursor-pointer
        bg-gray-100
        rounded-xl
        shadow-sm
        hover:shadow-md
        transition
        px-4 py-5
        w-full max-w-[160px]  
      `}
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