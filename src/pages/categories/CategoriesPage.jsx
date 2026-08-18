import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/common/ProductCard";
import { supabase } from "@/services/supabase";

// أيقونات الفئات
import sofasIcon from "@/assets/sofas1.png";
import lampsIcon from "@/assets/lamps.png";
import chairsIcon from "@/assets/chairs.png";
import bedsIcon from "@/assets/beds.png";
import bathroomIcon from "@/assets/bathroom.png";
import kitchenIcon from "@/assets/kitchen.png";

// صور الكراسي الموجودة سابقاً للسامبل
import tealChairImg from "@/assets/chair2.png";
import grayChairImg from "@/assets/gray-chair1.png";
import orangeChairImg from "@/assets/orang-chair2.png";

// خرائط الصور
import sofa0 from "@/assets/sofa0.jpg";
import sofa1 from "@/assets/sofa1.jpg";
import sofa2 from "@/assets/sofa2.jpg";
import sofa3 from "@/assets/sofa3.jpg";
import sofa4 from "@/assets/sofa4.jpg";
import sofa5 from "@/assets/sofa5.jpg";
import sofa6 from "@/assets/sofa6.jpg";
import sofa8 from "@/assets/sofa8.jpg";
import sofa9 from "@/assets/sofa9.jpg";

import lamp0 from "@/assets/lamp0.jpg";
import lamp1 from "@/assets/lamp1.jpg";
import lamp2 from "@/assets/lamp2.jpg";
import lamp3 from "@/assets/lamp3.jpg";
import lamp4 from "@/assets/lamp4.jpg";
import lamp5 from "@/assets/lamp5.jpg";
import lamp6 from "@/assets/lamp6.jpg";
import lamp7 from "@/assets/lamp7.jpg";
import lamp8 from "@/assets/lamp9.jpg";

import chair0 from "@/assets/chair0.jpg";
import chair1 from "@/assets/chair1.jpg";
import chair2 from "@/assets/chair2.jpg";
import chair3 from "@/assets/chair3.jpg";
import chair4 from "@/assets/chair4.jpg";
import chair5 from "@/assets/chair5.jpg";
import chair6 from "@/assets/chair6.jpg";
import chair7 from "@/assets/chair7.jpg";

import bed0 from "@/assets/bed0.jpg";
import bed1 from "@/assets/bed1.jpg";
import bed2 from "@/assets/bed2.jpg";
import bed3 from "@/assets/bed3.jpg";
import bed4 from "@/assets/bed4.jpg";
import bed5 from "@/assets/bed5.jpg";
import bed6 from "@/assets/bed6.jpg";
import bed7 from "@/assets/bed8.jpg";
import bed8 from "@/assets/bed9.jpg";

import bath0 from "@/assets/bath0.jpg";
import bath1 from "@/assets/bath1.jpg";
import bath2 from "@/assets/bath2.jpg";
import bath3 from "@/assets/bath3.jpg";
import bath4 from "@/assets/bath4.jpg";
import bath5 from "@/assets/bath5.jpg";
import bath6 from "@/assets/bath6.jpg";
import bath7 from "@/assets/bath7.jpg";
import bath8 from "@/assets/bath8.jpg";

import kit0 from "@/assets/kit0.jpg";
import kit1 from "@/assets/kit1.jpg";
import kit2 from "@/assets/kit2.jpg";
import kit3 from "@/assets/kit3.jpg";
import kit4 from "@/assets/kit4.jpg";
import kit5 from "@/assets/kit5.jpg";
import kit6 from "@/assets/kit7.jpg";
import kit7 from "@/assets/kit8.jpg";
import kit8 from "@/assets/kit9.jpg";

