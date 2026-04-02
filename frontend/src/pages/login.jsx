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
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[24px] px-8">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[12rem] h-[9rem] md:w-[24rem] md:h-[18rem] object-contain" />
      <h1 className="w-full max-w-[25rem] text-black text-[1.5rem] md:text-[2rem] font-bold text-center">Login to Your Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[1.25rem] md:text-[1.5rem] w-full max-w-[25rem]">
        <input id="email" type="text" onChange={(e) => setEmail(e.target.value)} className="w-full h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4" placeholder="Email"/>
        <div className="flex flex-col items-end gap-1">
          <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="w-full h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4" placeholder="Password"/>
          {/* show "Forgot Password?" here on desktop */}
          <Link to="/login" className="hidden md:block text-[#726F6F] text-[1.5rem] italic">
            Forgot Password?
          </Link>
        </div>
        {error && <p className="text-red-500 text-[1rem]">{error}</p>}
        <div className="flex justify-center w-full my-4">
          <div className="flex items-center gap-4">
            <div className="w-[1.5rem]" />
            <button type="submit" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[10rem] h-[3rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[2rem] font-bold">
              Login
            </button>
            <Link to="/help">
              <img src="/src/assets/help_icon.png" alt="Help button" className="w-[1.5rem] h-[1.5rem]" />
            </Link>
          </div>
        </div>
        {/* show "Forgot Password?" here on mobile */}
        <Link to="/login" className="md:hidden text-[#726F6F] text-[1.2rem] italic self-center">
          Forgot Password?
        </Link>
      </form>

    </main>
  );
}