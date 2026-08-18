import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  Edit3,
  CheckCircle2,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// استيراد الأيقونات الأربع
import sofaIcon from "@/assets/Group 238991.png";
import curtainIcon from "@/assets/Group 6356131.png";
import carpetIcon from "@/assets/Group 6356132.png";
import bedIcon from "@/assets/Group 6356133.png";

export default function CleaningServiceBooking() {
  const navigate = useNavigate();

  // مراجع لحقول التاريخ والوقت لفتحها برمجياً عند النقر على أيقوناتك
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  // نوع الخدمة: Partial Cleaning أو Complete Cleaning
  const [cleaningType, setCleaningType] = useState("partial");

  // الخدمات المحددة بداخل Partial Cleaning
  const [selectedSubServices, setSelectedSubServices] = useState(["sofa"]);

  // حالة تحديد كرت Complete Cleaning
  const [isCompleteSelected, setIsCompleteSelected] = useState(true);

  // حقول نموذج التخطيط
  const [itemsCount, setItemsCount] = useState(1);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dirtLevel, setDirtLevel] = useState("Medium");
  const [notes, setNotes] = useState("");

  // قائمة الخدمات الجزئية
  const subServices = [
    {
      id: "sofa",
      label: "Sofa and living room cleaning",
      icon: sofaIcon,
      price: 120,
    },
    { id: "curtain", label: "Curtain cleaning", icon: curtainIcon, price: 60 },
    {
      id: "carpet",
      label: "Carpet and rug cleaning",
      icon: carpetIcon,
      price: 80,
    },
    { id: "bed", label: "Bed mattress cleaning", icon: bedIcon, price: 60 },
  ];

  // تبديل اختيار الخدمة الفرعية في التنظيف الجزئي
  const toggleSubService = (id) => {
    if (selectedSubServices.includes(id)) {
      if (selectedSubServices.length > 1) {
        setSelectedSubServices(selectedSubServices.filter((s) => s !== id));
      }
    } else {
      setSelectedSubServices([...selectedSubServices, id]);
    }
  };

  // حساب السعر التقديري بناءً على المدخلات والتحديد
  const calculatePrice = () => {
    if (cleaningType === "complete") {
      return isCompleteSelected ? 288 : 0;
    }
    const baseTotal = selectedSubServices.reduce((sum, serviceId) => {
      const item = subServices.find((s) => s.id === serviceId);
      return sum + (item ? item.price : 0);
    }, 0);
    return baseTotal * itemsCount;
  };

  // التحقق من صلاحية النموذج لتفعيل الزر
  const isFormValid =
    location.trim() !== "" &&
    date !== "" &&
    time !== "" &&
    calculatePrice() > 0;

  return (
    <div className="min-h-screen bg-[#F6EEE3]">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* عنوان الصفحة */}
        <h1 className="text-2xl font-bold text-[#1B6D77] mb-8">
          Furniture Cleaning Service
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* الجانب الأيسر: نوع الخدمة واختيار العناصر */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Specify Cleaning Service Type */}
            <div>
              <h2 className="text-base font-bold text-[#1B6D77] mb-4">
                Specify Cleaning Service Type
              </h2>
              <div className="inline-flex p-1 bg-white rounded-2xl shadow-sm border border-gray-100">
                <button
                  onClick={() => setCleaningType("partial")}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    cleaningType === "partial"
                      ? "bg-[#1B6D77] text-white shadow"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Partial Cleaning
                </button>
                <button
                  onClick={() => setCleaningType("complete")}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    cleaningType === "complete"
                      ? "bg-[#1B6D77] text-white shadow"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Complete Cleaning
                </button>
              </div>
            </div>

            {/* 2. Choose One Or More Services */}
            <div>
              <h2 className="text-base font-bold text-[#1B6D77] mb-4">
                Choose One Or More Services
              </h2>

              {cleaningType === "partial" ? (
                /* خيارات Partial Cleaning: الأيقونات الأربع المستقلة */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {subServices.map((service) => {
                    const isSelected = selectedSubServices.includes(
                      service.id
                    );
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleSubService(service.id)}
                        className={`relative bg-white rounded-2xl p-4 flex flex-col items-center justify-between text-center cursor-pointer transition-all border-2 min-h-[160px] ${
                          isSelected
                            ? "border-[#1B6D77] shadow-sm"
                            : "border-transparent hover:border-gray-200"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 text-[#1B6D77]">
                            <CheckCircle2
                              size={18}
                              className="fill-[#1B6D77] text-white"
                            />
                          </div>
                        )}
                        <div className="w-14 h-14 flex items-center justify-center my-auto">
                          <img
                            src={service.icon}
                            alt={service.label}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-800 leading-tight">
                          {service.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* خيار Complete Cleaning */
                <div
                  onClick={() => setIsCompleteSelected(!isCompleteSelected)}
                  className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all border-2 max-w-lg ${
                    isCompleteSelected
                      ? "border-[#1B6D77] shadow-sm"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className="absolute top-0 left-0 bg-[#D92D20] text-white text-[11px] font-bold px-3 py-1 rounded-br-xl rounded-tl-2xl">
                    Discount 10%
                  </div>

                  {isCompleteSelected && (
                    <div className="absolute top-3 right-3 text-[#1B6D77]">
                      <CheckCircle2
                        size={20}
                        className="fill-[#1B6D77] text-white"
                      />
                    </div>
                  )}

                  <div className="flex justify-center items-center gap-4 mt-4 mb-4">
                    <img
                      src={sofaIcon}
                      alt="sofa"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src={curtainIcon}
                      alt="curtain"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src={carpetIcon}
                      alt="carpet"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src={bedIcon}
                      alt="bed"
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                  <p className="text-center font-bold text-gray-800 text-sm">
                    Full Furniture Cleaning
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* الجانب الأيمن: بطاقة نموذج التخطيط */}
          <div className="lg:col-span-5 bg-white/70 rounded-3xl p-6 shadow-sm border border-gray-100/50">
            <h2 className="text-lg font-bold text-[#1B6D77] mb-6">
              Plan Your Cleaning Service
            </h2>

            <div className="space-y-4 text-xs font-medium text-gray-700">
              {/* Location */}
              <div className="flex items-center justify-between gap-4">
                <label className="font-semibold text-gray-700 w-1/3">
                  Location
                </label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full bg-white rounded-xl py-2.5 px-3 pr-9 border border-gray-200 outline-none focus:border-[#1B6D77] transition-all text-xs"
                  />
                  <MapPin
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600/70"
                  />
                </div>
              </div>

              {/* Cleaning Date & Time */}
              <div className="flex items-center justify-between gap-4">
                <label className="font-semibold text-gray-700 w-1/3">
                  Cleaning Date & Time
                </label>
                <div className="flex-1 flex gap-2">
                  {/* حقل التاريخ مع إخفاء أيقونة المتصفح وإظهار أيقونتك الصفراء فقط */}
                  <div className="relative flex-1">
                    <input
                      ref={dateInputRef}
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white rounded-xl py-2.5 px-2 pr-7 border border-gray-200 outline-none text-xs cursor-pointer focus:border-[#1B6D77] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
                    />
                    <Calendar
                      size={15}
                      onClick={() => dateInputRef.current?.showPicker?.()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-600/70 cursor-pointer hover:text-[#1B6D77]"
                    />
                  </div>

                  {/* حقل الوقت مع إخفاء أيقونة المتصفح وإظهار أيقونتك الصفراء فقط */}
                  <div className="relative flex-1">
                    <input
                      ref={timeInputRef}
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white rounded-xl py-2.5 px-2 pr-7 border border-gray-200 outline-none text-xs cursor-pointer focus:border-[#1B6D77] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
                    />
                    <Clock
                      size={15}
                      onClick={() => timeInputRef.current?.showPicker?.()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-600/70 cursor-pointer hover:text-[#1B6D77]"
                    />
                  </div>
                </div>
              </div>

              {/* Furniture Items Num (يظهر فقط عند الاختيار الجزئي) */}
              {cleaningType === "partial" && (
                <div className="flex items-center justify-between gap-4">
                  <label className="font-semibold text-gray-700 w-1/3">
                    Furniture Items Num
                  </label>
                  <div className="flex-1 flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setItemsCount(Math.max(1, itemsCount - 1))
                      }
                      className="p-2.5 bg-amber-100/60 hover:bg-amber-100 text-amber-800 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex-1 text-center font-bold text-sm text-gray-800">
                      {itemsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setItemsCount(itemsCount + 1)}
                      className="p-2.5 bg-amber-100/60 hover:bg-amber-100 text-amber-800 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Level of dirt */}
              <div className="flex items-center justify-between gap-4">
                <label className="font-semibold text-gray-700 w-1/3">
                  Level of dirt
                </label>
                <div className="relative flex-1">
                  <select
                    value={dirtLevel}
                    onChange={(e) => setDirtLevel(e.target.value)}
                    className="w-full bg-white rounded-xl py-2.5 px-3 pr-8 border border-gray-200 outline-none appearance-none text-xs text-gray-700 cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600/70 pointer-events-none"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="flex items-start justify-between gap-4">
                <label className="font-semibold text-gray-700 w-1/3 pt-2">
                  Additional Notes <br />
                  <span className="text-[10px] text-gray-400 font-normal">
                    (Optional)
                  </span>
                </label>
                <div className="relative flex-1">
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white rounded-xl py-2 px-3 pr-8 border border-gray-200 outline-none resize-none text-xs"
                  />
                  <Edit3
                    size={15}
                    className="absolute right-3 top-3 text-amber-600/70"
                  />
                </div>
              </div>
            </div>

            {/* Estimated Price */}
            <div className="mt-6 bg-[#E3ECEB] rounded-2xl p-4 flex items-center justify-center gap-2">
              <span className="text-xs font-semibold text-[#1B6D77]">
                Estimated Price :
              </span>
              <span className="text-xl font-bold text-[#1B6D77]">
                ${calculatePrice()}
              </span>
            </div>

            {/* Confirm & Pay Button */}
            <button
              type="button"
              disabled={!isFormValid}
              onClick={() => navigate("/payment")}
              className={`w-full mt-5 font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all text-sm ${
                isFormValid
                  ? "bg-[#D58C38] hover:bg-[#c27c2b] text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
              }`}
            >
              Confirm & Pay
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}