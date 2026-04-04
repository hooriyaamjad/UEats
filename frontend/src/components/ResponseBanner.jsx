import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

const ResponseBanner = ({
  message,
  type = "success", // success | error
  onClose,
  duration = 3000, // 3s timeout
}) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
  };

  const styles = {
    success: "bg-green-50 text-green-700 border-green-200",
    error: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div
      className={`flex items-center justify-between border rounded-xl px-4 py-3 shadow-sm ${styles[type]}`}
    >
      <div className="flex items-center gap-2 font-medium">
        {icons[type]}
        {message}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="opacity-70 hover:opacity-100 transition"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ResponseBanner;