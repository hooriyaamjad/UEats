const TAG_ICONS = {
  Halal: "🟡",
  Vegetarian: "🥦",
  Coffee: "☕",
  Pizza: "🍕",
  Burgers: "🍔",
};

export default function TagFilter({
  tags = [],
  selectedTag = null,
  onSelect = () => {},
}) {
  return (
    <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(selectedTag === tag ? null : tag)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition whitespace-nowrap ${
            selectedTag === tag
              ? "bg-yellow-300 border-yellow-300 font-medium"
              : "bg-white border-gray-300 hover:border-gray-400"
          }`}
        >
          <span>{TAG_ICONS[tag] ?? "🍽️"}</span>
          {tag}
        </button>
      ))}
    </div>
  );
}
