import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[24px]">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="w-[20rem] h-[14rem] bg-black text-white">logo</div>
      <h1 className="w-[25rem] text-black text-[2rem] font-bold text-center">Login to Your Account</h1>
      <form className="flex flex-col gap-[12px]">
        <input id="email" type="text" className="w-[25rem] h-[4rem] bg-[#F3F3F3] text-[#726F6F] text-[1.5rem] p-4" placeholder="Email (ex. example@ucalgary.ca)"/>
        <div className="flex flex-col items-end gap-1">
          <input id="password" type="password" className="w-[25rem] h-[4rem] bg-[#F3F3F3] text-[#726F6F] text-[1.5rem] p-4" placeholder="Password"/>
          {/* Currently just redirects to same page */}
          <Link to="/login" className="text-[#726F6F] text-[1.5rem] italic">
            Forgot Password?
          </Link>
        </div>
      </form>

      {/* Currently just redirects to home page without authenticating */}
      <Link to="/home" className="flex items-center justify-center self-center rounded-[5px] bg-[#E50000] w-[10rem] h-[3.5rem] text-white text-[2rem] font-bold">
        Login
      </Link>
      
    </main>
  );
}