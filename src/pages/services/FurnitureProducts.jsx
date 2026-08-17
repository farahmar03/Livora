import React, { useState } from "react";
import { SlidersHorizontal, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/common/ProductCard";

// استيراد صور المنتجات العادية
import chairImg1 from "@/assets/chair1.png";
import chairImg2 from "@/assets/chair2.png";
import sofaImg from "@/assets/sofa.png";

// استيراد صور الكرسي العينة (تتغير حسَب اللون)
import tealChairImg from "@/assets/chair2.png";
import grayChairImg from "@/assets/gray-chair1.png";
import orangeChairImg from "@/assets/orang-chair2.png";

const productsData = [
  // 1. المنتج العينة
  {
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
  },

  // 2. كراسي إضافية (Chairs)
  {
    id: "chair-2",
    originalId: "chair-2",
    name: "Modern Accent Chair",
    title: "Modern Accent Chair",
    subtitle: "Velvet / Metal Frame",
    material: "Velvet / Metal Frame",
    price: 850,
    rating: 4.7,
    category: "Chairs",
    condition: "Good Condition",
    usedDuration: "Used 6 Months",
    image: chairImg1,
    colors: [
      { name: "Teal", hex: "#6B8E93", image: chairImg1 },
      { name: "Brown", hex: "#8B5E3C", image: chairImg1 },
      { name: "Dark Teal", hex: "#2C5E62", image: chairImg1 },
    ],
  },
  {
    id: "chair-3",
    originalId: "chair-3",
    name: "Minimalist Dining Chair",
    title: "Minimalist Dining Chair",
    subtitle: "Natural Wood / Fabric",
    material: "Natural Wood / Fabric",
    price: 420,
    rating: 4.6,
    category: "Chairs",
    condition: "Fair Condition",
    usedDuration: "Used 1 Year",
    image: chairImg2,
    colors: [
      { name: "Brown", hex: "#8B5E3C", image: chairImg2 },
      { name: "Dark Teal", hex: "#2C5E62", image: chairImg2 },
    ],
  },

  // 3. أريكة / كنبات (Sofas)
  {
    id: "sofa-4",
    originalId: "sofa-4",
    name: "Luxury Velvet Sofa",
    title: "Luxury Velvet Sofa",
    subtitle: "Dark Teal / Wooden Legs",
    material: "Dark Teal / Wooden Legs",
    price: 2400,
    oldPrice: 2800,
    discount: "14% OFF",
    rating: 4.8,
    category: "Sofas",
    condition: "Excellent Condition",
    usedDuration: "Used 2 Months",
    image: sofaImg,
    colors: [
      { name: "Teal", hex: "#1B6D77", image: sofaImg },
      { name: "Dark Teal", hex: "#2C5E62", image: sofaImg },
      { name: "Gray", hex: "#A8B2C1", image: sofaImg },
    ],
  },
  {
    id: "sofa-5",
    originalId: "sofa-5",
    name: "Modern Corner Sofa",
    title: "Modern Corner Sofa",
    subtitle: "Grey Fabric / Modular",
    material: "Grey Fabric / Modular",
    price: 1850,
    rating: 4.6,
    category: "Sofas",
    condition: "Good Condition",
    usedDuration: "Used 1 Year",
    image: sofaImg,
    colors: [
      { name: "Gray", hex: "#A8B2C1", image: sofaImg },
      { name: "Teal", hex: "#6B8E93", image: sofaImg },
    ],
  },
  {
    id: "sofa-6",
    originalId: "sofa-6",
    name: "Classic Living Sofa",
    title: "Classic Living Sofa",
    subtitle: "Beige / Cotton Blend",
    material: "Beige / Cotton Blend",
    price: 1100,
    rating: 4.4,
    category: "Sofas",
    condition: "Fair Condition",
    usedDuration: "Used 3 Years",
    image: sofaImg,
    colors: [
      { name: "Brown", hex: "#8B5E3C", image: sofaImg },
      { name: "Orange", hex: "#C77D24", image: sofaImg },
    ],
  },

  // 4. أسرة (Beds)
  {
    id: "bed-7",
    originalId: "bed-7",
    name: "King Size Wooden Bed",
    title: "King Size Wooden Bed",
    subtitle: "Solid Oak / Padded Headboard",
    material: "Solid Oak / Padded Headboard",
    price: 3100,
    rating: 4.9,
    category: "Beds",
    condition: "Excellent Condition",
    usedDuration: "Used 3 Months",
    image: chairImg2,
    colors: [
      { name: "Brown", hex: "#8B5E3C", image: chairImg2 },
      { name: "Gray", hex: "#A8B2C1", image: chairImg2 },
    ],
  },
  {
    id: "bed-8",
    originalId: "bed-8",
    name: "Modern Storage Bed",
    title: "Modern Storage Bed",
    subtitle: "Queen Size / Linen Fabric",
    material: "Queen Size / Linen Fabric",
    price: 2200,
    rating: 4.7,
    category: "Beds",
    condition: "Good Condition",
    usedDuration: "Used 8 Months",
    image: chairImg1,
    colors: [
      { name: "Dark Teal", hex: "#2C5E62", image: chairImg1 },
      { name: "Teal", hex: "#1D8B96", image: chairImg1 },
    ],
  },
  {
    id: "bed-9",
    originalId: "bed-9",
    name: "Single Minimalist BedFrame",
    title: "Single Minimalist BedFrame",
    subtitle: "Black Steel / Metal Slats",
    material: "Black Steel / Metal Slats",
    price: 750,
    rating: 4.5,
    category: "Beds",
    condition: "Fair Condition",
    usedDuration: "Used 2 Years",
    image: sofaImg,
    colors: [
      { name: "Gray", hex: "#A8B2C1", image: sofaImg },
      { name: "Brown", hex: "#8B5E3C", image: sofaImg },
    ],
  },
];

export default function FurnitureProducts() {
  const [filterBy, setFilterBy] = useState("Category");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getGroupedProducts = () => {
    if (filterBy === "Category") {
      const categories = ["Sofas", "Chairs", "Beds"];
      return categories.map((cat) => ({
        title: cat,
        items: productsData.filter((item) => item.category === cat),
      }));
    } else if (filterBy === "Condition") {
      const conditions = [
        "Excellent Condition",
        "Good Condition",
        "Fair Condition",
      ];
      return conditions.map((cond) => ({
        title: cond,
        items: productsData.filter((item) => item.condition === cond),
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
      <Navbar />

      <main className="max-w-[1250px] mx-auto w-full px-6 pt-8 flex-1">
        <div className="flex items-center justify-between mb-8 relative">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1B6D77] mb-1">
              Shop Used Furniture
            </h1>
            <p className="text-gray-600 text-sm font-medium">
              Browse quality pre-owned furniture for your home.
            </p>
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md ${
              isFilterOpen
                ? "bg-[#1B6D77] text-white"
                : "bg-transparent text-[#1B6D77] hover:bg-[#1B6D77] hover:text-white"
            }`}
            title="Filter options"
          >
            <SlidersHorizontal size={20} />
          </button>

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
                        ? "bg-white text-[#1B6D77] shadow-sm font-bold"
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

        <div className="space-y-12">
          {groupedData.map((group, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {group.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
                {group.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
