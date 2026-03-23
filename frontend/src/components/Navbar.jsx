import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar({ onSearch }) {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
      <Link to="/" className="flex items-center shrink-0">
        {/* TODO: replace text logo with actual logo asset */}
        <span className="text-xl font-bold tracking-tight">
          <span className="text-yellow-400">U</span>Eats
        </span>
      </Link>

      <div className="flex-1 flex justify-center">
        <SearchBar onSearch={onSearch} />
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="px-4 py-1.5 rounded-full border border-gray-800 text-sm font-medium hover:bg-gray-50 transition-colors">
          University of Calgary
        </button>
        <Link to="/profile">
          <div className="w-9 h-9 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center hover:bg-sky-200 transition-colors">
            <svg
              className="w-5 h-5 text-sky-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        </Link>
      </div>
    </nav>
  );
}
