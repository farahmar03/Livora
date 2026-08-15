import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

// استيراد أيقونات الخدمات المصغرة
import furnitureIcon from "@/assets/Group 6356145.png";
import cleaningIcon from "@/assets/Group 239037.png";
import movingIcon from "@/assets/Group 6356176.png";

// استيراد صور المعرض الكبيرة
import furnitureImg from "@/assets/service-shop.png";
import cleaningImg from "@/assets/service-cleaning.png";
import movingImg from "@/assets/service-moving.png";

const services = [
  {
    id: "shop-furniture",
    path: "/services/shop-furniture",
    targetRoute: "/services/shop-furniture/products", // المسار الخاص بصفحة منتجات الأثاث المستعمل
    pageTitle: "Shop Used Furniture",
    cardTitle: "Furniture",
    icon: furnitureIcon,
    image: furnitureImg,
    description: "Discover stylish furniture for every room and lifestyle.",
    bullets: [
      "Premium quality products",
      "Modern & classic styles",
      "Fast delivery",
      "Secure payments",
    ],
  },
  {
    id: "cleaning",
    path: "/services/cleaning",
    targetRoute: "/services/cleaning/booking", // المسار الخاص بصفحة حجز خدمة التنظيف
    pageTitle: "Furniture Cleaning",
    cardTitle: "Cleaning Service",
    icon: cleaningIcon,
    image: cleaningImg,
    description: "Keep your furniture fresh, clean, and looking brand new.",
    bullets: [
      "Deep sofa cleaning",
      "Eco-friendly products",
      "Professional team",
      "Flexible booking",
    ],
  },
  {
    id: "moving",
    path: "/services/moving",
    targetRoute: "/services/moving/request", // المسار الخاص بصفحة طلب خدمة النقل
    pageTitle: "Furniture Moving",
    cardTitle: "Moving Service",
    icon: movingIcon,
    image: movingImg,
    description: "Safe and reliable furniture moving with real-time tracking.",
    bullets: [
      "Careful handling",
      "Packing & unpacking",
      "On-time delivery",
      "Live tracking",
    ],
  },
];

export default function ShopFurnitureDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // تحديد الموقِع الحالي لمعرفة أي خدمة نعرضها
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const foundIndex = services.findIndex((s) => s.path === location.pathname);
    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex);
    }
  }, [location.pathname]);

  // التنقل للخدمة السابقة
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + services.length) % services.length;
    setCurrentIndex(prevIndex);
    navigate(services[prevIndex].path);
  };

  // التنقل للخدمة التالية
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % services.length;
    setCurrentIndex(nextIndex);
    navigate(services[nextIndex].path);
  };

  const currentService = services[currentIndex];

  // دالة الضغط على زر Order Now لفتح صفحة الخدمة المحددة
  const handleOrderNow = () => {
    if (currentService.targetRoute) {
      navigate(currentService.targetRoute);
    } else {
      alert(`سيتم التوجيه لصفحة طلب ${currentService.cardTitle}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EEE3]">
      {/* 1. النافبار */}
      <Navbar />

      {/* 2. المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-2xl font-bold text-[#1B6D77] mb-8 transition-all">
          {currentService.pageTitle}
        </h1>

        <div className="relative flex items-center justify-center px-12">
          {/* زر السهم الأيسر */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="absolute left-0 z-20 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>

          {/* زر السهم الأيمن */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="absolute right-0 z-20 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer active:scale-95"
          >
            <ChevronRight size={22} />
          </button>

          {/* الكرت المتقاطع مع الصورة */}
          <div className="relative flex items-center w-full min-h-[440px]">
            {/* الكرت الأبيض */}
            <div className="relative z-10 w-[380px] bg-white rounded-3xl p-8 shadow-sm flex flex-col items-start gap-3 -mr-24 transition-all duration-300">
              <div className="w-[108px] h-[107px] flex items-center justify-center mb-1">
                <img
                  src={currentService.icon}
                  alt={currentService.cardTitle}
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-xl font-bold text-black">
                {currentService.cardTitle}
              </h2>

              <p className="text-sm font-medium text-gray-800 leading-snug">
                {currentService.description}
              </p>

              <ul className="text-sm text-gray-700 space-y-1 my-2">
                {currentService.bullets.map((bullet, idx) => (
                  <li key={idx}>• {bullet}</li>
                ))}
              </ul>

              {/* زر Order Now البرتقالي المربوط بالدالة */}
              <button
                type="button"
                onClick={handleOrderNow}
                className="w-full mt-2 bg-[#D58C38] hover:bg-[#c27c2b] text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-colors text-lg cursor-pointer"
              >
                Order Now
              </button>
            </div>

            {/* الصورة الكبيرة */}
            <div className="flex-1 h-[440px] rounded-3xl overflow-hidden shadow-sm transition-all duration-300">
              <img
                src={currentService.image}
                alt={currentService.pageTitle}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}