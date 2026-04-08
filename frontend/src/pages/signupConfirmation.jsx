import { Link } from "react-router-dom";

export default function SignupConfirmation() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[8px]">
          <img src="/src/assets/signup_confirmation_icon.png" alt="Account created successfully" className="w-full max-w-[12rem] md:max-w-[24rem] h-auto object-contain mb-4" />
          <h1 className="w-auto text-center text-black text-[1.4rem] md:text-[2rem]">Successfully Created Account!</h1>

          <Link to="/login" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-auto h-[3rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[1.5rem] font-bold px-[2rem] my-[4rem] hover:brightness-95 cursor-pointer">
            Back to Login
          </Link>
          
        </main>
  );
}