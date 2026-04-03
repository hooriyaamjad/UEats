// import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./preferences.css";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import PlaceholderProfilePic from "../assets/placeholder_pfp.png";
import { ArrowLeft } from "lucide-react";

const TABS = ["My Reviews", "My Recommendations", "My Preferences"];

export default function ViewRestaurants() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Appleseed",
    email: "john@email.com",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //   const [loading, setLoading] = useState(true);

  // TODO: fetch user data

  //   useEffect(() => {
  //     const fetchRestaurants = async () => {
  //       try {
  //         const response = await api.get("/restaurants/");
  //         setRestaurants(response.data);
  //       } catch (error) {
  //         console.error("Failed to fetch restaurants:", error?.response?.data || error.message);
  //         setError("Couldn't connect to the backend. Is the server running?");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchRestaurants();
  //   }, []);

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <Header
        showBack={true}
        onBack={() => navigate(-1)}
        title="University of Calgary"
      />

      <main className="w-full max-w-2xl mx-auto px-5 pt-5 pb-32 flex flex-col gap-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-red-500 font-semibold w-fit"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-4 justify-center">
          <img
            src={PlaceholderProfilePic}
            alt="Profile picture"
            className="h-35  w-35 rounded-full object-cover"
          />
        </div>

        {/* Name */}
        <div className="text-center font-bold text-lg">
          {form.firstName} {form.lastName}
        </div>

        {/* Input fields */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 
      focus:outline-none focus:bg-white focus:border-red-400 
      transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 
      focus:outline-none focus:bg-white focus:border-red-400 
      transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 
      focus:outline-none focus:bg-white focus:border-red-400 
      transition-all duration-200"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-center mt-6">
          <button
            className="flex items-center gap-2 bg-white rounded-2xl px-5 py-2 text-sm font-semibold shadow-sm 
  cursor-pointer hover:shadow-md hover:bg-gray-50 hover:scale-105 
  transition-all duration-200"
            onClick={() => navigate("/edit-profile")}
          >
            Save
          </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}