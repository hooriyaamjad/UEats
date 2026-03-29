import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Preferences from "./pages/preferences";
import ViewRestaurants from "./pages/view-restaurants";
import ProtectedRoute from "./components/ProtectedRoute";

// TODO: add more routes here as pages are built (/signup, /login, /home, /profile, etc.)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-restaurants" element={<ViewRestaurants />} /> {/* Move this to protected? Unless we're doing guest view */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/preferences" element={<Preferences />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}