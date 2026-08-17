import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

import sofasIcon from "@/assets/sofas1.png";
import lampsIcon from "@/assets/lamps.png";
import chairsIcon from "@/assets/chairs.png";
import bedsIcon from "@/assets/beds.png";
import bathroomIcon from "@/assets/bathroom.png";
import kitchenIcon from "@/assets/kitchen.png";

// استيراد صور المنتج السامبل الرئيسي
import teal1 from "@/assets/chair2.png";
import gray1 from "@/assets/gray-chair1.png";
import orange1 from "@/assets/orang-chair2.png";

// استخدام ProductCard المستورد من مشروعك لضمان مطابقة التصميم
import ProductCard from "@/components/common/ProductCard";

const categories = [
  {
    key: "sofas",
    label: "Sofas",
    icon: sofasIcon,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop",
  },
  {
    key: "lamps",
    label: "Lamps",
    icon: lampsIcon,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed0579adf8?w=600&h=450&fit=crop",
  },
  {
    key: "chairs",
    label: "Chairs",
    icon: chairsIcon,
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=450&fit=crop",
  },
  {
    key: "beds",
    label: "Beds",
    icon: bedsIcon,
    img: "https://images.unsplash.com/photo-1505693416388-b5d4f03e03e6?w=600&h=450&fit=crop",
  },
  {
    key: "bathroom",
    label: "Bathroom",
    icon: bathroomIcon,
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=450&fit=crop",
  },
  {
    key: "kitchen",
    label: "Kitchen",
    icon: kitchenIcon,
    img: "https://images.unsplash.com/photo-1556911220-e7189d5bcd24?w=600&h=450&fit=crop",
  },
];

// --- تعريف منتج السامبل الملون في فئة الكراسي ---
const sampleChairProduct = {
  id: "sample-chair-1",
  categoryKey: "chairs",
  name: "Nordic OAK Chair",
  title: "Nordic OAK Chair",
  subtitle: "Emerald Green / Linen",
  price: "$1,250",
  rating: 4.9,
  discount: true,
  isSample: true,
  colors: [
    { name: "Teal", hex: "#1D8B96", image: teal1 },
    { name: "Gray", hex: "#A8B2C1", image: gray1 },
    { name: "Orange", hex: "#C77D24", image: orange1 },
  ],
};

