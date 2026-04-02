import { useNavigate } from "react-router-dom";

export default function BackButton({ to }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="text-2xl font-bold text-gray-800 hover:text-black transition-colors cursor-pointer"
    >
      {"<"}
    </button>
  );
}