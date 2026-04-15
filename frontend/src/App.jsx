import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Preferences from "./pages/preferences";
import ViewRestaurants from "./pages/view-restaurants";
import Profile from "./pages/profile";
import EditProfile from "./pages/edit-profile";
import RestaurantDetail from "./pages/restaurant-detail";
import WriteReview from "./pages/write-review";
import ProtectedRoute from "./components/ProtectedRoute";

function RestaurantRedirect() {
  const { id } = useParams();
  return <Navigate to={`/restaurant/${id}/menu`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-restaurants" element={<ViewRestaurants />} /> {/* Move this to protected unless we're doing guest view */}
        <Route path="/profile" element={<Profile />} /> {/* TODO: Move this to protected. Putting this here for dev purposes */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* TODO: Move this to protected. Putting this here for dev purposes */}
        <Route path="/restaurant/:id" element={<RestaurantRedirect />} />
        <Route path="/restaurant/:id/:tab" element={<RestaurantDetail />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/restaurant/:id/reviews/new" element={<WriteReview />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}