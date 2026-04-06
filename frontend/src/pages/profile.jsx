import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import PlaceholderProfilePic from "../assets/placeholder_pfp.png";
import { Pencil, LogOut } from "lucide-react";
import ConfirmationPopup from "../components/ConfirmationPopup";
import PreferencesIcon from "../assets/preferences.png";
import EmptyStar from "../assets/empty_star.png";
import ThumbsUp from "../assets/thumbs_up.png";
import EditIcon from "../assets/editing.png";
import ProfileRouteCard from "../components/ProfileRouteCard";

const TABS = ["My Reviews", "My Recommendations", "My Preferences"];

export default function ViewRestaurants() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profiles/me/");
        setProfile(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error?.response?.data || error.message
        );
        setError("Couldn't connect to the backend. Is the server running?");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <Header
        showBack={true}
        onBack={() => navigate(-1)}
        title="University of Calgary"
      />

      <main className="w-full max-w-2xl mx-auto px-5 pt-5 pb-32 flex flex-col gap-6">
        <div className="flex items-center gap-4 justify-center">
          <img
            src={profile?.image_url || PlaceholderProfilePic}
            alt="Profile picture"
            className="h-35  w-35 rounded-full object-cover"
          />
        </div>
        <div className="flex items-center gap-4 justify-center font-bold text-lg">
          {profile.first_name} {profile.last_name}
        </div>
        <div className="flex items-center gap-4 justify-center font text-md mt-[-15px] text-gray-600">
          {profile.email}
        </div>
      

        <div className="grid gap-4">
          <ProfileRouteCard
            icon={EditIcon}
            text="Edit Profile"
            to="/edit-profile"
            state={{ profileData: profile }}
          />

          <ProfileRouteCard
            icon={PreferencesIcon}
            text="My Preferences"
            to="/preferences"
          />

          {/* fix routing for these two cards once those pages are implemented */}  
          <ProfileRouteCard
            icon={EmptyStar}
            text="My Reviews"
            to="/preferences"
          />

          <ProfileRouteCard
            icon={ThumbsUp}
            text="My Recommendations"
            to="/recommendations"
          />
        </div>

          <div className="flex items-center gap-4 mt-10 justify-center text-gray-600">
          
          <button
            className="flex items-center gap-2 bg-red-500 rounded-xl px-10 py-3 text-sm text-white font-semibold shadow-sm 
  cursor-pointer hover:shadow-md hover:bg-red-600 hover:shadow-[0_12px_22px_rgba(0,0,0,0.18)]
  hover:-translate-y-1
  transition-all duration-200"
            onClick={() => setShowLogoutPopup(true)}
          >
            <LogOut size={16} />
            Logout
          </button>

          <ConfirmationPopup
            isOpen={showLogoutPopup}
            title="Log out?"
            message="Are you sure you want to log out of your account?"
            confirmText="Logout"
            cancelText="Cancel"
            onConfirm={handleLogout}
            onCancel={() => setShowLogoutPopup(false)}
          />
        </div>
 
      </main>

      <BottomNavBar />
    </div>
  );
}