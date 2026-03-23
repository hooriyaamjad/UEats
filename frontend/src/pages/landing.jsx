import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-white text-gray-800">
      <h1 className="text-2xl font-bold">UEats — Landing Page</h1>
      <Link to="/login" className="text-blue-600 underline">Login</Link>
      <Link to="/signup" className="text-blue-600 underline">Sign Up</Link>
      <Link to="/preferences" className="text-blue-600 underline">Preferences</Link>
    </div>
  );
}