// --- قاعدة بيانات المنتجات (3 منتجات لكل فئة) ---
const productsByCategory = {
  sofas: [
    {
      id: "sofa-1",
      categoryKey: "sofas",
      name: "Serene Arc Sofa",
      title: "Serene Arc Sofa",
      subtitle: "Emerald Green / Linen",
      price: "$820",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "sofa-2",
      categoryKey: "sofas",
      name: "Modern Velvet Couch",
      title: "Modern Velvet Couch",
      subtitle: "Royal Blue / Velvet",
      price: "$1,150",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1550581190-9c1c08221252?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "sofa-3",
      categoryKey: "sofas",
      name: "Minimalist Fabric Sofa",
      title: "Minimalist Fabric Sofa",
      subtitle: "Warm Beige / Cotton",
      price: "$950",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
  ],
  lamps: [
    {
      id: "lamp-1",
      categoryKey: "lamps",
      name: "Nordic Desk Lamp",
      title: "Nordic Desk Lamp",
      subtitle: "Matte Black / Wood",
      price: "$180",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed0579adf8?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "lamp-2",
      categoryKey: "lamps",
      name: "Standing Arc Lamp",
      title: "Standing Arc Lamp",
      subtitle: "Brushed Brass / Metal",
      price: "$290",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "lamp-3",
      categoryKey: "lamps",
      name: "Pendant Ceiling Light",
      title: "Pendant Ceiling Light",
      subtitle: "Smoked Glass / Steel",
      price: "$210",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
  ],
  chairs: [
    sampleChairProduct, // المنتج السامبل يظهر هنا ضمن فئة الكراسي
    {
      id: "chair-2",
      categoryKey: "chairs",
      name: "Ergonomic Lounge Chair",
      title: "Ergonomic Lounge Chair",
      subtitle: "Charcoal Leather",
      price: "$680",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "chair-3",
      categoryKey: "chairs",
      name: "Minimalist Dining Chair",
      title: "Minimalist Dining Chair",
      subtitle: "Walnut / Cushion",
      price: "$320",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
  ],
  beds: [
    {
      id: "bed-1",
      categoryKey: "beds",
      name: "King Upholstered Bed",
      title: "King Upholstered Bed",
      subtitle: "Slate Gray / Oak",
      price: "$1,450",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1505693416388-b5d4f03e03e6?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "bed-2",
      categoryKey: "beds",
      name: "Wooden Platform Bed",
      title: "Wooden Platform Bed",
      subtitle: "Solid Walnut Frame",
      price: "$1,200",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1540518614846-7ede433c5163?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "bed-3",
      categoryKey: "beds",
      name: "Cozy Tufted Bed",
      title: "Cozy Tufted Bed",
      subtitle: "Cream Fabric Frame",
      price: "$1,350",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
  ],
  bathroom: [
    {
      id: "bath-1",
      categoryKey: "bathroom",
      name: "Modern Bathroom Vanity",
      title: "Modern Bathroom Vanity",
      subtitle: "Marble Top / Oak",
      price: "$890",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "bath-2",
      categoryKey: "bathroom",
      name: "Freestanding Soaking Tub",
      title: "Freestanding Soaking Tub",
      subtitle: "White Acrylic Finish",
      price: "$1,600",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "bath-3",
      categoryKey: "bathroom",
      name: "LED Smart Mirror",
      title: "LED Smart Mirror",
      subtitle: "Anti-Fog / Dimmable",
      price: "$240",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
  ],
  kitchen: [
    {
      id: "kitchen-1",
      categoryKey: "kitchen",
      name: "Marble Kitchen Island",
      title: "Marble Kitchen Island",
      subtitle: "White Marble / Brass",
      price: "$1,850",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1556911220-e7189d5bcd24?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "kitchen-2",
      categoryKey: "kitchen",
      name: "Minimalist Bar Stool",
      title: "Minimalist Bar Stool",
      subtitle: "Black Metal / Leather",
      price: "$190",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
    {
      id: "kitchen-3",
      categoryKey: "kitchen",
      name: "Wooden Dining Buffet",
      title: "Wooden Dining Buffet",
      subtitle: "Solid Oak Cabinet",
      price: "$980",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600",
      colors: [{ hex: "#1D8B96" }, { hex: "#A8B2C1" }, { hex: "#C77D24" }],
    },
  ],
};

function CategoryIcon({ src, active, size = 42 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
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

export default function CategoriesSection({ onNavigate }) {
  // الفئة النشطة الحالية
  const [activeTab, setActiveTab] = useState("sofas");
  const activeCategoryData = categories.find((cat) => cat.key === activeTab);

  // جلب 3 منتجات خاصة بالفئة النشطة المحددة
  const displayedProducts =
    productsByCategory[activeTab] || productsByCategory.sofas;

  const handleGoToCategoriesPage = (categoryKey) => {
    if (onNavigate) {
      onNavigate(`/categories?category=${categoryKey}`);
    }
  };

  return (
    <section
      id="CategoriesSection"
      className="w-full bg-[var(--color-page)] py-10 sm:py-12 md:py-16 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-center sm:justify-end mb-4">
          <h2 className="text-[var(--color-teal)] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Categories
          </h2>
        </div>

        {/* Mobile / tablet layout */}
        <div className="lg:hidden">
          <div className="rounded-3xl overflow-hidden border-2 border-[var(--color-teal)]">
            <div className="aspect-[4/3] sm:aspect-[16/9]">
              <img
                key={activeTab}
                src={activeCategoryData.img}
                alt={activeCategoryData.label}
                data-aos="zoom-in"
                data-aos-duration="500"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-4 w-max sm:w-full sm:grid sm:grid-cols-6 sm:gap-3">
              {categories.map(({ key, label, icon }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className="flex flex-col items-center gap-2 group focus:outline-none shrink-0 w-20 sm:w-auto transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: isActive
                          ? "var(--color-teal)"
                          : "#E7E2D4",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      <CategoryIcon src={icon} active={isActive} size={40} />
                    </div>
                    <span
                      className="text-sm sm:text-base font-medium text-center transition-colors duration-200"
                      style={{
                        color: isActive ? "var(--color-orange)" : "#2C2C2A",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div
          className="hidden lg:block relative w-full"
          style={{ aspectRatio: "1159 / 676" }}
        >
          <div
            className="absolute box-border bg-[var(--color-page)] border-2 border-[var(--color-teal)] rounded-[15px]"
            style={{
              left: "18.06%",
              right: "0%",
              top: "0%",
              bottom: "12.86%",
            }}
          />

          <div
            className="absolute flex items-center justify-center"
            style={{ left: "60.48%", right: "0%", top: "0%", bottom: "12.86%" }}
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {categories.map(({ key, label, icon }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className="flex flex-col items-center gap-2 group focus:outline-none transition-transform duration-300 hover:scale-105"
                  >
                    <div
                      className="w-24 h-24 xl:w-28 xl:h-28 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: isActive
                          ? "var(--color-teal)"
                          : "#E7E2D4",
                        boxShadow: isActive
                          ? "0 8px 20px rgba(27, 109, 119, 0.25)"
                          : "none",
                        transform: isActive ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      <CategoryIcon src={icon} active={isActive} size={42} />
                    </div>
                    <span
                      className="text-lg xl:text-2xl font-medium transition-colors duration-200"
                      style={{
                        color: isActive ? "var(--color-orange)" : "#2C2C2A",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="absolute overflow-hidden rounded-[40px] shadow-lg"
            style={{
              left: "0%",
              width: "60.48%",
              top: `${(42 / 676) * 100}%`,
              height: `${(510.2 / 676) * 100}%`,
            }}
          >
            <img
              key={activeTab}
              src={activeCategoryData.img}
              alt={activeCategoryData.label}
              data-aos="zoom-in"
              data-aos-duration="600"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="absolute"
            style={{
              left: "80%",
              bottom: "13%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <div
              className="absolute"
              style={{
                left: "-34px",
                top: "-34px",
                width: "68px",
                height: "68px",
                backgroundColor: "var(--color-page)",
                borderRight: "2px solid var(--color-teal)",
                borderBottom: "2px solid var(--color-teal)",
                transform: "rotate(45deg)",
                zIndex: 2,
              }}
            />
          </div>
        </div>

        {/* عرض المنتجات الثلاثة التابعة للفئة المحددة */}
        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {displayedProducts.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleGoToCategoriesPage(item.categoryKey)}
                className="cursor-pointer"
              >
                <ProductCard product={item} index={index} />
              </div>
            ))}
          </div>

          <div className="flex justify-center sm:justify-end mt-6">
            <button
              onClick={() => handleGoToCategoriesPage(activeTab)}
              className="flex items-center gap-2 font-medium text-[var(--color-teal)] text-lg sm:text-xl md:text-2xl hover:opacity-80 transition-opacity cursor-pointer"
            >
              View All
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
