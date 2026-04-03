import { X } from "lucide-react";

const PROFILE_IMAGES = [
  {
    id: 1,
    name: "Breakfast",
    url: "https://img.freepik.com/free-vector/hand-drawn-kawaii-food-collection_23-2149412059.jpg",
  },
  {
    id: 2,
    name: "Avocado",
    url: "https://i.redd.it/l38dzm0mctj61.jpg",
  },
  {
    id: 3,
    name: "Taco",
    url: "https://static.vecteezy.com/system/resources/previews/014/384/865/non_2x/cute-taco-holding-lemon-and-sauce-cartoon-icon-illustration-fast-food-cartoon-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg",
  },
  {
    id: 4,
    name: "Burger",
    url: "https://media.tenor.com/wjD4X3OIDbsAAAAe/cute-food-cute.png",
  },
  {
    id: 5,
    name: "Ice Cream",
    url: "https://img.freepik.com/premium-vector/cute-ice-cream-vector_611616-36.jpg",
  },
  {
    id: 6,
    name: "Fried Rice",
    url: "https://img.freepik.com/free-vector/cute-fried-rice-with-egg-peas-cartoon-vector-icon-illustration-food-object-icon-isolated-flat_138676-13981.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 7,
    name: "Lettuce",
    url: "https://static.vecteezy.com/system/resources/previews/026/695/925/non_2x/cartoon-vegetable-character-sticker-funny-emoticon-in-flat-style-food-emoji-funny-vegetable-characters-isolated-on-white-background-cute-and-funny-fruit-set-illustration-vector.jpg",
  },
  {
    id: 8,
    name: "Pizza",
    url: "https://img.freepik.com/free-vector/cute-pizza-eating-slice-pizza-cartoon-vector-icon-illustration-fast-food-icon-isolated-flat-vector_138676-15221.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 9,
    name: "Cake",
    url: "https://img.freepik.com/premium-vector/cute-kawaii-birthday-cake-with-candles-confetti_986045-275.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 10,
    name: "Donut",
    url: "https://img.freepik.com/premium-vector/kawaii-cute-donut-illustration_136610-672.jpg",
  },
  {
    id: 11,
    name: "Sushi",
    url: "https://img.freepik.com/free-vector/cute-sushi-salmon-floating-cartoon-vector-icon-illustration-food-object-icon-isolated-flat-vector_138676-13343.jpg",
  },
  {
    id: 12,
    name: "Pasta",
    url: "https://img.freepik.com/free-vector/hand-drawn-pasta-cartoon-illustration_52683-128268.jpg?w=360",
  },
  {
    id: 13,
    name: "Fries",
    url: "https://img.freepik.com/free-vector/cute-french-fries-holding-ketcup-sauce-cartoon-vector-icon-illustration-food-holiday-icon-isolated_138676-8076.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 14,
    name: "Soup",
    url: "https://img.freepik.com/free-vector/cute-cream-soup-cartoon-vector-icon-illustration-food-object-icon-isolated-flat-vector_138676-11934.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 15,
    name: "Waffle",
    url: "https://img.freepik.com/premium-vector/cute-happy-funny-belgian-waffle-with-chocolate-cartoon-character-illustration-icon-design-isolated_92289-1082.jpg",
  },
  {
    id: 16,
    name: "Croissant",
    url: "https://img.freepik.com/premium-vector/cute-croissant-cartoon-illustration-vector_53876-1212243.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 17,
    name: "Green Bean",
    url: "https://img.freepik.com/premium-vector/cute-smiling-green-bean-character_1358348-22204.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 18,
    name: "Coffee",
    url: "https://img.freepik.com/free-vector/cute-happy-coffee-cup-cartoon-vector-icon-illustration-drink-character-icon-concept-flat-cartoon-style_138676-2587.jpg",
  },
  {
    id: 19,
    name: "Egg",
    url: "https://img.freepik.com/premium-vector/cute-cracked-egg-character-with-simple-facial-expression-soft-pink-cheeks-vector-illustration_854757-27005.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 20,
    name: "Milk",
    url: "https://img.freepik.com/free-vector/cute-milk-box-cartoon-vector-icon-illustration-drink-food-icon-isolated-flat-vector_138676-14727.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 21,
    name: "Banana",
    url: "https://img.freepik.com/premium-vector/cute-banana-kawaii-character_78370-13.jpg",
  },
  {
    id: 22,
    name: "Honey",
    url: "https://img.freepik.com/premium-vector/cute-honey-bee-hug-honeycomb-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_1249867-173.jpg",
  },
  {
    id: 23,
    name: "Cheese",
    url: "https://img.freepik.com/premium-vector/cute-funny-cheese-character_464314-1131.jpg",
  },
  {
    id: 24,
    name: "Apple",
    url: "https://static.vecteezy.com/system/resources/previews/003/789/197/non_2x/cute-apple-character-illustration-vector.jpg",
  },
  {
    id: 25,
    name: "Sandwich",
    url: "https://img.freepik.com/premium-vector/hand-drawn-cute-kawaii-sandwich-burger-vector-illustration_1182378-480.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 26,
    name: "Salad",
    url: "https://img.freepik.com/premium-photo/cute-salad-bowl-cartoon_53876-374045.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 27,
    name: "Nachos",
    url: "https://img.freepik.com/free-vector/cute-nachos-wearing-hat-holding-chili-sauce-cartoon-vector-icon-illustration-food-holiday-icon_138676-8506.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 28,
    name: "Hotdog",
    url: "https://img.freepik.com/premium-vector/cute-hotdog-cartoon-icon-illustration-fastfood-object-icon-concept_71208-1089.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 29,
    name: "Candy",
    url: "https://img.freepik.com/premium-vector/its-cute-candy-illustration-candy-mascot-cartoon-character-candy-concept-isolated_768745-810.jpg",
  },
  {
    id: 30,
    name: "Burrito",
    url: "https://img.freepik.com/premium-vector/cute-burrito-mexican-food-illustration_9620-204.jpg",
  },
];

export default function ProfilePicSelector({
  isOpen,
  onClose,
  onSelect,
  selectedAvatar,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-md rounded-3xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 justify-center align-center flex w-full">
            Select a Picture
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 ml-[3px] mt-2">
            {PROFILE_IMAGES.map((img) => {
              const isSelected = selectedAvatar === img.url;

              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => onSelect(img.url)}
                  className={`p-1 transition ${
                    isSelected
                      ? "border-2 border-red-500 scale-105 w-22 h-22"
                      : "hover:scale-105"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}