import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import Copy from "../assets/copy.png";


export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[24px] px-8">
      <div className="absolute top-4 left-4">
        <BackButton to="/login" />
      </div>

      <img
        src="/src/assets/ueats_logo.png"
        alt="UEats logo"
        className="w-[12rem] h-[9rem] md:w-[24rem] md:h-[18rem] object-contain"
      />

      <h1 className="w-full max-w-[25rem] text-black text-[1.5rem] md:text-[2rem] font-bold text-center">
        Forgot Password?
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-[25rem] items-center text-[1.25rem] md:text-[1.5rem]">
        <p className="text-gray-600 text-center">
          No worries! Our team can help you get back into your account.
        </p>

        <p className="text-gray-600 text-center">
          Please contact:
        </p>

        <div className="flex items-center gap-2">
          <a
            href="mailto:support@ueats.ca"
            className="text-blue-600 underline"
          >
            support@ueats.ca
          </a>

          <button
            onClick={() =>
              navigator.clipboard.writeText("support@ueats.ca")
            }
            className="hover:opacity-70 cursor-pointer"
          >
            <img src={Copy} alt="Copy" className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[1rem] text-gray-400 text-center">
          We typically respond within 24 hours.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center rounded-[5px] bg-[#E50000] w-[16rem] h-[3rem] md:h-[3.5rem] text-white text-[1.5rem] md:text-[2rem] font-bold hover:brightness-95 cursor-pointer"
        >
          Back To Login
        </button>
      </div>
    </main>
  );
}