import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

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
        <button
            onClick={() => navigate("/view-restaurants")}
            className={`mt-5 px-4 py-3 cursor-pointer bg-white text-black font-semibold rounded-xl shadow-[0_6px_12px_rgba(0,0,0,0.12)]
 hover:shadow-[0_12px_22px_rgba(0,0,0,0.18)] hover:bg-gray-50 hover:-translate-y-1 transform transition-all duration-300 ease-out`}
          > View as Guest          
        </button>
    </main>
  );
}