import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[16rem] h-[12rem] md:w-[24rem] md:h-[18rem] object-contain" />
      <h1 className="text-black text-[3rem] md:text-[4.5rem] font-bold text-center">UEats</h1>
      <p className="text-black text-[1.25rem] md:text-[2rem] w-full max-w-[50rem] text-center">Your campus food compass for smarter, tastier decisions!</p>
      <nav className="flex flex-col md:flex-row items-center gap-3 md:gap-16 m-[1.5rem] w-full max-w-[24rem]  mb-[4rem]">
        <Link to="/login" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[60%] md:w-full h-[3rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[1.5rem] font-bold hover:brightness-95 cursor-pointer">
          Login
        </Link>
        <Link to="/signup" className="flex items-center justify-center rounded-[5px] bg-[#F5C30F] w-[60%] md:w-full h-[3rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[1.5rem] font-bold hover:brightness-95 cursor-pointer">
          Sign-Up
        </Link>
      </nav>
      <p className="md:text-[1.2rem] italic text-[#555555]">Not a UCalgary student?</p>
      <Link to="/view-restaurants" className="text-blue-400 hover:underline cursor-pointer italic md:text-[1.2rem]">View Restaurants as Guest</Link>
    </main>
  );
}