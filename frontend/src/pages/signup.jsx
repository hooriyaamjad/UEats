import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../context/SignupContext";
import { useState } from "react";
import BackButton from "../components/BackButton";

export default function Signup() {
  const navigate = useNavigate();
  const { update } = useSignup();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = () => {
    update({ username: email, email, password });
    navigate("/signup/role");
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[8px] px-8">
          <div className="absolute top-4 left-4">
            <BackButton to="/"/>
          </div>
          <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[12rem] h-[9rem] md:w-[17rem] md:h-[11.5rem] object-contain" />
          <h1 className="w-full max-w-[25rem] text-center text-black text-[2.5rem] font-bold">Sign Up</h1>
          <form className="flex flex-col text-[1.2rem] md:text-[1.5rem] mb-4 w-full max-w-[25rem]">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" onChange={(e) => setName(e.target.value)} className="w-full h-[3rem] md:h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-6" placeholder="John Calgary"/>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="w-full h-[3rem] md:h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-6" placeholder="example@ucalgary.ca"/>

            <label>Password</label>
            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="w-full h-[3rem] md:h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-6" placeholder="Password"/>

            <label>Confirm Password</label>
            <input id="confirmPassword" type="password" className="w-full h-[3rem] md:h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-12" placeholder="Repeat Password"/>
            
            <div className="flex flex-row items-center justify-center mb-8 gap-[2rem]">
              <div className="w-[1.5rem]" />
              <button type="button" onClick={handleNext} className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-full max-w-[10rem] h-[3rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[2rem] font-bold hover:brightness-95 cursor-pointer">
                Next
              </button>
              <Link to="/help" className="w-[1.5rem] flex justify-center">
                <img src="/src/assets/help_icon.png" className="w-[1.5rem] h-[1.5rem] hover:brightness-95 cursor-pointer" />
              </Link>
            </div>
          </form>

            
          
        </main>
  );
}