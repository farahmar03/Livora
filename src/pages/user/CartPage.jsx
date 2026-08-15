// src/pages/user/CartPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiChevronRight } from "react-icons/fi";
import { FaTruck } from "react-icons/fa";
import Navbar from "@/components/layout/Navbar";

export default function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nordic OAk Chair",
      material: "Emerald Green / Linen",
      price: 1250,
      quantity: 1,
      checked: true,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Luna Velvet Sofa",
      material: "Nartural Oak / Linen",
      price: 420,
      quantity: 2,
      checked: true,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const toggleCheck = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryFee = 45;
  const discount = 0;
  const totalPayment = subtotal + deliveryFee - discount;

  return (
    <div className="min-h-screen bg-[var(--color-page)] pb-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <h1 className="text-3xl font-bold mb-1.5 text-[var(--color-teal)]">My Cart</h1>
        <p className="text-gray-700 mb-6 font-semibold text-base sm:text-lg">
          Review your items and proceed to checkout
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* الجزء الأيسر: كروت المنتجات */}
          <div className="lg:col-span-5 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 relative"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="w-4 h-4 accent-[var(--color-teal)] rounded-md cursor-pointer shrink-0"
                />

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-2xl shrink-0"
                />

                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[var(--color-teal)] hover:text-red-500 transition-colors p-1 cursor-pointer shrink-0"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {item.material}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-gray-900 text-sm">
                      ${item.price.toLocaleString()}
                    </span>

                    <div className="flex items-center gap-2 bg-[#F9F3EC] px-2.5 py-1 rounded-full border border-gray-200/60 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-[var(--color-teal)] hover:bg-white rounded-full p-0.5 transition-colors cursor-pointer"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="font-bold text-gray-800 text-xs w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-[var(--color-teal)] hover:bg-white rounded-full p-0.5 transition-colors cursor-pointer"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* شريط خدمة النقل - الخط يظهر فقط عند وضع الماوس (hover:underline) */}
            <div 
              onClick={() => navigate("/services/moving")}
              className="bg-[#E5ECE9] rounded-2xl p-4 flex items-center justify-between text-[var(--color-teal)] font-medium text-xs cursor-pointer hover:bg-[#dbe4e0] transition-colors shadow-sm group"
            >
              <div className="flex items-center gap-2">
                <FaTruck size={16} />
                <span className="group-hover:underline transition-all">
                  Book Moving Service To Get Home Delivery
                </span>
              </div>
              <FiChevronRight size={18} />
            </div>
          </div>

          {/* الجزء الأيمن: ملخص الطلب */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-4 -mt-2">
            <div className="bg-[#E7ECE9] rounded-3xl p-6 border border-gray-200/50 shadow-sm">
              <h4 className="font-bold text-gray-800 text-xs mb-2.5">
                Add Promo Code
              </h4>
              <div className="flex gap-2 mb-5">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 rounded-2xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[var(--color-teal)]"
                />
                <button className="bg-[var(--color-teal)] text-white px-4 py-2.5 rounded-2xl font-semibold text-xs hover:bg-[#15575e] transition-colors cursor-pointer shrink-0">
                  Apply
                </button>
              </div>

              <h3 className="font-bold text-gray-900 text-sm mb-3">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-gray-600 font-medium pb-4 border-b border-gray-300/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">
                    ${deliveryFee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="font-bold text-gray-900">${discount}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 text-[var(--color-teal)] font-bold text-base">
                <span>Total Payment</span>
                <span>${totalPayment.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/payment")}
              className="w-full bg-[var(--color-orange)] hover:opacity-90 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all text-base cursor-pointer"
            >
              Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}