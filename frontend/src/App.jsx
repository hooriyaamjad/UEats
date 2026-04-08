import { BrowserRouter, Routes, Route, Navigate, useParams, Outlet } from "react-router-dom";
import Landing from "./pages/landing";
import Help from "./pages/help";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password"
import ForgotPasswordConfirmation from "./pages/forgot-password-confirmation"
import ResetPassword from "./pages/reset-password"
import Signup from "./pages/signup";
import SignupRole from "./pages/signupRole";
import SignupConfirmation from "./pages/signupConfirmation";
import Home from "./pages/home";
import Preferences from "./pages/preferences";
import Recommendations from "./pages/recommendations";
import { SignupProvider } from "./context/SignupContext";
import ViewRestaurants from "./pages/view-restaurants";
import Profile from "./pages/profile";
import EditProfile from "./pages/edit-profile";
import RestaurantDetail from "./pages/restaurant-detail";
import WriteReview from "./pages/write-review";
import ProtectedRoute from "./components/ProtectedRoute";
import WriteRecommendation from "./pages/write-recc";
import WriteMenuItem from "./pages/write-menu-item";
import MyReviews from "./pages/my-reviews";
import WriteReviewReply from "./pages/write-review-reply"


function RestaurantRedirect() {
  const { id } = useParams();
  return <Navigate to={`/restaurant/${id}/menu`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/help" element={<Help />} />
        <Route element={<SignupProvider><Outlet /></SignupProvider>}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/role" element={<SignupRole />} />
          <Route path="/signup/confirmation" element={<SignupConfirmation />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/confirmation" element={<ForgotPasswordConfirmation />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/view-restaurants" element={<ViewRestaurants />} /> {/* Move this to protected unless we're doing guest view */}
        <Route path="/restaurant/:id" element={<RestaurantRedirect />} />
        <Route path="/restaurant/:id/:tab" element={<RestaurantDetail />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/restaurant/:id/reviews/new" element={<WriteReview />} />
        <Route path="/restaurant/:id/recommendations/new" element={<WriteRecommendation/>}/>
        <Route path="/restaurant/:id/recommendations/:recc_id" element={<WriteRecommendation edit_mode={true}/>}/>
        <Route path="/restaurant/:id/menu_item/new" element={<WriteMenuItem/>}/>
        <Route path="/restaurant/:id/menu_item/:menu_item_index" element={<WriteMenuItem edit_mode={true}/>}/>
        <Route path="/restaurant/:id/reviews/:review_id/reply" element={<WriteReviewReply/>}/>
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}