const localImagesMap = {
  "sofa0.jpg": sofa0, "sofa1.jpg": sofa1, "sofa2.jpg": sofa2, "sofa3.jpg": sofa3, "sofa4.jpg": sofa4, "sofa5.jpg": sofa5, "sofa6.jpg": sofa6, "sofa8.jpg": sofa8, "sofa9.jpg": sofa9,
  "lamp0.jpg": lamp0, "lamp1.jpg": lamp1, "lamp2.jpg": lamp2, "lamp3.jpg": lamp3, "lamp4.jpg": lamp4, "lamp5.jpg": lamp5, "lamp6.jpg": lamp6, "lamp7.jpg": lamp7, "lamp9.jpg": lamp8,
  "chair0.jpg": chair0, "chair1.jpg": chair1, "chair2.jpg": chair2, "chair3.jpg": chair3, "chair4.jpg": chair4, "chair5.jpg": chair5, "chair6.jpg": chair6, "chair7.jpg": chair7,
  "bed0.jpg": bed0, "bed1.jpg": bed1, "bed2.jpg": bed2, "bed3.jpg": bed3, "bed4.jpg": bed4, "bed5.jpg": bed5, "bed6.jpg": bed6, "bed8.jpg": bed7, "bed9.jpg": bed8,
  "bath0.jpg": bath0, "bath1.jpg": bath1, "bath2.jpg": bath2, "bath3.jpg": bath3, "bath4.jpg": bath4, "bath5.jpg": bath5, "bath6.jpg": bath6, "bath7.jpg": bath7, "bath8.jpg": bath8,
  "kit0.jpg": kit0, "kit1.jpg": kit1, "kit2.jpg": kit2, "kit3.jpg": kit3, "kit4.jpg": kit4, "kit5.jpg": kit5, "kit7.jpg": kit6, "kit8.jpg": kit7, "kit9.jpg": kit8,
};

const categoriesList = [
  { key: "sofas", label: "Sofas", icon: sofasIcon },
  { key: "lamps", label: "Lamps", icon: lampsIcon },
  { key: "chairs", label: "Chairs", icon: chairsIcon },
  { key: "beds", label: "Beds", icon: bedsIcon },
  { key: "bathroom", label: "Bathroom", icon: bathroomIcon },
  { key: "kitchen", label: "Kitchen", icon: kitchenIcon },
];

const sampleChairProduct = {
  id: "sample-chair-1",
  originalId: "sample-chair-1",
  name: "Nordic OAK Chair",
  title: "Nordic OAK Chair",
  subtitle: "Emerald Green / Linen",
  material: "Emerald Green / Linen",
  price: 1250,
  oldPrice: 1500,
  discount: "16% OFF",
  rating: 4.9,
  category: "Chairs",
  condition: "Excellent Condition",
  usedDuration: "Used 1 Month",
  image: tealChairImg,
  colors: [
    { name: "Teal", hex: "#1D8B96", image: tealChairImg },
    { name: "Gray", hex: "#A8B2C1", image: grayChairImg },
    { name: "Orange", hex: "#C77D24", image: orangeChairImg },
  ],
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

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    const stateCategory = location.state?.category;
    return categoryParam || stateCategory || "sofas";
  });

  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    if (categoryParam && categoriesList.some(c => c.key === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  useEffect(() => {
    async function fetchCategoryProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("service_type", selectedCategory);

        if (error) {
          console.error("Error fetching category products:", error.message);
        } else if (data) {
          // استبعاد المنتجات الخاصة بالمتجر الضيق إذا أردتِ، أو جلبها مباشرةً بناءً على مطابقتها لـ localImagesMap
          const formattedProducts = data
            .filter(item => localImagesMap[item.image_url])
            .map((item) => {
              const mappedImg = localImagesMap[item.image_url] || tealChairImg;
              return {
                id: item.id,
                originalId: item.id,
                name: item.title,
                title: item.title,
                subtitle: item.description,
                material: item.description,
                price: item.price,
                rating: 4.9,
                image: mappedImg,
                colors: [{ name: "Default", hex: "#1D8B96", image: mappedImg }],
              };
            });

          if (selectedCategory === "chairs") {
            setProductsData((prev) => ({
              ...prev,
              [selectedCategory]: [sampleChairProduct, ...formattedProducts],
            }));
          } else {
            setProductsData((prev) => ({
              ...prev,
              [selectedCategory]: formattedProducts,
            }));
          }
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryProducts();
  }, [selectedCategory]);

  const currentProducts = productsData[selectedCategory] || (selectedCategory === "chairs" ? [sampleChairProduct] : []);

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

        {loading ? (
          <div className="text-center py-12 text-gray-500 font-medium">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}