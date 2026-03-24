import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function SignupRole() {
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
              <option value="restaurant1">Restaurant 1</option>
              <option value="restaurant2">Restaurant 2</option>
            </select>
          </form>

          {/* Currently just redirects to signup confirmation page */}
          <Link to="/signup/confirmation" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[10rem] h-[3.5rem] text-white text-[2rem] font-bold">
            Sign Up
          </Link>
          
        </main>
  );
}