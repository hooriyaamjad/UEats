import { Link } from "react-router-dom";

export default function SignupConfirmation() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[8px]">
          <img src="/src/assets/signup_confirmation_icon.png" alt="Account created successfully" className="w-[24rem] h-[18rem] object-contain" />
          <h1 className="w-auto text-center text-black text-[2rem]">Successfully Created Account!</h1>

          {/* Currently just redirects to signup confirmation page */}
          <Link to="/login" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-auto h-[3.5rem] text-white text-[2rem] font-bold px-[2rem] my-[4rem]">
            Back to Login
          </Link>
          
        </main>
  );
}