import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../utils/api";
import BackButton from "../components/BackButton";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/profiles/login/", { username: email, password });
      if (response.data) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error?.response?.data);
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[24px]">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[20rem] h-[14rem] object-contain" />
      <h1 className="w-[25rem] text-black text-[2rem] font-bold text-center">Login to Your Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
        <input id="email" type="text" onChange={(e) => setEmail(e.target.value)} className="w-[25rem] h-[4rem] bg-[#F3F3F3] text-[#726F6F] text-[1.5rem] p-4" placeholder="Email (ex. example@ucalgary.ca)"/>
        <div className="flex flex-col items-end gap-1">
          <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="w-[25rem] h-[4rem] bg-[#F3F3F3] text-[#726F6F] text-[1.5rem] p-4" placeholder="Password"/>
          {/* Currently just redirects to same page */}
          <Link to="/login" className="text-[#726F6F] text-[1.5rem] italic">
            Forgot Password?
          </Link>
        </div>
        {error && <p className="text-red-500 text-[1rem]">{error}</p>}
        <button type="submit" className="flex items-center justify-center self-center rounded-[5px] bg-[#E50000] w-[10rem] h-[3.5rem] text-white text-[2rem] font-bold">
          Login
        </button>
      </form>

    </main>
  );
}