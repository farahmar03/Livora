import React, { useState } from "react";
import { Star, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext"; // ✅ استيراد CartContext

// استيراد صور المنتجات
import offer1 from "@/assets/1..png";
import offer2 from "@/assets/2.png";
import offer3 from "@/assets/1.png";
import offer4 from "@/assets/4.png";
import offer5 from "@/assets/5.png";
import offer6 from "@/assets/6.png";

function FontAwesomeCartIcon({
  className = "w-7 h-7 text-[var(--color-teal)]",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      fill="currentColor"
      className={className}
    >
      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c11.4 0 21.4 7.9 24 19.1l8.5 36.9H519.3c18.1 0 30.2 18.2 24.1 35.3l-56 156.8c-4.2 11.7-15.3 19.5-27.7 19.5H153.2l7.7 33.6H480c13.3 0 24 10.7 24 24s-10.7 24-24 24H136c-11.4 0-21.4-7.9-24-19.1L45.4 34.3H24C10.7 0 0 10.7 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm288 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
    </svg>
  );
}

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
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart(); // ✅ تفعيل دالة الإضافة للسلة
  const [selectedColorIndex, setSelectedColorIndex] = useState({});

  const handleColorSelect = (productId, colorIdx) => {
    setSelectedColorIndex((prev) => ({
      ...prev,
      [productId]: colorIdx,
    }));
  };

  // ✅ دالة الإضافة إلى السلة عند الضغط
  const handleAddToCart = (item, selectedColorHex) => {
    addToCart({
      ...item,
      id: `${item.id}-${selectedColorHex || "default"}`,
      originalId: item.id,
      selectedColor: selectedColorHex,
    });
  };

  return (
    <div className="bg-[var(--color-page)] min-h-screen flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1200px] mx-auto w-full px-6 pt-10 flex-1">
        <h1 className="text-2xl font-bold text-[var(--color-teal)] mb-8">
          All Products Offers
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allOffersData.map((item) => {
            const activeColorIdx = selectedColorIndex[item.id] || 0;
            const selectedColorHex = item.colors[activeColorIdx];

            return (
              <div
                key={item.id}
                className="bg-white rounded-[26px] overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-xs">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-xs cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
                        isFavorite(item.id)
                          ? "fill-red-500 text-red-500"
                          : "text-[var(--color-teal)]"
                      }
                    />
                  </button>

                  <div className="absolute bottom-2 right-0 bg-[#E52E2E] text-white text-[11px] font-bold px-3 py-1 rounded-l-md shadow-md">
                    Discount 10%
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{item.material}</p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      {item.price}
                    </span>

                    {/* ✅ إسناد onClick لزر السلة لتنفذ الإضافة مباشرة */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item, selectedColorHex)}
                      className="text-[var(--color-teal)] hover:text-[#135158] transition-colors p-1 cursor-pointer"
                    >
                      <FontAwesomeCartIcon className="w-7 h-7 text-[var(--color-teal)] hover:text-[#135158]" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {item.colors.map((color, idx) => {
                      const isSelected = activeColorIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleColorSelect(item.id, idx)}
                          className={`w-4 h-4 rounded-full cursor-pointer transition-transform duration-150 ${
                            isSelected
                              ? "ring-2 ring-offset-1 ring-[var(--color-teal)] scale-110"
                              : "hover:scale-105"
                          }`}
                          style={{ backgroundColor: color }}
                          title={`Select color ${idx + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
