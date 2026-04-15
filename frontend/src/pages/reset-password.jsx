import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill out both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';
      await axios.post(`${baseURL}/profiles/password-reset/confirm/`, {
        uid,
        token,
        new_password: newPassword,
      });
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.error;
      setError(msg ?? "This link is invalid or has expired. Please request a new one.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-8 px-8">
      <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[12rem] h-[9rem] object-contain" />
      <h1 className="w-full max-w-[25rem] text-center text-black text-[2.5rem] font-bold">Reset Password</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col text-[1.2rem] md:text-[1.5rem] mb-4 w-full max-w-[25rem] gap-1">
        <label htmlFor="new-password">New Password</label>
        <input
          id="new-password"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full h-[3rem] md:h-[3.5rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-2"
          placeholder="Enter new password"
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full h-[3rem] md:h-[3.5rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-2"
          placeholder="Confirm new password"
        />
        {error && <p className="text-red-500 text-[1rem]">{error}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="self-center rounded-[5px] bg-[#E50000] w-full max-w-[16rem] h-[3rem] md:max-w-[20rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[2rem] font-bold hover:brightness-95 cursor-pointer my-8 disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </main>
  );
}