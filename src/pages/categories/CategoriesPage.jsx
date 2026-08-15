import React, { useState } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

import sofasIcon from "@/assets/sofas1.png";
import lampsIcon from "@/assets/lamps.png";
import chairsIcon from "@/assets/chairs.png";
import bedsIcon from "@/assets/beds.png";
import bathroomIcon from "@/assets/bathroom.png";
import kitchenIcon from "@/assets/kitchen.png";

const categoriesList = [
  { key: "sofas", label: "Sofas", icon: sofasIcon },
  { key: "lamps", label: "Lamps", icon: lampsIcon },
  { key: "chairs", label: "Chairs", icon: chairsIcon },
  { key: "beds", label: "Beds", icon: bedsIcon },
  { key: "bathroom", label: "Bathroom", icon: bathroomIcon },
  { key: "kitchen", label: "Kitchen", icon: kitchenIcon },
];

const fullProductsData = {
  sofas: Array(9)
    .fill(null)
    .map((_, i) => ({
      id: `sofa-${i}`,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      discount: i === 1 || i === 6,
      image: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600",
      ][i % 3],
    })),
  lamps: Array(9)
    .fill(null)
    .map((_, i) => ({
      id: `lamp-${i}`,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      discount: i === 2,
      image: [
        "https://images.unsplash.com/photo-1507473885765-e6ed0579f782c?w=600",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600",
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600",
      ][i % 3],
    })),
  chairs: Array(9)
    .fill(null)
    .map((_, i) => ({
      id: `chair-${i}`,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      discount: i === 0 || i === 4,
      image: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
        "https://images.unsplash.com/photo-1580481072645-022f9a6d8310?w=600",
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=600",
      ][i % 3],
    })),
  beds: Array(9)
    .fill(null)
    .map((_, i) => ({
      id: `bed-${i}`,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      discount: i === 3,
      image: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600",
      ][i % 3],
    })),
  bathroom: Array(9)
    .fill(null)
    .map((_, i) => ({
      id: `bath-${i}`,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      discount: i === 5,
      image: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600",
      ][i % 3],
    })),
  kitchen: Array(9)
    .fill(null)
    .map((_, i) => ({
      id: `kitchen-${i}`,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      discount: i === 1,
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600",
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600",
      ][i % 3],
    })),
};

function CategoryIcon({ src, active }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: 42,
        height: 42,
        backgroundColor: active ? "var(--color-orange)" : "var(--color-teal)",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        transition: "background-color 150ms ease",
      }}
    />
  );
}

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("sofas");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const currentProducts = fullProductsData[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1200px] mx-auto w-full px-6 pt-8 flex-1">
        <h1 className="text-2xl font-bold text-[var(--color-teal)] mb-6">
          Categories
        </h1>

        {/* Categories Bar */}
        <div className="flex items-center gap-5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categoriesList.map(({ key, label, icon }) => {
            const isActive = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className="flex flex-col items-center gap-2 min-w-[84px] cursor-pointer group"
              >
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-[var(--color-teal)] shadow-sm"
                      : "bg-[#E5DFD3] hover:bg-[#ded7c8]"
                  }`}
                >
                  <CategoryIcon src={icon} active={isActive} />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isActive ? "text-[var(--color-orange)]" : "text-gray-800"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3x3 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[26px] overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Rating */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-xs">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-xs cursor-pointer"
                >
                  <Heart
                    size={16}
                    className={
                      favorites.includes(item.id)
                        ? "fill-red-500 text-red-500"
                        : "text-[var(--color-teal)]"
                    }
                  />
                </button>

                {/* Discount Badge */}
                {item.discount && (
                  <div className="absolute bottom-2 right-0 bg-[#E52E2E] text-white text-[11px] font-bold px-3 py-1 rounded-l-md shadow-md">
                    Discount 10%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{item.subtitle}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-gray-900">
                    {item.price}
                  </span>

                  <button className="text-[var(--color-teal)] hover:text-[#135158] transition-colors p-1.5 rounded-full hover:bg-gray-100 cursor-pointer">
                    <ShoppingCart size={20} />
                  </button>
                </div>

                {/* Color Dots */}
                <div className="flex items-center gap-1.5 mt-3">
                  {["#7A562C", "#A0A4AC", "#1B6D77"].map((color, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full inline-block shadow-2xs"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}