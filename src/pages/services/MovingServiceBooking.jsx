import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  Plus,
  Minus,
  Phone,
  MessageSquare,
  Bell,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

import mapImg from "@/assets/Group.png";
import driverImg from "@/assets/Group 6356181.png";

export default function MovingServiceBooking() {
  const navigate = useNavigate();

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [moveType, setMoveType] = useState("partial");
  const [locationScope, setLocationScope] = useState("intercity");
  const [needPacking, setNeedPacking] = useState(true);
  const [needAssembly, setNeedAssembly] = useState(true);

  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsSize, setItemsSize] = useState("Medium");

  const calculatePrice = () => {
    let base = moveType === "complete" ? 300 : 150;
    if (locationScope === "intercity") base += 50;
    if (needPacking) base += 40;
    if (needAssembly) base += 30;
    if (moveType === "partial") base += (itemsCount - 1) * 15;
    return base;
  };

  const estimatedPrice = calculatePrice();
  const isFormValid =
    fromAddress.trim() !== "" &&
    toAddress.trim() !== "" &&
    date !== "" &&
    time !== "" &&
    estimatedPrice > 0;

  // --- إضافة دالة التأكيد المحدثة لحفظ الإشعار ---
  const handleConfirm = () => {
    // 1. إنشاء كائن الإشعار بالبيانات والخصائص المطلوبة
    const newNotification = {
      id: Date.now(),
      title: "Furniture Moving Confirmed",
      message: `Your moving request from ${fromAddress} to ${toAddress} has been placed successfully!`,
      time: "Just now",
      type: "Services",
      section: "Today",
      hasBadge: true,
    };

    // 2. حفظ الإشعار في localStorage تحت المفتاح app_notifications
    const existingNotifications = JSON.parse(
      localStorage.getItem("app_notifications") || "[]",
    );
    const updatedNotifications = [newNotification, ...existingNotifications];
    localStorage.setItem(
      "app_notifications",
      JSON.stringify(updatedNotifications),
    );

    // 3. زيادة عداد الإشعارات غير المقروءة
    const currentCount = parseInt(
      localStorage.getItem("unread_notifications_count") || "0",
      10,
    );
    localStorage.setItem(
      "unread_notifications_count",
      (currentCount + 1).toString(),
    );

    // 4. إرسال حدث لتحديث الـ Navbar فوراً
    window.dispatchEvent(new Event("notifications_updated"));

    // 5. التبديل لشاشة التتبع الحي
    setIsConfirmed(true);
  };

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        bookingId: "#1258",
        price: estimatedPrice,
        fromAddress,
        toAddress,
        date,
        time,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F6EEE3]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[#1B6D77] mb-8">
          Furniture Moving Service
        </h1>

        {!isConfirmed ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Options Panel */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="text-base font-bold text-[#1B6D77] mb-4">
                  Specify Moving Type
                </h2>

                <div className="space-y-3 max-w-md">
                  <div className="grid grid-cols-2 p-1 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <button
                      type="button"
                      onClick={() => setMoveType("partial")}
                      className={`py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        moveType === "partial"
                          ? "bg-[#1B6D77] text-white shadow"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Partial Move
                    </button>
                    <button
                      type="button"
                      onClick={() => setMoveType("complete")}
                      className={`py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        moveType === "complete"
                          ? "bg-[#1B6D77] text-white shadow"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Complete Move
                    </button>
                  </div>

                  <div className="grid grid-cols-2 p-1 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <button
                      type="button"
                      onClick={() => setLocationScope("local")}
                      className={`py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        locationScope === "local"
                          ? "bg-[#1B6D77] text-white shadow"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Local Move
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocationScope("intercity")}
                      className={`py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        locationScope === "intercity"
                          ? "bg-[#1B6D77] text-white shadow"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      InterCity Move
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#1B6D77] mb-4">
                  Additional Services
                </h2>

                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">
                      Need Packing & Unpacking
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={needPacking}
                      aria-label="Need Packing & Unpacking"
                      onClick={() => setNeedPacking(!needPacking)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        needPacking ? "bg-[#1B6D77]" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          needPacking ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">
                      Need Assembly & Disassembly
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={needAssembly}
                      aria-label="Need Assembly & Disassembly"
                      onClick={() => setNeedAssembly(!needAssembly)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        needAssembly ? "bg-[#1B6D77]" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          needAssembly ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="lg:col-span-6 bg-white/70 rounded-3xl p-6 shadow-sm border border-gray-100/50">
              <h2 className="text-lg font-bold text-[#1B6D77] mb-6">
                Plan Your Move
              </h2>

              <div className="space-y-4 text-xs font-medium text-gray-700">
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="fromAddress"
                    className="font-semibold text-gray-700 w-1/3"
                  >
                    From
                  </label>
                  <div className="relative flex-1">
                    <input
                      id="fromAddress"
                      type="text"
                      value={fromAddress}
                      onChange={(e) => setFromAddress(e.target.value)}
                      placeholder="Enter pickup location"
                      className="w-full bg-white rounded-xl py-2.5 px-3 pr-9 border border-gray-200 outline-none focus:border-[#1B6D77] transition-all text-xs"
                    />
                    <MapPin
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600/70 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="toAddress"
                    className="font-semibold text-gray-700 w-1/3"
                  >
                    To
                  </label>
                  <div className="relative flex-1">
                    <input
                      id="toAddress"
                      type="text"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                      placeholder="Enter destination location"
                      className="w-full bg-white rounded-xl py-2.5 px-3 pr-9 border border-gray-200 outline-none focus:border-[#1B6D77] transition-all text-xs"
                    />
                    <MapPin
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600/70 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Moving Date & Time
                  </span>
                  <div className="flex-1 flex gap-2">
                    <div className="relative flex-1">
                      <input
                        ref={dateInputRef}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        aria-label="Moving Date"
                        className="w-full bg-white rounded-xl py-2.5 px-2 pr-7 border border-gray-200 outline-none text-xs cursor-pointer focus:border-[#1B6D77] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
                      />
                      <Calendar
                        size={15}
                        onClick={() => dateInputRef.current?.showPicker?.()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-600/70 cursor-pointer hover:text-[#1B6D77]"
                      />
                    </div>

                    <div className="relative flex-1">
                      <input
                        ref={timeInputRef}
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        aria-label="Moving Time"
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

                {moveType === "partial" && (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-gray-700 w-1/3">
                        Furniture Items Num
                      </span>
                      <div className="flex-1 flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <button
                          type="button"
                          aria-label="Decrease items"
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
                          aria-label="Increase items"
                          onClick={() => setItemsCount(itemsCount + 1)}
                          className="p-2.5 bg-amber-100/60 hover:bg-amber-100 text-amber-800 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <label
                        htmlFor="itemsSize"
                        className="font-semibold text-gray-700 w-1/3"
                      >
                        Items Size
                      </label>
                      <div className="relative flex-1">
                        <select
                          id="itemsSize"
                          value={itemsSize}
                          onChange={(e) => setItemsSize(e.target.value)}
                          className="w-full bg-white rounded-xl py-2.5 px-3 pr-8 border border-gray-200 outline-none appearance-none text-xs text-gray-700 cursor-pointer"
                        >
                          <option value="Small">Small</option>
                          <option value="Medium">Medium</option>
                          <option value="Large">Large</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600/70 pointer-events-none"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 bg-[#E3ECEB] rounded-2xl p-4 flex items-center justify-center gap-2">
                <span className="text-xs font-semibold text-[#1B6D77]">
                  Estimated Price :
                </span>
                <span className="text-xl font-bold text-[#1B6D77]">
                  ${estimatedPrice}
                </span>
              </div>

              <button
                type="button"
                disabled={!isFormValid}
                onClick={handleConfirm}
                className={`w-full mt-5 font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all text-sm ${
                  isFormValid
                    ? "bg-[#D58C38] hover:bg-[#c27c2b] text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          /* Live Tracking View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#1B6D77] text-white py-3 text-center font-bold text-base">
                Live Tracking
              </div>

              <div className="relative p-3 bg-gray-50">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-[#EFE3D3] text-gray-800 px-4 py-2 rounded-2xl shadow-md border border-amber-200/50 flex items-center gap-2 text-xs font-semibold">
                  <Bell size={16} className="text-amber-800 fill-amber-800" />
                  <span>The truck is on the way</span>
                </div>

                <img
                  src={mapImg}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/600x350/e2e8f0/1b6d77?text=Map+Tracking+View";
                  }}
                  alt="Live Map Tracking"
                  className="w-full rounded-2xl object-cover h-[350px]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#EFE3D3] rounded-3xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={driverImg}
                    alt="Sami Ahmed"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">
                      Sami Ahmed
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Delivery person
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Call driver"
                    className="w-9 h-9 rounded-full bg-[#1B6D77] text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-all cursor-pointer"
                  >
                    <Phone size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Message driver"
                    className="w-9 h-9 rounded-full bg-[#1B6D77] text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-all cursor-pointer"
                  >
                    <MessageSquare size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-white/70 rounded-3xl p-6 shadow-sm border border-gray-100/50">
                <h3 className="text-base font-bold text-[#1B6D77] mb-5">
                  Service Details
                </h3>

                <div className="space-y-4 text-xs font-semibold text-gray-700 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-gray-800" />
                      <span>Remaining Time</span>
                    </div>
                    <span className="font-bold text-gray-900">20 min</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-bold text-base leading-none">
                        #
                      </span>
                      <span>Booking ID</span>
                    </div>
                    <span className="font-bold text-gray-900">#1258</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="w-full bg-[#D58C38] hover:bg-[#c27c2b] text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all cursor-pointer text-sm"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}