import api from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import PlaceholderProfilePic from "../assets/placeholder_pfp.png";
import { Pencil } from "lucide-react";
import ResponseBanner from "../components/ResponseBanner";
import ProfilePicSelector from "../components/ProfilePicSelector";
import ShowPassword from "../assets/show_password.png";
import HidePassword from "../assets/hide_password.png";

const TABS = ["My Reviews", "My Recommendations", "My Preferences"];

export default function ViewRestaurants() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(location.state?.profileData || {});
  const [success, setSuccess] = useState("");
  const [showProfilePicSelector, setShowProfilePicSelector] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

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

      if (newPassword) {
        if (!passwordsMatch) {
          setError("New password and confirm password do not match.");
          setSaving(false);
          return;
        }
        updatedFields.password = newPassword;
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
      <Header showBack={true} title="Edit Profile" />

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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 
      focus:outline-none focus:bg-white focus:border-red-400 
      transition-all duration-200"
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                <img
                  src={showPassword ? HidePassword : ShowPassword}
                  alt="toggle password"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 
      focus:outline-none focus:bg-white focus:border-red-400 
      transition-all duration-200"
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                <img
                  src={showPassword ? HidePassword : ShowPassword}
                  alt="toggle password"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            disabled={!passwordsMatch && (newPassword || confirmPassword)}
            className={`px-4 py-3 rounded-xl font-semibold transition
    ${
      !passwordsMatch && (newPassword || confirmPassword)
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600 text-white"
    }
  `}
          >
            Save Changes
          </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}