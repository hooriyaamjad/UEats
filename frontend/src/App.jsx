import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SearchRestaurants from "./pages/SearchRestaurants";

// TODO: add more routes here as pages are built (/signup, /login, /home, /profile, etc.)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search-restaurants" element={<SearchRestaurants />} />

      </Routes>
    </BrowserRouter>
  );
}