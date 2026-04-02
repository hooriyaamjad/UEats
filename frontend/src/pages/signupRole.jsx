import { useNavigate } from "react-router-dom";
import { useSignup } from "../context/SignupContext";
import { useState } from "react";
import api from "../utils/api";
import BackButton from "../components/BackButton";

export default function SignupRole() {
  const navigate = useNavigate();
  const { signupData, update } = useSignup();
  const [role, setRole] = useState("student");
  const RESTAURANTS = [
    "A&W",
    "Bake Chef Co.",
    "Canadian Pizza Unlimited",
    "Carl's Jr.",
    "Chaiiwala of London",
    "Coffee Company",
    "Dairy Queen/Orange Julius",
    "The Den & Black Lounge",
    "Freshco Poke",
    "Jugo Juice",
    "Kobe Beef",
    "Korean BBQ",
    "La Fe Dim Sum",
    "Last Defence Lounge",
    "Mr. Pretzels",
    "Noodle and Grill Express",
    "OPA! of Greece",
    "Starbucks",
    "Stör",
    "Subway",
    "Tim Hortons",
    "Tim Hortons Express",
    "True Eats",
    "Umi Sushi",
  ];

  const handleSubmit = async () => {

    try {
      const response = await api.post("/profiles/signup/", {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        profile: {
          is_student: role === "student",
          university: "UCalgary",
          student_id: "",
        },
      });

      if (response.data?.tokens) {
        localStorage.setItem("access_token", response.data.tokens.access);
        localStorage.setItem("refresh_token", response.data.tokens.refresh);
        navigate("/signup/confirmation");
      }
    } catch (error) {
      console.error("Signup failed:", error?.response?.data);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[8px] px-8 md:px-0">
          <div className="absolute top-4 left-4">
            <BackButton to="/signup"/>
          </div>
          <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[12rem] md:w-[24rem] md:h-[18rem] object-contain" />
          <h1 className="w-full max-w-[25rem] text-center text-black text-[2.5rem] font-bold mb-8">Sign Up</h1>
          <h2 className="text-black text-[1.5rem] md:text-[2rem] w-full max-w-[50rem] text-center">Are you a business employee?</h2>
          <form className="flex items-center flex-col gap-[8px] mb-12 w-full max-w-[25rem]">
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="bg-[#F3F3F3] w-full px-[1rem] pr-[2rem] py-[0.75rem] h-[3rem] md:h-[3.5rem] text-[1.2rem] md:text-[1.5rem] hover:brightness-95 cursor-pointer">
              <option value="student">No Selection (I'm a Student)</option>
              {RESTAURANTS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            
            <button type="button" onClick={handleSubmit} className="rounded-[5px] bg-[#E50000] w-full max-w-[12rem] h-[3rem] md:h-[3.5rem] text-white text-[1.75rem] md:text-[2rem] font-bold mt-[1.5rem] hover:brightness-95 cursor-pointer">
              Sign-Up
            </button>
          </form>
          <p className="text-center text-[#726F6F] text-[1.1rem] md:text-[1.5rem] w-full max-w-[40rem]">If you're an employee of a business, we'll contact you with more details to upgrade your account.</p>

        </main>
  );
}