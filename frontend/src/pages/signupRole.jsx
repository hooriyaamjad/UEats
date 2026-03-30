import { useNavigate } from "react-router-dom";
import { useSignup } from "../context/SignupContext";
import { useState } from "react";
import api from "../utils/api";
import BackButton from "../components/BackButton";

export default function SignupRole() {
  const navigate = useNavigate();
  const { signupData, update } = useSignup();
  const [role, setRole] = useState("");

  const handleSubmit = async () => {
    update({ role });

    try {
      const response = await api.post("/profiles/signup/", {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        profile: {
          is_student: role === "" || role === "student",
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
          <div className="w-[24rem] h-[18rem] bg-black text-white">logo</div>
          <h1 className="w-[25rem] text-center text-black text-[2rem] font-bold">Sign Up</h1>
          <h2 className="text-black text-[2rem] w-[50rem] text-center">Are you a business employee?</h2>
          <form className="flex flex-col gap-[8px] text-[1.5rem] mb-12">
            <select id="role" className="bg-[#F3F3F3] px-[2rem] py-[0.5rem] text-[1.5rem]">
              <option value="student">No Selection (I'm a Student)</option>
              {/* placeholder values for now */}
              <option value="restaurant1">Restaurant 1</option>
              <option value="restaurant2">Restaurant 2</option>
            </select>
            
            <button onClick={handleSubmit} className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[10rem] h-[3.5rem] text-white text-[2rem] font-bold">
              Sign Up
            </button>
          </form>

        </main>
  );
}