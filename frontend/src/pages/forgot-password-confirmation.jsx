import { Link } from "react-router-dom";

export default function ForgotPasswordConfirmation() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-8 px-8">
      <img src="/src/assets/mobile_check.png" alt="Email sent confirmation" className="w-[12rem] h-[9rem] object-contain" />
      <h1 className="w-full max-w-[25rem] text-center text-black text-[1.5rem] md:text-[2.5rem] font-bold">Password reset link has been sent!</h1>
      <p className="text-center text-[#726F6F] text-[1.1rem] md:text-[1.5rem] w-full max-w-[40rem]">If an account exists with that email, you'll receive a reset link within 24 hours.</p>
      <Link to="/login" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-full max-w-[16rem] md:max-w-[20rem] h-[3rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[2rem] font-bold hover:brightness-95 cursor-pointer">
        Back to Login
      </Link>
    </main>
  );
}