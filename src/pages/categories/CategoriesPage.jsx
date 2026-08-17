import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // في حال كنت تستخدم React Router
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/common/ProductCard";

import sofasIcon from "@/assets/sofas1.png";
import lampsIcon from "@/assets/lamps.png";
import chairsIcon from "@/assets/chairs.png";
import bedsIcon from "@/assets/beds.png";
import bathroomIcon from "@/assets/bathroom.png";
import kitchenIcon from "@/assets/kitchen.png";

// ✅ استيراد صور الكرسي الثلاثة الحقيقية
import tealChairImg from "@/assets/chair2.png";
import grayChairImg from "@/assets/gray-chair1.png";
import orangeChairImg from "@/assets/orang-chair2.png";

const categoriesList = [
  { key: "sofas", label: "Sofas", icon: sofasIcon },
  { key: "lamps", label: "Lamps", icon: lampsIcon },
  { key: "chairs", label: "Chairs", icon: chairsIcon },
  { key: "beds", label: "Beds", icon: bedsIcon },
  { key: "bathroom", label: "Bathroom", icon: bathroomIcon },
  { key: "kitchen", label: "Kitchen", icon: kitchenIcon },
];

const createDummyProduct = (id, defaultImg) => ({
  id,
  name: "Nordic OAK Chair",
  title: "Nordic OAK Chair",
  subtitle: "Emerald Green / Linen",
  price: "$1,250",
  rating: 4.9,
  image: defaultImg,
  colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
});

const sampleChairProduct = {
  id: "sample-chair-1",
  name: "Nordic OAK Chair",
  title: "Nordic OAK Chair",
  subtitle: "Emerald Green / Linen",
  price: "$1,250",
  rating: 4.9,
  discount: true,
  colors: [
    { name: "Teal", hex: "#1D8B96", image: tealChairImg },
    { name: "Gray", hex: "#A8B2C1", image: grayChairImg },
    { name: "Orange", hex: "#C77D24", image: orangeChairImg },
  ],
};

const fullProductsData = {
  sofas: Array(9)
    .fill(null)
    .map((_, i) =>
      createDummyProduct(
        `sofa-${i}`,
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      ),
    ),
  lamps: Array(9)
    .fill(null)
    .map((_, i) =>
      createDummyProduct(
        `lamp-${i}`,
        "https://images.unsplash.com/photo-1507473885765-e6ed0579f782c?w=600",
      ),
    ),
  chairs: [
    sampleChairProduct,
    ...Array(8)
      .fill(null)
      .map((_, i) =>
        createDummyProduct(
          `chair-${i + 1}`,
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
        ),
      ),
  ],
  beds: Array(9)
    .fill(null)
    .map((_, i) =>
      createDummyProduct(
        `bed-${i}`,
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      ),
    ),
  bathroom: Array(9)
    .fill(null)
    .map((_, i) =>
      createDummyProduct(
        `bath-${i}`,
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
      ),
    ),
  kitchen: Array(9)
    .fill(null)
    .map((_, i) =>
      createDummyProduct(
        `kitchen-${i}`,
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
      ),
    ),
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
  const location = useLocation();

  // 1. تحديد الفئة الافتراضية لتكون 'sofas' (أو قراءتها من URL Query / Navigation State)
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    const stateCategory = location.state?.category;
    return categoryParam || stateCategory || "sofas";
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    if (categoryParam && fullProductsData[categoryParam]) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  const currentProducts = fullProductsData[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1200px] mx-auto w-full px-6 pt-8 flex-1">
        <h1 className="text-2xl font-bold text-[var(--color-teal)] mb-6">
          Categories
        </h1>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
