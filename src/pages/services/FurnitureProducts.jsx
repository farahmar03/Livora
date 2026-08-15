import React, { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// استيراد صور المنتجات
import chairImg1 from "@/assets/chair1.png";
import chairImg2 from "@/assets/chair2.png";
import sofaImg from "@/assets/sofa.png";

// بيانات المنتجات العينة
const productsData = [
  {
    id: 1,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: 1250,
    rating: 4.9,
    category: "Sofas",
    condition: "Excellent Condition",
    usedDuration: "Used 1 Month",
    image: chairImg1,
    colors: ["#8B5E3C", "#6B8E93", "#2C5E62"],
  },
  {
    id: 2,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: 1250,
    rating: 4.9,
    category: "Sofas",
    condition: "Good Condition",
    usedDuration: "Used 15 Days",
    image: chairImg2,
    colors: ["#8B5E3C", "#6B8E93", "#2C5E62"],
  },
  {
    id: 3,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: 1250,
    rating: 4.9,
    category: "Sofas",
    condition: "Fair Condition",
    usedDuration: "Used 2 Years",
    image: sofaImg,
    colors: ["#8B5E3C", "#6B8E93", "#2C5E62"],
  },
  {
    id: 4,
    name: "Nordic OAK Chair",
    material: "Emerald Green / Linen",
    price: 1250,
    rating: 4.9,
    category: "Chairs",
    condition: "Excellent Condition",
    usedDuration: "Used 2 Years",
    image: chairImg1,
    colors: ["#8B5E3C", "#6B8E93", "#2C5E62"],
  },
];

export default function FurnitureProducts() {
  const [filterBy, setFilterBy] = useState("Category");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const getGroupedProducts = () => {
    if (filterBy === "Category") {
      const categories = ["Sofas", "Chairs", "Beds"];
      return categories.map((cat) => ({
        title: cat,
        items: productsData,
      }));
    } else if (filterBy === "Condition") {
      const conditions = [
        "Excellent Condition",
        "Good Condition",
        "Fair Condition",
      ];
      return conditions.map((cond) => ({
        title: cond,
        items: productsData,
      }));
    } else {
      return [
        {
          title: "All Products (Sorted by Price)",
          items: [...productsData].sort((a, b) => a.price - b.price),
        },
      ];
    }
  };

  const groupedData = getGroupedProducts();

  return (
    <div className="bg-[#F8F6F0] min-h-screen flex flex-col pb-16">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-[1250px] mx-auto w-full px-6 pt-8 flex-1">
        {/* Header & Filter Button */}
        <div className="flex items-center justify-between mb-8 relative">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1B6D77] mb-1">
              Shop Used Furniture
            </h1>
            <p className="text-gray-600 text-sm font-medium">
              Browse quality pre-owned furniture for your home.
            </p>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2.5 bg-[#1B6D77] text-white rounded-xl hover:bg-[#15555d] transition-all flex items-center justify-center cursor-pointer shadow-md"
            title="Filter options"
          >
            <SlidersHorizontal size={20} />
          </button>

          {/* Filter Menu Popup */}
          {isFilterOpen && (
            <div className="absolute right-0 top-14 z-50 w-64 bg-[#F5ECE0] border border-[#E3D4C1] rounded-2xl p-4 shadow-xl">
              <h3 className="font-bold text-black text-base mb-3">
                Filter according to:
              </h3>

              <div className="space-y-2">
                {["Category", "Condition", "Price"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterBy(type);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium transition-all text-sm cursor-pointer ${
                      filterBy === type
                        ? "bg-white text-[#1B6D77] shadow-xs font-bold"
                        : "bg-white/80 text-gray-700 hover:bg-white"
                    }`}
                  >
                    <span>{type}</span>
                    {filterBy === type && (
                      <CheckCircle2
                        size={18}
                        className="text-[#1B6D77] fill-[#1B6D77] text-white"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Display Sections */}
        <div className="space-y-12">
          {groupedData.map((group, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {group.title}
              </h2>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
                {group.items.slice(0, 3).map((product, idx) => (
                  <div
                    key={`${product.id}-${idx}`}
                    className="flex flex-col items-center"
                  >
                    {/* Card Container */}
                    <div className="bg-white rounded-[28px] overflow-hidden shadow-md border border-gray-100 w-full relative group">
                      {/* Image Box */}
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Rating Badge */}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-xs">
                          <Star
                            size={14}
                            className="fill-amber-400 text-amber-400"
                          />
                          <span>{product.rating}</span>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-xs cursor-pointer"
                        >
                          <Heart
                            size={18}
                            className={
                              favorites.includes(product.id)
                                ? "fill-red-500 text-red-500"
                                : ""
                            }
                          />
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          {product.material}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price.toLocaleString()}
                          </span>

                          <button
                            type="button"
                            className="text-[#1B6D77] hover:text-[#135158] transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                          >
                            <ShoppingCart size={22} />
                          </button>
                        </div>

                        {/* Color Options */}
                        <div className="flex items-center gap-2 mt-3">
                          {product.colors.map((color, cIdx) => (
                            <span
                              key={cIdx}
                              className="w-4 h-4 rounded-full border border-gray-300 inline-block shadow-xs"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}