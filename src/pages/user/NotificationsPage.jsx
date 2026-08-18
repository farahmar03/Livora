import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faBell,
  faConciergeBell,
} from "@fortawesome/free-solid-svg-icons";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]);

  const filterTabs = ["All", "Orders", "Offers", "Services"];

  useEffect(() => {
    // جلب الإشعارات المخزنة
    const stored = JSON.parse(
      localStorage.getItem("app_notifications") || "[]",
    );

    // إضافة الأيقونات المناسبة حسب نوع الإشعار
    const mapped = stored.map((item) => ({
      ...item,
      icon: (
        <FontAwesomeIcon
          icon={item.type === "Services" ? faConciergeBell : faTruck}
          className="text-[#1B6D77] text-xl md:text-2xl"
        />
      ),
    }));

    setNotifications(mapped);

    // تصفير عداد الإشعارات غير المقروءة وتنبيّه Navbar
    localStorage.setItem("unread_notifications_count", "0");
    window.dispatchEvent(new Event("notifications_updated"));
  }, []);

  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter((item) => item.type === activeTab);

  const todayList = filteredNotifications.filter(
    (item) => item.section === "Today",
  );
  const yesterdayList = filteredNotifications.filter(
    (item) => item.section === "Yesterday",
  );

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1B6D77] mb-6 text-left">
            Notifications
          </h1>

          {/* أزرار التصفية (Filter Tabs) */}
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

          {filteredNotifications.length === 0 ? (
            <div className="bg-white/70 rounded-2xl p-8 text-center text-gray-500 font-medium border border-gray-200">
              <FontAwesomeIcon
                icon={faBell}
                className="text-4xl text-[#1B6D77]/40 mb-3"
              />
              <p>No notifications yet.</p>
            </div>
          ) : (
            <>
              {/* قسم إشعارات اليوم */}
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
                        {item.hasBadge && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E5C158] rounded-full border-2 border-white shadow-sm" />
                        )}

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

              {/* قسم إشعارات الأمس */}
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}