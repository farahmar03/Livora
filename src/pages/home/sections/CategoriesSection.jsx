import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

// أيقونات الفئات
import sofasIcon from "@/assets/sofas1.png";
import lampsIcon from "@/assets/lamps.png";
import chairsIcon from "@/assets/chairs.png";
import bedsIcon from "@/assets/beds.png";
import bathroomIcon from "@/assets/bathroom.png";
import kitchenIcon from "@/assets/kitchen.png";

// صور الكراسي للسامبل الرئيسي
import teal1 from "@/assets/chair2.png";
import gray1 from "@/assets/gray-chair1.png";
import orange1 from "@/assets/orang-chair2.png";

/* =========================================================
   1. استيراد صور المنتجات الخاصة بكِ من مجلد assets:
   ========================================================= */
import sofa0 from "@/assets/sofa0.jpg";
import sofa1 from "@/assets/sofa1.jpg";
import sofa2 from "@/assets/sofa2.jpg";

import lamp0 from "@/assets/lamp0.jpg";
import lamp1 from "@/assets/lamp1.jpg";
import lamp2 from "@/assets/lamp2.jpg";

import chair0 from "@/assets/chair0.jpg";
import chair1 from "@/assets/chair1.jpg";

import bed0 from "@/assets/bed0.jpg";
import bed1 from "@/assets/bed1.jpg";
import bed2 from "@/assets/bed2.jpg";

import bath0 from "@/assets/bath0.jpg";
import bath1 from "@/assets/bath1.jpg";
import bath2 from "@/assets/bath2.jpg";

import kit0 from "@/assets/kit0.jpg";
import kit1 from "@/assets/kit1.jpg";
import kit2 from "@/assets/kit2.jpg";

// استيراد ProductCard
import ProductCard from "@/components/common/ProductCard";

/* =========================================================
   2. قائمة الفئات والصورة الرئيسية المعروضة بالبنر لكل فئة:
   ========================================================= */
const categories = [
  {
    key: "sofas",
    label: "Sofas",
    icon: sofasIcon,
    img: sofa0 /* حطي صورة البنر الرئيسية للفئة هان */,
  },
  {
    key: "lamps",
    label: "Lamps",
    icon: lampsIcon,
    img: lamp0 /* حطي صورة البنر الرئيسية للفئة هان */,
  },
  {
    key: "chairs",
    label: "Chairs",
    icon: chairsIcon,
    img: teal1 /* حطي صورة البنر الرئيسية للفئة هان */,
  },
  {
    key: "beds",
    label: "Beds",
    icon: bedsIcon,
    img: bed0 /* حطي صورة البنر الرئيسية للفئة هان */,
  },
  {
    key: "bathroom",
    label: "Bathroom",
    icon: bathroomIcon,
    img: bath0 /* حطي صورة البنر الرئيسية للفئة هان */,
  },
  {
    key: "kitchen",
    label: "Kitchen",
    icon: kitchenIcon,
    img: kit0 /* حطي صورة البنر الرئيسية للفئة هان */,
  },
];

// دالة إنشاء كائن منتج مطابق لبنية صفحة الفئات
const createDummyProduct = (id, name, categoryKey, defaultImg) => ({
  id,
  originalId: id,
  categoryKey,
  name: name || "Nordic OAK Chair",
  title: name || "Nordic OAK Chair",
  subtitle: "Emerald Green / Linen",
  material: "Emerald Green / Linen",
  price: "$1,250",
  rating: 4.9,
  image: defaultImg,
  colors: [{ name: "Teal", hex: "#1D8B96", image: defaultImg }],
});

// منتج الكرسي العينة الملون
const sampleChairProduct = {
  id: "sample-chair-1",
  originalId: "sample-chair-1",
  categoryKey: "chairs",
  name: "Nordic OAK Chair",
  title: "Nordic OAK Chair",
  subtitle: "Emerald Green / Linen",
  material: "Emerald Green / Linen",
  price: "$1,250",
  oldPrice: "$1,500",
  discount: true,
  rating: 4.9,
  category: "Chairs",
  condition: "Excellent Condition",
  usedDuration: "Used 1 Month",
  image: teal1,
  colors: [
    { name: "Teal", hex: "#1D8B96", image: teal1 },
    { name: "Gray", hex: "#A8B2C1", image: gray1 },
    { name: "Orange", hex: "#C77D24", image: orange1 },
  ],
};

/* =========================================================
   3. جلب أول 3 منتجات فقط لكل فئة (نفس بيانات صفحة الفئات):
   ========================================================= */
const productsByCategory = {
  sofas: [
    createDummyProduct("sofa-0", "Modern Sofa", "sofas", sofa0 /* الصورة 1 */),
    createDummyProduct("sofa-1", "Linen Sofa", "sofas", sofa1 /* الصورة 2 */),
    createDummyProduct("sofa-2", "Luxury Sofa", "sofas", sofa2 /* الصورة 3 */),
  ],
  lamps: [
    createDummyProduct("lamp-0", "Table Lamp", "lamps", lamp0 /* الصورة 1 */),
    createDummyProduct("lamp-1", "Floor Lamp", "lamps", lamp1 /* الصورة 2 */),
    createDummyProduct("lamp-2", "Desk Lamp", "lamps", lamp2 /* الصورة 3 */),
  ],
  chairs: [
    sampleChairProduct, // المنتج الأول المشترك
    createDummyProduct(
      "chair-1",
      "Office Chair",
      "chairs",
      chair0 /* الصورة 2 */,
    ),
    createDummyProduct(
      "chair-2",
      "Dining Chair",
      "chairs",
      chair1 /* الصورة 3 */,
    ),
  ],
  beds: [
    createDummyProduct("bed-0", "King Bed", "beds", bed0 /* الصورة 1 */),
    createDummyProduct("bed-1", "Queen Bed", "beds", bed1 /* الصورة 2 */),
    createDummyProduct("bed-2", "Single Bed", "beds", bed2 /* الصورة 3 */),
  ],
  bathroom: [
    createDummyProduct(
      "bath-0",
      "Bathroom Cabinet",
      "bathroom",
      bath0 /* الصورة 1 */,
    ),
    createDummyProduct(
      "bath-1",
      "Mirror Cabinet",
      "bathroom",
      bath1 /* الصورة 2 */,
    ),
    createDummyProduct(
      "bath-2",
      "Towel Rack",
      "bathroom",
      bath2 /* الصورة 3 */,
    ),
  ],
  kitchen: [
    createDummyProduct(
      "kitchen-0",
      "Kitchen Island",
      "kitchen",
      kit0 /* الصورة 1 */,
    ),
    createDummyProduct(
      "kitchen-1",
      "Dining Table",
      "kitchen",
      kit1 /* الصورة 2 */,
    ),
    createDummyProduct(
      "kitchen-2",
      "Kitchen Counter",
      "kitchen",
      kit2 /* الصورة 3 */,
    ),
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

  // جلب أول 3 منتجات خاصة بالفئة النشطة
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