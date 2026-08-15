import React, { useState, useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Navbar from "@/components/layout/Navbar";

import visaImg from "@/assets/visa.png";
import mastercardImg from "@/assets/master.png";
import walletImg from "@/assets/walt.png";
import transferImg from "@/assets/transfer.png";
import cashImg from "@/assets/cash.png";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const [step, setStep] = useState("select"); // select | redirecting | success | rating
  const [countdown, setCountdown] = useState(3);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isReviewSent, setIsReviewSent] = useState(false);

  const paymentMethods = [
    { id: "visa", title: "Visa card", img: visaImg },
    { id: "credit", title: "Credit card", img: mastercardImg },
    { id: "transfer", title: "Bank Transfer", img: transferImg },
    { id: "wallet", title: "Electronic Wallets", img: walletImg },
    { id: "cash", title: "Cash on delivery", img: cashImg },
  ];

  const handlePayNow = () => {
    setCountdown(3);
    setStep("redirecting");
  };

  const handleSendReview = () => {
    if (!reviewText.trim()) return; // منع الإرسال إذا كان الحقل فارغاً

    setIsReviewSent(true);

    // الانتظار لمدة ثانية لعرض حالة "Sent" باللون التركوازي ثم إغلاق النافذة
    setTimeout(() => {
      setStep("select");
      setIsReviewSent(false);
      setReviewText("");
    }, 1200);
  };

  const closeRatingModal = () => {
    setStep("select");
    setIsReviewSent(false);
    setReviewText("");
  };

  useEffect(() => {
    if (step === "redirecting") {
      if (countdown > 1) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setStep("success"), 1000);
      }
    }
  }, [step, countdown]);

  return (
    <div className="min-h-screen bg-[var(--color-page)] pb-16 text-[#1A6B74] relative">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-24">
        <h1 className="text-3xl font-bold mb-8">Payment Method</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {paymentMethods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative bg-white rounded-2xl p-6 cursor-pointer border-2 transition-all flex items-center justify-between shadow-sm min-h-[120px] ${
                  isSelected
                    ? "border-[#1A6B74]"
                    : "border-transparent hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={method.img}
                    alt={method.title}
                    className="h-10 object-contain"
                  />
                  <span className="font-bold text-gray-800 text-lg">
                    {method.title}
                  </span>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                    isSelected
                      ? "bg-[#1A6B74] border-[#1A6B74] text-white"
                      : "border-gray-400"
                  }`}
                >
                  {isSelected && <FiCheck size={16} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePayNow}
            className="w-full max-w-md bg-[#D88D35] hover:bg-[#c37d2b] text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all text-lg cursor-pointer"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Popups */}
      {step === "redirecting" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white border-2 border-[#1A6B74] rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <p className="text-gray-800 font-bold text-sm mb-4">
              You will be redirected to the payment gateway after:
            </p>
            <div className="bg-gray-100 rounded-lg py-2 px-6 inline-block font-bold text-2xl text-gray-800">
              {countdown}
            </div>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white border-2 border-[#1A6B74] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setStep("rating")}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <FiX size={20} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#F8E3D2] flex items-center justify-center text-[#D88D35]">
                <FiCheck size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Done</h3>
            </div>
            <p className="text-xs text-gray-500 mb-6 pl-11">
              Payment done successfully
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setStep("rating")}
                className="bg-[#1A6B74] text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-[#15575e] cursor-pointer"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. نافذة التقييم (Rate & Review) */}
      {step === "rating" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-[#E7ECE9] border-2 border-[#1A6B74] rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center relative">
            {/* زر الإغلاق X */}
            <button
              onClick={closeRatingModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <FiX size={20} />
            </button>

            <h3 className="font-bold text-[#1A6B74] text-xl mb-1">
              Rate & Review
            </h3>
            <p className="text-xs text-gray-600 font-medium mb-4">
              How was your experience?
            </p>

            {/* النجوم */}
            <div className="flex justify-center gap-2 mb-4 text-amber-400 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating ? "text-amber-400" : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* مربع كتابة الملاحظات */}
            <div className="bg-white rounded-xl p-3 mb-6 border border-amber-200/60 shadow-xs text-left">
              <textarea
                rows={3}
                placeholder="Write Your Review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full text-xs outline-none resize-none text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            {/* زر الإرسال المعدل */}
            <button
              onClick={handleSendReview}
              disabled={!reviewText.trim() || isReviewSent}
              className={`w-48 mx-auto font-bold py-2.5 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 ${
                isReviewSent
                  ? "bg-[#1A6B74] text-white cursor-default"
                  : !reviewText.trim()
                  ? "bg-[#D88D35]/50 text-white cursor-not-allowed"
                  : "bg-[#D88D35] hover:bg-[#c37d2b] text-white cursor-pointer active:scale-95"
              }`}
            >
              {isReviewSent ? (
                <>
                  <FiCheck size={16} />
                  <span>Sent</span>
                </>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}