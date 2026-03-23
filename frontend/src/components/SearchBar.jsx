// THIS IS A PLACEHOLDER COMPONENT


export default function SearchBar({ onSearch }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
      <svg
        className="w-4 h-4 text-gray-400 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search Restaurants on Campus"
        className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
        onChange={(e) => onSearch?.(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch?.(e.target.value)}
      />
    </div>
  );
}
