import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShield,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filterTabs = ["All", "Orders", "Offers", "Services"];

  // بيانات الإشعارات المطابقة للتصميم باستخدام Font Awesome
  const notifications = [
    {
      id: 1,
      section: "Today",
      type: "Orders",
      title: "Order Update",
      message:
        "Your order #1234 has been shipped ,You can track it on the map now",
      time: "1:30 pm",
      icon: (
        <FontAwesomeIcon
          icon={faTruck}
          className="text-[#1B6D77] text-xl md:text-2xl"
        />
      ),
      hasBadge: true,
    },
    {
      id: 2,
      section: "Today",
      type: "Orders",
      title: "Order Update",
      message:
        "Your order #1234 has been shipped ,You can track it on the map now",
      time: "1:30 pm",
      icon: (
        <FontAwesomeIcon
          icon={faShield}
          className="text-[#1B6D77] text-xl md:text-2xl"
        />
      ),
      hasBadge: false,
    },
    {
      id: 3,
      section: "Yesterday",
      type: "Services",
      title: "Security Alert",
      message:
        "Anew login was detected on an iphone 15\nIf this wasnt you, change your password",
      time: "8:00 am",
      icon: (
        <FontAwesomeIcon
          icon={faWandMagicSparkles}
          className="text-[#1B6D77] text-xl md:text-2xl"
        />
      ),
      hasBadge: false,
    },
  ];

  // تصفية الإشعارات حسب التاب المختار
  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter((item) => item.type === activeTab);

  const todayList = filteredNotifications.filter(
    (item) => item.section === "Today"
  );
  const yesterdayList = filteredNotifications.filter(
    (item) => item.section === "Yesterday"
  );

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* عنوان الصفحة */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#1B6D77] mb-6 text-left">
            Notifications
          </h1>

          {/* الفلاتر (Tabs) */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-medium text-sm md:text-base transition-all duration-200 cursor-pointer border-none ${
                    isActive
                      ? "bg-[#1B6D77] text-white shadow-sm"
                      : "bg-white/80 hover:bg-white text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* قسم Today */}
          {todayList.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#1B6D77] mb-4 text-left">
                Today
              </h2>
              <div className="flex flex-col gap-4">
                {todayList.map((item) => (
                  <div
                    key={item.id}
                    className={`relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-5 flex items-start gap-4 border transition-all ${
                      item.hasBadge
                        ? "border-[#E5C158] ring-1 ring-[#E5C158]/50"
                        : "border-gray-300/60"
                    }`}
                  >
                    {/* النقطة الصفراء (Badge Indicator) */}
                    {item.hasBadge && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E5C158] rounded-full border-2 border-white shadow-sm" />
                    )}

                    {/* أيقونة الإشعار داخل دائرة */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F5EBE1] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>

                    {/* تفاصيل الإشعار */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base">
                          {item.title}
                        </h3>
                        <span className="text-xs text-gray-500 font-medium">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* قسم Yesterday */}
          {yesterdayList.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-[#1B6D77] mb-4 text-left">
                Yesterday
              </h2>
              <div className="flex flex-col gap-4">
                {yesterdayList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-5 flex items-start gap-4 border border-gray-300/60 transition-all"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F5EBE1] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base">
                          {item.title}
                        </h3>
                        <span className="text-xs text-gray-500 font-medium">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}





