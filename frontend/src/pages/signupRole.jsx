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
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[8px]">
          <div className="absolute top-4 left-4">
            <BackButton />
          </div>
          <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[24rem] h-[18rem] object-contain" />
          <h1 className="w-[25rem] text-center text-black text-[2rem] font-bold">Sign Up</h1>
          <h2 className="text-black text-[2rem] w-[50rem] text-center">Are you a business employee?</h2>
          <form className="flex items-center flex-col gap-[8px] text-[1.5rem] mb-12">
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="bg-[#F3F3F3] px-[2rem] py-[0.5rem] text-[1.5rem]">
              <option value="student">No Selection (I'm a Student)</option>
              {RESTAURANTS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            
            <button type="button" onClick={handleSubmit} className="rounded-[5px] bg-[#E50000] w-[10rem] h-[3.5rem] text-white text-[2rem] font-bold">
              Sign Up
            </button>
          </form>

        </main>
  );
}