const TAG_ICONS = {
  Halal: "🟡",
  Vegetarian: "🥦",
  Coffee: "☕",
  Pizza: "🍕",
  Burgers: "🍔",
};

export default function TagFilter({ tags, selectedTag, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(selectedTag === tag ? null : tag)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition-colors ${
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
