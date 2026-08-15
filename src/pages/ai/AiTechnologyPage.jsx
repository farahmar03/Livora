// src/pages/ai/AiTechnologyPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Heart, ShoppingCart, Star } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import defaultBoxImg from "@/assets/Property 1=Default.png";
import hoverBoxImg from "@/assets/Property 1=Variant2.png";

import chair1 from "@/assets//chair1.png";
import chair2 from "@/assets/chair2.png";
import sofa3 from "@/assets/sofa.png";

export default function AiTechnologyPage() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleStartAI = () => {
    setShowResults(true);
  };

  const suggestedProducts = [
    {
      id: 1,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      image: chair1,
      hasDiscount: false,
      colors: ["#8B5A2B", "#A8B2B7", "#1B6D77"],
    },
    {
      id: 2,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      image: chair2,
      hasDiscount: true,
      discountText: "Discount 10%",
      colors: ["#8B5A2B", "#A8B2B7", "#1B6D77"],
    },
    {
      id: 3,
      title: "Nordic OAk Chair",
      subtitle: "Emerald Green / Linen",
      price: "$1,250",
      rating: 4.9,
      image: sofa3,
      hasDiscount: false,
      colors: ["#8B5A2B", "#A8B2B7", "#1B6D77"],
    },
  ];

  return (
    <div className="bg-[var(--color-page)] min-h-screen flex flex-col">
      <Navbar />

      {!showResults ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-[#F5EFE6] rounded-[35px] p-8 md:p-12 max-w-xl w-full shadow-lg border border-[#EAE3D2] text-center flex flex-col items-center relative">
            <button
              onClick={() => navigate("/")}
              className="absolute top-6 right-6 text-gray-400 hover:text-[var(--color-teal)] transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-200/50"
              title="Back to Home"
            >
              <X size={24} />
            </button>

            <h1 className="text-3xl font-bold text-[var(--color-teal)] mb-3 mt-2">
              AI Technology
            </h1>

            <p className="text-gray-700 text-base md:text-lg mb-8 max-w-md font-medium leading-relaxed">
              Upload a photo of your room to help you choose the right and
              suitable furniture :
            </p>

            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-64 h-52 md:w-72 md:h-56 cursor-pointer transition-all duration-500 transform hover:scale-105 mb-8 rounded-3xl overflow-hidden flex items-center justify-center shadow-md"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 z-20 cursor-pointer"
              />

              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded Room"
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <img
                  src={isHovered ? hoverBoxImg : defaultBoxImg}
                  alt="Add Photo Box"
                  className="w-full h-full object-contain transition-all duration-500 ease-in-out"
                />
              )}
            </div>

            <button
              onClick={handleStartAI}
              className="w-full bg-[var(--color-orange)] hover:bg-[#c07a32] text-white font-semibold text-lg py-3.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-[1250px] mx-auto w-full px-6 py-10 flex-1">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-teal)] mb-2">
              AI Technology
            </h1>
            <p className="text-gray-700 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              Based on your room picture that you sent, we suggest these
              products for you which may suit your room :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="bg-white rounded-[28px] overflow-hidden shadow-md border border-gray-100 w-full relative group">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-xs">
                      <Star
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span>{product.rating}</span>
                    </div>

                    <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-xs cursor-pointer">
                      <Heart size={18} />
                    </button>

                    {product.hasDiscount && (
                      <div className="absolute bottom-3 right-0 bg-[#E52E2E] text-white text-xs font-bold px-3 py-1 rounded-l-md shadow-md">
                        {product.discountText}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      {product.subtitle}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        {product.price}
                      </span>

                      <button className="text-[var(--color-teal)] hover:text-[#135158] transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                        <ShoppingCart size={22} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300 inline-block shadow-xs"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-3/4 bg-[var(--color-orange)] hover:bg-[#c07a32] text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer text-center text-sm md:text-base">
                  3D Show
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}