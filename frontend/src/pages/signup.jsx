import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Signup() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[8px]">
          <div className="absolute top-4 left-4">
            <BackButton />
          </div>
          <div className="w-[17rem] h-[11.5rem] bg-black text-white">logo</div>
          <h1 className="w-[25rem] text-center text-black text-[2rem] font-bold">Sign Up</h1>
          <form className="flex flex-col gap-[8px] text-[1.5rem] mb-12">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" className="w-[25rem] h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4" placeholder="John Calgary"/>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="w-[25rem] h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4" placeholder="example@ucalgary.ca"/>

            <label>Password</label>
            <input id="password" type="password" className="w-[25rem] h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4" placeholder="Password"/>

            <label>Confirm Password</label>
            <input id="confirmPassword" type="password" className="w-[25rem] h-[4rem] bg-[#F3F3F3] text-[#726F6F] p-4" placeholder="Repeat Password"/>
          </form>

            <div className="flex flex-row gap-[2rem] items-center justify-center">
              {/* Currently just redirects to signup role page */}
              <Link to="/signup/role" className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[10rem] h-[3.5rem] ml-[2rem] text-white text-[2rem] font-bold">
                Next
              </Link>
              {/* Currently just redirects to signup page, would redirect to faq/help page in the future */}
              <Link to="/signup">
                <button className="text-black text-[2rem] font-bold">?</button>
              </Link>
            </div>
          
        </main>
  );
}