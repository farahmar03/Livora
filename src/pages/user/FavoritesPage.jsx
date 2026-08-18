import React from "react";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

function FontAwesomeCartIcon({ className = "w-7 h-7 text-[#1B6D77]" }) {
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

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    const originalId = String(product.originalId || "");
    const currentId = String(product.id || "");
    const productName = String(product.name || product.title || "");

    const isTargetSample =
      originalId === "sample-chair-1" ||
      currentId.startsWith("sample-chair-1") ||
      productName.includes("Nordic OAK Chair");

    if (isTargetSample) {
      navigate(`/product/${encodeURIComponent("sample-chair-1")}`);
    }
  };

  return (
    <div className="bg-[#F8F6F0] min-h-screen flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1200px] mx-auto w-full px-6 pt-8 flex-1">
        <h1 className="text-2xl font-bold text-[#1B6D77] mb-1">My Favorites</h1>
        <p className="text-gray-600 text-sm font-medium mb-8">
          {favorites.length} Items Saved For Later
        </p>

        {favorites.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            No favorite items added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {favorites.map((product) => {
              const originalId = String(product.originalId || "");
              const currentId = String(product.id || "");
              const productName = String(product.name || product.title || "");

              const isSample =
                originalId === "sample-chair-1" ||
                currentId.startsWith("sample-chair-1") ||
                productName.includes("Nordic OAK Chair");

              return (
                <div
                  key={product.id || product.title}
                  onClick={() => handleProductClick(product)}
                  className={`bg-white rounded-[26px] overflow-hidden shadow-xs hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between group ${
                    isSample ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name || product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Rating */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-xs">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span>{product.rating || 4.9}</span>
                    </div>

                    {/* زر المفضلة للحذف المباشر */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product);
                      }}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full text-red-500 hover:scale-110 transition-all shadow-xs cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Heart size={16} className="fill-red-500 text-red-500" />
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
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: product.id || product.title,
                            originalId: product.originalId || product.id,
                            title: product.name || product.title,
                            name: product.name || product.title,
                            image: product.image,
                            price: product.price,
                            material: product.material || product.subtitle,
                          });
                        }}
                        className="text-[#1B6D77] hover:text-[#135158] transition-colors p-1 cursor-pointer"
                        title="Add to Cart"
                      >
                        <FontAwesomeCartIcon className="w-7 h-7 text-[#1B6D77] hover:text-[#135158]" />
                      </button>
                    </div>

                    {/* دوائر الألوان للمنتج */}
                    {product.colors && (
                      <div className="flex items-center gap-2 mt-3">
                        {product.colors.map((colorObj, cIdx) => {
                          const colorHex =
                            typeof colorObj === "string"
                              ? colorObj
                              : colorObj.hex;
                          return (
                            <span
                              key={cIdx}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: colorHex }}
                            />
                          );
                        })}
                      </div>
                    )}
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