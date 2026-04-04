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
        w-full max-w-[160px]   /* 👈 smaller width */
      `}
    >
     
    </div>
  );
}