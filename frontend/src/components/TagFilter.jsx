import HalalIcon from "../assets/halal.png";
import FillingIcon from "../assets/filling.png";
import VegetarianIcon from "../assets/vegetarian.png";
import BakedGoodsIcon from "../assets/baked-goods.png";
import CleanIcon from "../assets/clean.png";
import CheapIcon from "../assets/cheap.png";

const TAG_ICONS = [
  { name: "Halal", icon: HalalIcon },
  { name: "Filling", icon: FillingIcon },
  { name: "Vegetarian", icon: VegetarianIcon },
  { name: "Baked Goods", icon: BakedGoodsIcon },
  { name: "Clean", icon: CleanIcon },
  { name: "Cheap", icon: CheapIcon },
];

export default function TagFilter({
  tags = [],
  selectedTag = null,
  onSelect = () => {},
}) {
  return (
    <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      {tags.map((tag) => {
        const tagData = TAG_ICONS.find((t) => t.name === tag);

        return (
          <button
            key={tag}
            onClick={() => onSelect(selectedTag === tag ? null : tag)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition whitespace-nowrap ${
              selectedTag === tag
                ? "bg-yellow-300 border-yellow-300 font-medium"
                : "bg-white border-gray-300 hover:border-gray-400"
            }`}
          >
            <span className="h-5 w-5 flex items-center justify-center">
              {tagData ? (
                <img
                  src={tagData.icon}
                  alt={tag}
                  className="h-4 w-4 object-contain"
                />
              ) : (
                "🍽️"
              )}
            </span>
            {tag}
          </button>
        );
      })}
    </div>
  );
}