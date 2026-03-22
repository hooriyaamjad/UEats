import { useState } from "react";
import Navbar from "../components/Navbar";
import TagFilter from "../components/TagFilter";
import RestaurantCard from "../components/RestaurantCard";
import Carousel from "../components/Carousel";

const TAGS = ["Halal", "Vegetarian", "Coffee"];

// MOCK DATA mirroring the seeded DB ;; replace with API calls when backend is ready!
// Tags and images are frontend-only for now.
const ALL_RESTAURANTS = [
  {
    id: 1,
    name: "A&W",
    image: "https://placehold.co/300x200/f77f00/fff?text=A%26W",
    rating: 4.0,
    tags: ["Burgers", "Fries", "Comfort"],
    isFavourite: false,
  },
  {
    id: 2,
    name: "Bake Chef Co.",
    image: "https://placehold.co/300x200/e8d5b7/555?text=Bake+Chef",
    rating: 4.5,
    tags: ["Asian", "Subs", "Rice"],
    isFavourite: false,
  },
  {
    id: 3,
    name: "Canadian Pizza Unlimited",
    image: "https://placehold.co/300x200/c8102e/fff?text=CPU+Pizza",
    rating: 3.8,
    tags: ["Pizza", "Comfort"],
    isFavourite: false,
  },
  {
    id: 4,
    name: "Carl's Jr.",
    image: "https://placehold.co/300x200/ffd43b/333?text=Carl%27s+Jr.",
    rating: 4.0,
    tags: ["Burgers", "Fries", "Comfort"],
    isFavourite: false,
  },
  {
    id: 5,
    name: "Chaiiwala of London",
    image: "https://placehold.co/300x200/4caf50/fff?text=Chaiiwala",
    rating: 4.2,
    tags: ["Halal", "Chai", "Indian"],
    isFavourite: false,
  },
  {
    id: 6,
    name: "Coffee Company",
    image: "https://placehold.co/300x200/6d4c41/fff?text=Coffee+Co.",
    rating: 3.7,
    tags: ["Coffee", "Pastries"],
    isFavourite: false,
  },
  {
    id: 7,
    name: "Dairy Queen / Orange Julius",
    image: "https://placehold.co/300x200/e65100/fff?text=DQ+%2F+OJ",
    rating: 4.0,
    tags: ["Dessert", "Burgers", "Drinks"],
    isFavourite: false,
  },
  {
    id: 8,
    name: "The Den & Black Lounge",
    image: "https://placehold.co/300x200/1a1a2e/fff?text=The+Den",
    rating: 4.0,
    tags: ["Pub", "Burgers", "Comfort"],
    isFavourite: false,
  },
  {
    id: 9,
    name: "Freshco Poke",
    image: "https://placehold.co/300x200/00acc1/fff?text=Freshco+Poke",
    rating: 4.5,
    tags: ["Poke", "Healthy", "Vegetarian"],
    isFavourite: false,
  },
  {
    id: 10,
    name: "Jugo Juice",
    image: "https://placehold.co/300x200/7c3aed/fff?text=Jugo+Juice",
    rating: 4.0,
    tags: ["Smoothies", "Healthy", "Vegetarian"],
    isFavourite: false,
  },
  {
    id: 11,
    name: "Kobe Beef",
    image: "https://placehold.co/300x200/b71c1c/fff?text=Kobe+Beef",
    rating: 4.1,
    tags: ["Japanese", "Rice", "Asian"],
    isFavourite: false,
  },
  {
    id: 12,
    name: "Korean BBQ",
    image: "https://placehold.co/300x200/1a1a1a/fff?text=Korean+BBQ",
    rating: 4.2,
    tags: ["Korean", "Asian", "BBQ"],
    isFavourite: false,
  },
  {
    id: 13,
    name: "La Fe Dim Sum",
    image: "https://placehold.co/300x200/c62828/fff?text=La+Fe",
    rating: 4.0,
    tags: ["Dim Sum", "Asian", "Dumplings"],
    isFavourite: false,
  },
  {
    id: 14,
    name: "Last Defence Lounge",
    image: "https://placehold.co/300x200/37474f/fff?text=Last+Defence",
    rating: 3.9,
    tags: ["Pub", "Comfort", "Burgers"],
    isFavourite: false,
  },
  {
    id: 15,
    name: "Mr. Pretzels",
    image: "https://placehold.co/300x200/f9a825/333?text=Mr.+Pretzels",
    rating: 4.1,
    tags: ["Snacks", "Pretzels"],
    isFavourite: false,
  },
  {
    id: 16,
    name: "Noodle and Grill Express",
    image: "https://placehold.co/300x200/558b2f/fff?text=Noodle+%26+Grill",
    rating: 4.0,
    tags: ["Asian", "Noodles", "Rice"],
    isFavourite: false,
  },
  {
    id: 17,
    name: "OPA! of Greece",
    image: "https://placehold.co/300x200/1565c0/fff?text=OPA%21",
    rating: 4.2,
    tags: ["Halal", "Mediterranean", "Wraps"],
    isFavourite: false,
  },
  {
    id: 18,
    name: "Starbucks",
    image: "https://placehold.co/300x200/00704a/fff?text=Starbucks",
    rating: 4.3,
    tags: ["Coffee", "Pastries"],
    isFavourite: false,
  },
  {
    id: 19,
    name: "Stör",
    image: "https://placehold.co/300x200/546e7a/fff?text=St%C3%B6r",
    rating: 3.8,
    tags: ["Snacks", "Convenience"],
    isFavourite: false,
  },
  {
    id: 20,
    name: "Subway",
    image: "https://placehold.co/300x200/009f6b/fff?text=Subway",
    rating: 3.9,
    tags: ["Sandwiches", "Healthy"],
    isFavourite: false,
  },
  {
    id: 21,
    name: "Tim Hortons",
    image: "https://placehold.co/300x200/c8102e/fff?text=Tim+Hortons",
    rating: 3.8,
    tags: ["Coffee", "Comfort", "Canadian"],
    isFavourite: false,
  },
  {
    id: 22,
    name: "Tim Hortons Express",
    image: "https://placehold.co/300x200/c8102e/fff?text=Tims+Express",
    rating: 3.7,
    tags: ["Coffee", "Comfort", "Canadian"],
    isFavourite: false,
  },
  {
    id: 23,
    name: "True Eats",
    image: "https://placehold.co/300x200/a5d6a7/333?text=True+Eats",
    rating: 4.3,
    tags: ["Healthy", "Vegetarian", "Bowls"],
    isFavourite: false,
  },
  {
    id: 24,
    name: "Umi Sushi",
    image: "https://placehold.co/300x200/ef9a9a/333?text=Umi+Sushi",
    rating: 4.4,
    tags: ["Sushi", "Japanese", "Asian"],
    isFavourite: false,
  },
];

export default function Home() {
  const [selectedTag, setSelectedTag] = useState(null);

  const favourites = ALL_RESTAURANTS.filter((r) => r.isFavourite);

  const forYou = selectedTag
    ? ALL_RESTAURANTS.filter((r) => r.tags.includes(selectedTag))
    : ALL_RESTAURANTS;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-10">
        {/* Explore by Tags */}
        <section>
          <h2 className="text-xl font-bold mb-3">Explore by Tags</h2>
          <TagFilter tags={TAGS} selectedTag={selectedTag} onSelect={setSelectedTag} />
        </section>

        {/* Your Favourites */}
        {favourites.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3">Your Favourites</h2>
            <Carousel>
              {favourites.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </Carousel>
          </section>
        )}

        {/* For You */}
        <section>
          <h2 className="text-xl font-bold mb-3">For You</h2>
          <Carousel>
            {forYou.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </Carousel>
        </section>
      </main>
    </div>
  );
}
