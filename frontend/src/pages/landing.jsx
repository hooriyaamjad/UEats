import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      Landing
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}