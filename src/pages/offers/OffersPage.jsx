import React, { useState } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// استيراد صور المنتجات (تم ضبط المسارات)
import offer1 from "@/assets/chair1.png";
import offer2 from "@/assets/chair1.png";
import offer3 from "@/assets/chair1.png";
import offer4 from "@/assets/chair1.png";
import offer5 from "@/assets/chair1.png";
import offer6 from "@/assets/chair1.png";

const allOffersData = [
  {
    id: 1,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer1,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
  {
    id: 2,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer2,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
  {
    id: 3,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer3,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
  {
    id: 4,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer4,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
  {
    id: 5,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer5,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
  {
    id: 6,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer6,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
  {
    id: 7,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer5,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
  {
    id: 8,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer4,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
  {
    id: 9,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: "$1,250",
    rating: 4.9,
    image: offer2,
    colors: ["#8B5E3C", "#7A9A95", "#1B6D77"],
  },
];

export default function OffersPage() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[var(--color-page)] min-h-screen flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1200px] mx-auto w-full px-6 pt-10 flex-1">
        {/* Title */}
        <h1 className="text-2xl font-bold text-[var(--color-teal)] mb-8">
          All Products Offers
        </h1>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allOffersData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between"
            >
              {/* Product Image Box */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-xs">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>

                {/* Favorite Button */}
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
                <div className="absolute bottom-2 right-0 bg-[#E52E2E] text-white text-[11px] font-bold px-3 py-1 rounded-l-md shadow-md">
                  Discount 10%
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-0.5">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{item.material}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-gray-900">
                    {item.price}
                  </span>

                  <button className="text-[var(--color-teal)] hover:text-[#135158] transition-colors p-1.5 rounded-full hover:bg-gray-100 cursor-pointer">
                    <ShoppingCart size={20} />
                  </button>
                </div>

                {/* Color Palette Dots */}
                <div className="flex items-center gap-1.5 mt-3">
                  {item.colors.map((color, idx) => (
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