import React, { useState } from "react";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

export function FontAwesomeCartIcon({
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

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  // معرف المنتج الاصلي بدون إضافة كود اللون عليه
  const rawProductId = product.originalId || product.id;

  // الانتقال لصفحة التفاصيل فقط للمنتج السامبل
  const handleCardClick = () => {
    if (rawProductId === "sample-chair-1") {
      navigate(`/product/${encodeURIComponent(rawProductId)}`);
    }
  };

  const getCurrentColorHex = () => {
    if (Array.isArray(product.colors) && product.colors.length > 0) {
      const colorItem = product.colors[selectedColorIdx];
      return typeof colorItem === "string" ? colorItem : colorItem?.hex;
    }
    return null;
  };

  const currentColorHex = getCurrentColorHex();

  const getProductImage = () => {
    if (
      Array.isArray(product.colors) &&
      product.colors[selectedColorIdx]?.image
    ) {
      return product.colors[selectedColorIdx].image;
    }
    return (
      product.image ||
      (Array.isArray(product.colors) ? product.colors[0]?.image : "")
    );
  };

  const currentImage = getProductImage();

  // إضافة للمفضلة بالـ ID الأصلي النظيف
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite({
      ...product,
      id: rawProductId, // استخدام الـ ID الأصلي لضمان توحيد المسارات
      originalId: rawProductId,
      selectedColor: currentColorHex,
      image: currentImage,
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      ...product,
      id: `${rawProductId}-${currentColorHex || "default"}`,
      name: product.name || product.title,
      material: product.material || product.subtitle || "",
      selectedColor: currentColorHex,
      image: currentImage,
    });
  };

  const isCurrentColorFav = isFavorite(rawProductId);

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-[26px] overflow-hidden shadow-xs hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between w-full group ${
        rawProductId === "sample-chair-1" ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
        <img
          src={currentImage}
          alt={product.name || product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.rating && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-xs">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-xs cursor-pointer z-10"
          aria-label="Add to favorites"
        >
          <Heart
            size={16}
            className={
              isCurrentColorFav
                ? "fill-red-500 text-red-500"
                : "text-[var(--color-teal)]"
            }
          />
        </button>

        {product.discount && (
          <div className="absolute bottom-2 right-0 bg-[#E52E2E] text-white text-[11px] font-bold px-3 py-1 rounded-l-md shadow-md">
            Discount 10%
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-0.5">
          {product.name || product.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {product.material || product.subtitle}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">
            {typeof product.price === "number"
              ? `$${product.price.toLocaleString()}`
              : product.price}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className="text-[var(--color-teal)] hover:text-[#135158] transition-transform duration-200 ease-in-out hover:scale-125 active:scale-95 p-1 cursor-pointer"
            aria-label="Add to cart"
          >
            <FontAwesomeCartIcon />
          </button>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            {product.colors.map((colorItem, idx) => {
              const hexColor =
                typeof colorItem === "string" ? colorItem : colorItem.hex;
              const isSelected = selectedColorIdx === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIdx(idx);
                  }}
                  className={`w-4 h-4 rounded-full cursor-pointer transition-transform duration-150 ${
                    isSelected
                      ? "ring-2 ring-offset-1 ring-[var(--color-teal)] scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: hexColor }}
                  title={`Select color ${idx + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
