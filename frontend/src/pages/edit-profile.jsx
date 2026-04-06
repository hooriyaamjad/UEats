import api from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import PlaceholderProfilePic from "../assets/placeholder_pfp.png";
import { ArrowLeft, Pencil } from "lucide-react";
import ResponseBanner from "../components/ResponseBanner";
import ProfilePicSelector from "../components/ProfilePicSelector";

const TABS = ["My Reviews", "My Recommendations", "My Preferences"];

export default function ViewRestaurants() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(location.state?.profileData || {});
  const [success, setSuccess] = useState("");
  const [showProfilePicSelector, setShowProfilePicSelector] = useState(false);

  const [form, setForm] = useState({
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    email: profile?.email || "",
    profilePic: profile?.image_url || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectProfilePic = (url) => {
    setForm((prev) => ({
      ...prev,
      profilePic: url,
    }));
    setShowProfilePicSelector(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const updatedFields = {};

      if (form.firstName !== (profile.first_name || "")) {
        updatedFields.first_name = form.firstName;
      }

      if (form.lastName !== (profile.last_name || "")) {
        updatedFields.last_name = form.lastName;
      }

      if (form.profilePic !== (profile.image_url || "")) {
        updatedFields.image_url = form.profilePic;
      }

      // TODO: add more editable fields here

      if (Object.keys(updatedFields).length === 0) {
        setSaving(false);
        return;
      }

      try {
        const response = await api.patch("/profiles/me/", updatedFields);

        setProfile(response.data);
        setSuccess("Profile updated successfully!");
      } catch (err) {
        setError("Failed to update profile.", err.message);
      }
    } catch (err) {
      console.error(
        "Failed to update profile:",
        err?.response?.data || err.message
      );
      setError("Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <Header
        showBack={true}
        onBack={() => navigate(-1)}
        title="University of Calgary"
      />

      <main className="w-full max-w-2xl mx-auto px-5 pt-5 pb-32 flex flex-col gap-6">
        <ResponseBanner
          message={success}
          type="success"
          onClose={() => setSuccess("")}
        />

        <ResponseBanner
          message={error}
          type="error"
          onClose={() => setError("")}
        />
        {/* Back button */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-red-500 font-semibold w-fit"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex justify-center">
          <div className="relative w-fit">
            <img
              src={form.profilePic || PlaceholderProfilePic}
              alt="Profile picture"
              className="h-35 w-35 rounded-full object-cover"
            />

            <button
              onClick={() => setShowProfilePicSelector(true)}
              className="absolute bottom-1 right-1 
                 bg-white rounded-full p-2 
                 shadow-md border border-gray-200
                 hover:bg-gray-50 hover:scale-105
                 transition"
            >
              <Pencil size={16} className="text-red-500" />
            </button>
          </div>
        </div>

        <ProfilePicSelector
          isOpen={showProfilePicSelector}
          onClose={() => setShowProfilePicSelector(false)}
          onSelect={handleSelectProfilePic}
          selectedAvatar={form.profilePic}
        />

        {/* Name */}
        <div className="text-center font-bold text-lg">
          {form.firstName} {form.lastName}
        </div>

        {/* Input fields */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              First Name
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
              Last Name
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
              disabled
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
            className="flex items-center gap-2 bg-white rounded-2xl px-5 py-4 text-sm font-semibold shadow-sm 
  cursor-pointer  hover:shadow-[0_12px_22px_rgba(0,0,0,0.18)]
  hover:bg-gray-50
  hover:-translate-y-1
  transition-all duration-200"
            onClick={handleSave}
            disabled={saving}
          >
            Save Changes
          </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}