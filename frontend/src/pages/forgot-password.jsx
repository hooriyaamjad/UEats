import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    navigate("/forgot-password/confirmation");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-8 px-8">
      <div className="absolute top-4 left-4">
        <BackButton to="/login"/>
      </div>
      <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[12rem] h-[9rem] object-contain" />
      <h1 className="w-full max-w-[25rem] text-center text-black text-[2.5rem] font-bold">Forgot Password?</h1>
      <form className="flex flex-col text-[1.2rem] md:text-[1.5rem] mb-4 w-full max-w-[25rem] gap-1">
        <label htmlFor="Email">Email</label>
        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="w-full h-[3rem] md:h-[3.5rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-2" placeholder="example@ucalgary.ca" />
        {error && <p className="text-red-500 text-[1rem]">{error}</p>}
        <button type="button" onClick={handleSubmit} className="self-center rounded-[5px] bg-[#E50000] w-full max-w-[16rem] h-[3rem] md:max-w-[20rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[2rem] font-bold hover:brightness-95 cursor-pointer my-8">Send Reset Link</button>
      </form>
    </main>
  );
}