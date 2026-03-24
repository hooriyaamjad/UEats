import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-[30rem] h-[21rem] bg-black text-white">logo</div>
      <h1 className="text-black text-[6rem] font-bold">UEats</h1>
      <p className="text-black text-[2.25rem] w-[50rem] text-center">Your campus food compass for smarter, tastier decisions!</p>
      <nav className="flex flex-row items-center gap-18 m-[2rem]">
        <Link to="/login" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[13rem] h-[4.5rem]">
          <button className="text-white text-[2.5rem] font-bold">Login</button>
        </Link>
        <Link to="/signup" className="flex items-center justify-center rounded-[5px] bg-[#F5C30F] w-[13rem] h-[4.5rem]">
          <button className="text-white text-[2.5rem] font-bold">Sign-Up</button>
        </Link>
      </nav>
      <Link to="/preferences" className="text-blue-600 underline">Preferences</Link>
    </main>
  );
}