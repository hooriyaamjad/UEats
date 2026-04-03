import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./preferences.css";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import PlaceholderProfilePic from "../assets/placeholder_pfp.png";
import { Pencil, LogOut } from "lucide-react";
import ConfirmationPopup from "../components/ConfirmationPopup";

const TABS = ["My Reviews", "My Recommendations", "My Preferences"];

export default function ViewRestaurants() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("My Reviews");
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
        <div className="flex items-center gap-4 justify-center text-gray-600">
          <button
            className="flex items-center gap-2 bg-white rounded-2xl px-5 py-2 text-sm font-semibold shadow-sm 
  cursor-pointer hover:shadow-md hover:bg-gray-50 hover:scale-105 
  transition-all duration-200"
            onClick={() =>
              navigate("/edit-profile", {
                state: { profileData: profile },
              })
            }
          >
            <Pencil size={16} />
            Edit Profile
          </button>
          <button
            className="flex items-center gap-2 bg-red-500 rounded-2xl px-5 py-2 text-sm text-white font-semibold shadow-sm 
  cursor-pointer hover:shadow-md hover:bg-red-600 hover:scale-105 
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

        {/* Tabs */}
        <div className=" w-full rounded-2xl bg-white shadow-sm">
          <div className="flex border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-3 text-xs sm:text-sm md:text-base font-semibold transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Tab content */}
        <div className="px-5 pt-4">
          {activeTab === "My Reviews" && <MyReviewsTab />}
          {activeTab === "My Recommendations" && <MyRecommendationsTab />}
          {activeTab === "My Preferences" && <MyPreferencesTab />}
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

// placeholder text, for development of features
function MyReviewsTab() {
  return (
    <div className="text-center py-12 text-gray-400 text-sm">
      My Reviews coming soon.
    </div>
  );
}

// placeholder text, for development of features
function MyRecommendationsTab() {
  return (
    <div className="text-center py-12 text-gray-400 text-sm">
      My Recommendations coming soon.
    </div>
  );
}

// placeholder text, for development of features
function MyPreferencesTab() {
  return (
    <div className="text-center py-12 text-gray-400 text-sm">
      My Preferences coming soon.
    </div>
  );
}