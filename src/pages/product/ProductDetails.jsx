import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

// استيراد صور الكلمة الجانبية المزخرفة
import furnitureLeft from "@/assets/FURNITURE1.png";
import furnitureRight from "@/assets/FURNITURE2.png";

// استيراد صور المنتجات العينة
import teal1 from "@/assets/chair2.png";
import teal2 from "@/assets/blue-chair0.png";
import teal3 from "@/assets/blue-chair2.png";

import gray1 from "@/assets/gray-chair1.png";
import gray2 from "@/assets/gray-chair2.png";
import gray3 from "@/assets/gray-chair3.png";

import orange1 from "@/assets/orang-chair1.png";
import orange2 from "@/assets/orange-chair.png";
import orange3 from "@/assets/orang-chair2.png";

// قائمة شاملة بالمنتجات المتاحة في تطبيقك
const allProducts = [
  {
    id: "sofa-1",
    title: "Serene Arc Sofa",
    description:
      "The Serene curved sofa is a modern and elegant piece designed for open spaces, combining comfort, softness, and a luxurious style.",
    price: 820,
    rating: 4.9,
    specifications: {
      dimensions: "200cm×90cm",
      material: "High-quality fabric",
      company: "Rokon",
      countryOfOrigin: "Turkey",
      warranty: "2 years",
    },
    colors: [
      { name: "Teal", hex: "#1D8B96", images: [teal1, teal2, teal3] },
      { name: "Gray", hex: "#A8B2C1", images: [gray1, gray2, gray3] },
      { name: "Orange", hex: "#C77D24", images: [orange1, orange2, orange3] },
    ],
  },
  {
    id: "sofa-2",
    title: "Nordic OAK Chair",
    description:
      "Nordic OAK Chair with high quality finish, ergonomic support, and classic Scandinavian minimalism perfect for modern living spaces.",
    price: 1250,
    rating: 4.8,
    specifications: {
      dimensions: "85cm×75cm",
      material: "Solid Oak & Premium Leather",
      company: "Nordic Home",
      countryOfOrigin: "Denmark",
      warranty: "3 years",
    },
    colors: [
      { name: "Teal", hex: "#1D8B96", images: [teal1, teal2, teal3] },
      { name: "Gray", hex: "#A8B2C1", images: [gray1, gray2, gray3] },
      { name: "Orange", hex: "#C77D24", images: [orange1, orange2, orange3] },
    ],
  },
  {
    id: "sofa-3",
    title: "Sofa 3 Modern Armchair",
    description:
      "A stylish modern armchair designed for comfortable reading corners and minimalist interior spaces.",
    price: 950,
    rating: 4.7,
    specifications: {
      dimensions: "110cm×85cm",
      material: "Velvet & Solid Wood",
      company: "Livora Craft",
      countryOfOrigin: "Turkey",
      warranty: "2 years",
    },
    colors: [
      { name: "Teal", hex: "#1D8B96", images: [teal1, teal2, teal3] },
      { name: "Gray", hex: "#A8B2C1", images: [gray1, gray2, gray3] },
      { name: "Orange", hex: "#C77D24", images: [orange1, orange2, orange3] },
    ],
  },
];

