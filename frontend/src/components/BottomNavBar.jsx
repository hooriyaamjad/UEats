import { Link, useLocation } from "react-router-dom";
import Search from "../assets/search.png";
import Home from "../assets/home.png";
import Profile from "../assets/profile.png";

export default function BottomNavBar() {
  const location = useLocation();

  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/home", // TODO: add right path
    },
    {
      label: "Search",
      icon: Search,
      path: "/view-restaurants",
    },
    {
      label: "Profile",
      icon: Profile,
      path: "/profile", // TODO: add right path
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-10 px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
                key={item.path}
                to={item.path}
                className={`flex h-16 w-16 items-center justify-center rounded-full shadow-md transition ${
                    isActive 
                    ? "bg-gray-100 scale-105" 
                    : "bg-white hover:scale-105"
                }`}
                >
                <img
                    src={item.icon}
                    alt={item.label}
                    className={`h-7 w-7 object-contain ${
                    isActive ? "opacity-100" : "opacity-70"
                    }`}
                />
            </Link>
          );
        })}
      </div>
    </div>
  );
}