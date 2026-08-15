import React, { useState } from "react";
import { Star, Heart, ShoppingCart, ChevronRight } from "lucide-react";

import sofasIcon from "@/assets/sofas1.png";
import lampsIcon from "@/assets/lamps.png";
import chairsIcon from "@/assets/chairs.png";
import bedsIcon from "@/assets/beds.png";
import bathroomIcon from "@/assets/bathroom.png";
import kitchenIcon from "@/assets/kitchen.png";

const categories = [
  { key: "sofas", label: "Sofas", icon: sofasIcon, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop" },
  { key: "lamps", label: "Lamps", icon: lampsIcon, img: "https://images.unsplash.com/photo-1507473885765-e6ed0579adf8?w=600&h=450&fit=crop" },
  { key: "chairs", label: "Chairs", icon: chairsIcon, img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=450&fit=crop" },
  { key: "beds", label: "Beds", icon: bedsIcon, img: "https://images.unsplash.com/photo-1505693416388-b5d4f03e03e6?w=600&h=450&fit=crop" },
  { key: "bathroom", label: "Bathroom", icon: bathroomIcon, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=450&fit=crop" },
  { key: "kitchen", label: "Kitchen", icon: kitchenIcon, img: "https://images.unsplash.com/photo-1556911220-e7189d5bcd24?w=600&h=450&fit=crop" },
];

const productsByCategory = {
  sofas: [
    {
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=450&fit=crop",
      ],
      discount: true,
    },
  ],
  lamps: [
    {
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed0579adf8?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1583847661886-9c1d7a1136d3?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1583847661886-9c1d7a1136d3?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1507473885765-e6ed0579adf8?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1507473885765-e6ed0579adf8?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1583847661886-9c1d7a1136d3?w=600&h=450&fit=crop",
      ],
      discount: true,
    },
  ],
  chairs: [
    {
      images: [
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1503602642458-2321114458f6?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1503602642458-2321114458f6?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1503602642458-2321114458f6?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=450&fit=crop",
      ],
      discount: true,
    },
  ],
  beds: [
    {
      images: [
        "https://images.unsplash.com/photo-1505693416388-b5d4f03e03e6?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1505693416388-b5d4f03e03e6?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1505693416388-b5d4f03e03e6?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&h=450&fit=crop",
      ],
      discount: true,
    },
  ],
  bathroom: [
    {
      images: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1584305574647-0cc9ebec5fa3?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1584305574647-0cc9ebec5fa3?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1584305574647-0cc9ebec5fa3?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?w=600&h=450&fit=crop",
      ],
      discount: true,
    },
  ],
  kitchen: [
    {
      images: [
        "https://images.unsplash.com/photo-1556911220-e7189d5bcd24?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1556911220-e7189d5bcd24?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&h=450&fit=crop",
      ],
      discount: false,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1556911220-e7189d5bcd24?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&h=450&fit=crop",
      ],
      discount: true,
    },
  ],
};

const PRODUCT_COLORS = ["#7A562C", "#A0A4AC", "#1B6D77"];

function CategoryIcon({ src, active, size = 60 }) {
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
        transition: "background-color 200ms ease",
      }}
    />
  );
}

function ProductCard({ product, index }) {
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  return (
    <div 
      data-aos="fade-up" 
      data-aos-delay={index * 150}
      data-aos-duration="800"
      className="bg-white rounded-2xl sm:rounded-3xl border border-[var(--color-teal)]/40 hover:border-[var(--color-teal)] transition-colors duration-300 overflow-hidden flex flex-col min-h-[360px] sm:min-h-[420px]"
    >
      <div className="relative">
        <img
          src={product.images[activeColorIndex]}
          alt="Product"
          className="w-full h-48 sm:h-56 md:h-64 object-cover block"
        />
        <div className="absolute top-3 left-3 bg-white rounded-full pl-2 pr-3 py-1 flex items-center gap-1 shadow-sm">
          <Star size={14} fill="#FEC803" stroke="#FEC803" />
          <span className="text-xs font-semibold text-gray-800">4.9</span>
        </div>
        <button
          type="button"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={16} className="text-gray-500" />
        </button>
        {product.discount && (
          <div className="absolute bottom-3 right-0 bg-[#DA0F12] text-white text-xs font-bold px-3 py-1 rounded-l-lg">
            Discount 10%
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Nordic Oak Chair</h3>
          <p className="text-sm text-gray-500 mb-2">Emerald Green / Linen</p>
          <p className="font-bold text-gray-900 text-base sm:text-lg mb-3">$1,250</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {PRODUCT_COLORS.map((color, idx) => (
              <button
                key={color}
                onClick={() => setActiveColorIndex(idx)}
                aria-label={`Select color ${idx + 1}`}
                className={`w-5 h-5 rounded-full border border-black/10 transition-all duration-200 hover:scale-110 ${
                  activeColorIndex === idx ? "ring-2 ring-[var(--color-teal)] ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Add to cart"
            className="text-[var(--color-teal)] hover:opacity-80 transition-opacity"
          >
            <ShoppingCart size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesSection({ onNavigate }) { // 1. استقبال onNavigate
  const [active, setActive] = useState("sofas");
  const products = productsByCategory[active];
  const activeCategory = categories.find((cat) => cat.key === active);

  // 2. دالة الضغط على زر View All
  const handleViewAll = () => {
    onNavigate("/categories"); // تمرير المسار لـ HomePage
  };

  return (
    <section id="CategoriesSection" className="w-full bg-[var(--color-page)] py-10 sm:py-12 md:py-16 overflow-hidden">
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
                key={active}
                src={activeCategory.img}
                alt={activeCategory.label}
                data-aos="zoom-in"
                data-aos-duration="500"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-4 w-max sm:w-full sm:grid sm:grid-cols-6 sm:gap-3">
              {categories.map(({ key, label, icon }) => {
                const isActive = active === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActive(key)}
                    className="flex flex-col items-center gap-2 group focus:outline-none shrink-0 w-20 sm:w-auto transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: isActive ? "var(--color-teal)" : "#E7E2D4",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      <CategoryIcon src={icon} active={isActive} size={40} />
                    </div>
                    <span
                      className="text-sm sm:text-base font-medium text-center transition-colors duration-200"
                      style={{ color: isActive ? "var(--color-orange)" : "#2C2C2A" }}
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
        <div className="hidden lg:block relative w-full" style={{ aspectRatio: "1159 / 676" }}>
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
                const isActive = active === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActive(key)}
                    className="flex flex-col items-center gap-2 group focus:outline-none transition-transform duration-300 hover:scale-105"
                  >
                    <div
                      className="w-24 h-24 xl:w-28 xl:h-28 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: isActive ? "var(--color-teal)" : "#E7E2D4",
                        boxShadow: isActive ? "0 8px 20px rgba(27, 109, 119, 0.25)" : "none",
                        transform: isActive ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      <CategoryIcon src={icon} active={isActive} />
                    </div>
                    <span
                      className="text-lg xl:text-2xl font-medium transition-colors duration-200"
                      style={{ color: isActive ? "var(--color-orange)" : "#2C2C2A" }}
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
              key={active}
              src={activeCategory.img}
              alt={activeCategory.label}
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

        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={i} index={i} product={product} />
            ))}
          </div>

          {/* 3. زر View All المعدل */}
          <div className="flex justify-center sm:justify-end mt-6">
            <button
              onClick={handleViewAll}
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