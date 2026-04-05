import { BrowserRouter, Routes, Route, Navigate, useParams, Outlet } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SignupRole from "./pages/signupRole";
import SignupConfirmation from "./pages/signupConfirmation";
import Home from "./pages/home";
import Preferences from "./pages/preferences";
import { SignupProvider } from "./context/SignupContext";
import ViewRestaurants from "./pages/view-restaurants";
import Profile from "./pages/profile";
import EditProfile from "./pages/edit-profile";
import RestaurantDetail from "./pages/restaurant-detail";
import WriteReview from "./pages/write-review";
import ProtectedRoute from "./components/ProtectedRoute";
import WriteRecommendation from "./pages/write-recc";

function RestaurantRedirect() {
  const { id } = useParams();
  return <Navigate to={`/restaurant/${id}/menu`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<SignupProvider><Outlet /></SignupProvider>}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/role" element={<SignupRole />} />
          <Route path="/signup/confirmation" element={<SignupConfirmation />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/view-restaurants" element={<ViewRestaurants />} /> {/* Move this to protected unless we're doing guest view */}
        <Route path="/profile" element={<Profile />} /> {/* TODO: Move this to protected. Putting this here for dev purposes */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* TODO: Move this to protected. Putting this here for dev purposes */}
        <Route path="/restaurant/:id" element={<RestaurantRedirect />} />
        <Route path="/restaurant/:id/:tab" element={<RestaurantDetail />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/restaurant/:id/reviews/new" element={<WriteReview />} />
        <Route path="/restaurant/:id/recommendations/new" element={<WriteRecommendation/>}/>
        <Route path="/restaurant/:id/recommendations/:recc_id" element={<WriteRecommendation edit_mode={true}/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}