const ProductDetails = () => {
  const { id } = useParams();

  // تنظيف وتجهيز المعرف القادم من URL
  const rawId = id ? decodeURIComponent(id).trim() : "";
  const cleanId = rawId.toLowerCase();
  const normalizedId = cleanId.replace(/\s+/g, "-");

  // 1. البحث عن المنتج بأسلوب دقيق عبر المعرفات أو الألقاب بدلاً من الضبابية
  const match = allProducts.find((p) => {
    const pId = String(p.id).toLowerCase();
    const pTitle = String(p.title).toLowerCase();
    const pNormalizedTitle = pTitle.replace(/\s+/g, "-");

    return (
      pId === cleanId ||
      pId === normalizedId ||
      pTitle === cleanId ||
      pNormalizedTitle === normalizedId
    );
  });

  // 2. صياغة اسم افتراضي باللغة الإنجليزية في حال عدم مطابقة أي منتج ثبت
  const formattedTitle = rawId
    ? rawId.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : "Serene Arc Sofa";

  const currentProduct = match || {
    id: cleanId || "1",
    title: formattedTitle,
    description: `The ${formattedTitle} is a modern and elegant piece designed for comfortable open spaces.`,
    price: 850,
    rating: 4.8,
    specifications: {
      dimensions: "180cm×85cm",
      material: "High-quality fabric",
      company: "Livora Design",
      countryOfOrigin: "Turkey",
      warranty: "2 years",
    },
    colors: [
      { name: "Teal", hex: "#1D8B96", images: [teal1, teal2, teal3] },
      { name: "Gray", hex: "#A8B2C1", images: [gray1, gray2, gray3] },
      { name: "Orange", hex: "#C77D24", images: [orange1, orange2, orange3] },
    ],
  };

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // إعادة ضبط التحديدات فور تغير المنتج في الرابط
  useEffect(() => {
    setSelectedColorIdx(0);
    setCurrentImageIdx(0);
  }, [id]);

  const currentColor =
    currentProduct.colors?.[selectedColorIdx] || currentProduct.colors?.[0];
  const imagesList = currentColor?.images || [teal1];

  // معرف فريد يخصص هذا اللون الموحد تحديدا داخل المفضلة والسلة
  const colorUniqueId = `${currentProduct.id}-${currentColor?.name || "default"}`;
  const isColorFav = isFavorite(colorUniqueId);

  // التبديل التلقائي للصور في السلايدر
  useEffect(() => {
    if (!imagesList.length) return;

    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % imagesList.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [imagesList]);

  const handleColorChange = (idx) => {
    setSelectedColorIdx(idx);
    setCurrentImageIdx(0);
  };

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: colorUniqueId,
      originalId: currentProduct.id,
      title: `${currentProduct.title} (${currentColor?.name || ""})`,
      name: `${currentProduct.title} (${currentColor?.name || ""})`,
      color: currentColor?.name,
      material: currentProduct.specifications?.material,
      image: imagesList[currentImageIdx] || currentProduct.image,
      price: currentProduct.price,
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: colorUniqueId,
      originalId: currentProduct.id,
      title: currentProduct.title,
      name: `${currentProduct.title} (${currentColor?.name || ""})`,
      color: currentColor?.name,
      material: `${currentColor?.name || ""} / ${currentProduct.specifications?.material}`,
      image: imagesList[currentImageIdx] || currentProduct.image,
      price: currentProduct.price,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col pb-12">
      <Navbar />

      <main className="max-w-[1100px] mx-auto w-full px-6 pt-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* قسم التفاصيل والمواصفات */}
          <div className="md:col-span-5 bg-[#F6E7D2] rounded-2xl p-8 flex flex-col justify-between shadow-xs min-h-[480px]">
            <div>
              <h1 className="text-2xl font-bold text-[#D98B32] mb-3">
                {currentProduct.title}
              </h1>
              <p className="text-sm text-gray-700 leading-relaxed mb-6 font-medium">
                {currentProduct.description}
              </p>

              <div className="space-y-2 mb-6">
                <h2 className="text-lg font-bold text-[var(--color-teal)] mb-3">
                  Specifications
                </h2>
                <div className="text-sm text-gray-700 space-y-2 font-medium">
                  <p>
                    <span className="text-gray-500">Dimensions:</span>{" "}
                    <strong className="text-gray-800">
                      {currentProduct.specifications?.dimensions}
                    </strong>
                  </p>
                  <p>
                    <span className="text-gray-500">Material:</span>{" "}
                    <strong className="text-gray-800">
                      {currentProduct.specifications?.material}
                    </strong>
                  </p>
                  <p>
                    <span className="text-gray-500">Company:</span>{" "}
                    <strong className="text-gray-800">
                      {currentProduct.specifications?.company}
                    </strong>
                  </p>
                  <p>
                    <span className="text-gray-500">Country of Origin:</span>{" "}
                    <strong className="text-gray-800">
                      {currentProduct.specifications?.countryOfOrigin}
                    </strong>
                  </p>
                  <p>
                    <span className="text-gray-500">Warranty:</span>{" "}
                    <strong className="text-gray-800">
                      {currentProduct.specifications?.warranty}
                    </strong>
                  </p>
                </div>
              </div>

              {/* دوائر اختيار الألوان */}
              {currentProduct.colors && currentProduct.colors.length > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  {currentProduct.colors.map((color, idx) => (
                    <button
                      key={color.name || idx}
                      onClick={() => handleColorChange(idx)}
                      className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${
                        selectedColorIdx === idx
                          ? "ring-2 ring-offset-2 ring-[var(--color-teal)] scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* السعر */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[var(--color-teal)]">
                Price:
              </span>
              <span className="text-2xl font-bold text-[#D98B32] underline decoration-2">
                ${currentProduct.price}
              </span>
            </div>
          </div>

          {/* قسم معرض الصور والكلمة المزخرفة */}
          <div className="md:col-span-7 bg-[var(--color-teal)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-md min-h-[480px]">
            {/* صور الكلمة الجانبية المزخرفة FURNITURE */}
            <img
              src={furnitureLeft}
              alt="FURNITURE"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-[80%] object-contain pointer-events-none select-none hidden sm:block opacity-90"
            />
            <img
              src={furnitureRight}
              alt="FURNITURE"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-[80%] object-contain pointer-events-none select-none hidden sm:block opacity-90"
            />

            {/* بطاقة عرض الصورة */}
            <div className="relative w-full h-80 sm:h-[360px] rounded-t-[40px] rounded-b-none overflow-hidden sm:mx-auto max-w-[430px]">
              {/* التقييم */}
              <div className="absolute top-4 left-6 z-10 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-gray-800">
                  {currentProduct.rating}
                </span>
              </div>

              {/* زر المفضلة المنفصل لكل لون */}
              <button
                type="button"
                onClick={handleFavoriteClick}
                className="absolute top-4 right-6 z-10 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-xs cursor-pointer"
                aria-label="Add to favorites"
              >
                <Heart
                  size={18}
                  className={
                    isColorFav
                      ? "fill-red-500 text-red-500"
                      : "text-[var(--color-teal)]"
                  }
                />
              </button>

              {/* الصورة المعروضة */}
              <img
                src={imagesList[currentImageIdx] || currentProduct.image}
                alt={currentProduct.title}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />

              {/* نقاط المؤشر السفلية */}
              {imagesList.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
                  {imagesList.map((_, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={() => setCurrentImageIdx(imgIdx)}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentImageIdx === imgIdx
                          ? "bg-[#1D8B96] border-2 border-[#1D8B96]"
                          : "bg-white border-2 border-[#1D8B96]"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* زر الإضافة للسلة */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-[220px]">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#D98B32] hover:bg-[#c47b28] text-white font-bold text-lg py-3 rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer text-center"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
