import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[24px]">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="w-[22rem] h-[15rem] bg-black text-white">logo</div>
      <h1 className="w-[33rem] text-black text-[3rem] font-bold">Login to Your Account</h1>
      <form className="flex flex-col gap-[16px]">
        <input type="text" className="w-[33rem] h-[5rem] bg-[#F3F3F3] text-[#726F6F] text-[2rem] p-4" placeholder="Email (ex. example@ucalgary.ca)"/>
        <div className="flex flex-col items-end gap-2">
          <input type="password" className="w-[33rem] h-[5rem] bg-[#F3F3F3] text-[#726F6F] text-[2rem] p-4" placeholder="Password"/>
          {/* Currently just redirects to same page */}
          <Link to="/login" className="text-[#726F6F] text-[2rem] italic">
            Forgot Password?
          </Link>
        </div>
      </form>
        {/* Currently just redirects to home page without authenticating */}
        <Link to="/home" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[13rem] h-[4.5rem]">
          <button className="text-white text-[2.5rem] font-bold">Login</button>
        </Link>
      
      
    </main>
  );
}