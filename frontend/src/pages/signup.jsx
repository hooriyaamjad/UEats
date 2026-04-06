import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../context/SignupContext";
import { useState } from "react";
import BackButton from "../components/BackButton";
import ShowPassword from "../assets/show_password.png";
import HidePassword from "../assets/hide_password.png";

export default function Signup() {
  const navigate = useNavigate();
  const { update } = useSignup();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    update({ username: email, email, password, firstName, lastName });
    navigate("/signup/role");
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[8px] px-8">
          <div className="absolute top-4 left-4">
            <BackButton to="/"/>
          </div>
          <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[12rem] h-[9rem] object-contain" />
          <h1 className="w-full max-w-[25rem] text-center text-black text-[2.5rem] font-bold">Sign Up</h1>
          <form className="flex flex-col text-[1.2rem] md:text-[1.5rem] mb-4 w-full max-w-[25rem] gap-1">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full h-[3rem] md:h-[3.5rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-2" placeholder="John"/>

            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full h-[3rem] md:h-[3.5rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-2" placeholder="Doe"/>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="w-full h-[3rem] md:h-[3.5rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-2" placeholder="example@ucalgary.ca"/>

           <label>Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[3rem] md:h-[3.5rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-2 pr-12"
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

    <label>Confirm Password</label>

      <div className="relative">
        <input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          className="w-full h-[3rem] md:h-[3.5rem] bg-[#F3F3F3] text-[#726F6F] p-4 mb-2 pr-12"
          placeholder="Repeat Password"
        />

        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
        >
        <img
        src={showConfirmPassword ? HidePassword : ShowPassword}
        alt="toggle password"
        className="w-5 h-5"
      />
        </button>
      </div>
            
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