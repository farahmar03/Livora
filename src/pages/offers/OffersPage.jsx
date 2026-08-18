import React, { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/services/supabase"; // ✅ مسار الاتصال الصحيح

// استيراد صور المنتجات المحلية للحفاظ عليها كما هي
import offer1 from "@/assets/1..png";
import offer2 from "@/assets/2.png";
import offer3 from "@/assets/1.png";
import offer4 from "@/assets/4.png";
import offer5 from "@/assets/5.png";
import offer6 from "@/assets/6.png";
import offer7 from "@/assets/offar7.png";
import offer8 from "@/assets/offar8.png";
import offer9 from "@/assets/offar9.png";

// خريطة لربط أسماء الصور القادمة من الداتابيس بالمتغيرات المحلية
const localImagesMap = {
  "1..png": offer1,
  "2.png": offer2,
  "1.png": offer3,
  "4.png": offer4,
  "5.png": offer5,
  "6.png": offer6,
  "offar7.png": offer7,
  "offar8.png": offer8,
  "offar9.png": offer9,
};

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

export default function OffersPage() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  
  const [offersData, setOffersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColorIndex, setSelectedColorIndex] = useState({});

  // جلب العروض من جدول services في Supabase عند فتح الصفحة
  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("service_type", "offer"); // جلب العناصر المحددة كـ offer فقط

        if (error) {
          console.error("Error fetching offers:", error.message);
        } else if (data) {
          // تنسيق البيانات لتتوافق مع الهيكل المستخدم في البطاقات
          const formattedData = data.map((item) => ({
            id: item.id,
            name: item.title,
            material: item.description,
            price: typeof item.price === "number" ? `$${item.price.toLocaleString()}` : item.price,
            rating: 4.9, // قيمة ثابتة أو يمكن إضافتها للجدول لاحقاً
            // ربط اسم الصورة المخزن في الداتابيس بالصورة المحلية عبر الخريطة
            image: localImagesMap[item.image_url] || offer1, 
            colors: ["#8B5E3C", "#7A9A95", "#1B6D77"], // ألوان افتراضية للبطاقة
          }));
          setOffersData(formattedData);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  const handleColorSelect = (productId, colorIdx) => {
    setSelectedColorIndex((prev) => ({
      ...prev,
      [productId]: colorIdx,
    }));
  };

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

        {loading ? (
          <div className="text-center py-12 text-gray-500 font-medium">Loading offers...</div>
        ) : offersData.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-medium">No offers available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offersData.map((item) => {
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
        )}
      </main>
    </div>
  );
}