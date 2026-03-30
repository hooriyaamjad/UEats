import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[24rem] h-[18rem] object-contain" />
      <h1 className="text-black text-[4.5rem] font-bold text-center">UEats</h1>
      <p className="text-black text-[2rem] w-[50rem] text-center">Your campus food compass for smarter, tastier decisions!</p>
      <nav className="flex flex-row items-center gap-18 m-[1.5rem]">
        <Link to="/login" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[10rem] h-[3.5rem] text-white text-[2rem] font-bold">
          Login
        </Link>
        <Link to="/signup" className="flex items-center justify-center rounded-[5px] bg-[#F5C30F] w-[10rem] h-[3.5rem] text-white text-[2rem] font-bold">
          Sign-Up
        </Link>
      </nav>
      <Link to="/preferences" className="text-blue-600 underline">Preferences</Link>
      <Link to="/view-restaurants" className="text-blue-600 underline">View Restaurants</Link>
    </main>
  );
}