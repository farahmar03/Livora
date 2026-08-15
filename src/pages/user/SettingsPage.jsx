import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  FiKey,
  FiCreditCard,
  FiBell,
  FiMail,
  FiMoon,
  FiGlobe,
  FiLock,
  FiPhoneCall,
  FiChevronRight,
} from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [phoneNotifications, setPhoneNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // دالة الخروج المطابقة لسلوك النافبار
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-[#1B6D77] mb-6 text-left">
            Settings
          </h1>

          <div className="flex flex-col gap-5">
            {/* 1️⃣ Account Section */}
            <div className="bg-white/50 backdrop-blur-sm border border-[#EBE3D9] rounded-2xl p-6 shadow-sm">
              <h2 className="text-[#1B6D77] font-bold text-base mb-4">
                Account
              </h2>
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => navigate("/change-password")}
                  className="flex items-center justify-between py-2.5 w-full text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 text-gray-700 font-medium text-sm">
                    <FiKey size={18} className="text-[#1B6D77]" />
                    <span>Change Password</span>
                  </div>
                  <FiChevronRight size={18} className="text-gray-400 group-hover:text-[#1B6D77] transition-colors" />
                </button>

                <div className="ml-8 my-1 border-b border-gray-200/80" />

                <button
                  type="button"
                  onClick={() => navigate("/payment")}
                  className="flex items-center justify-between py-2.5 w-full text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 text-gray-700 font-medium text-sm">
                    <FiCreditCard size={18} className="text-[#1B6D77]" />
                    <span>Payment</span>
                  </div>
                  <FiChevronRight size={18} className="text-gray-400 group-hover:text-[#1B6D77] transition-colors" />
                </button>
              </div>
            </div>

            {/* 2️⃣ Notifications Section */}
            <div className="bg-white/50 backdrop-blur-sm border border-[#EBE3D9] rounded-2xl p-6 shadow-sm">
              <h2 className="text-[#1B6D77] font-bold text-base mb-4">
                Notifications
              </h2>
              <div className="flex flex-col">
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3.5 text-gray-700 font-medium text-sm">
                    <FiBell size={18} className="text-[#1B6D77]" />
                    <span>Phone Notifications</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPhoneNotifications((prev) => !prev)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative cursor-pointer ${
                      phoneNotifications ? "bg-[#1B6D77]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        phoneNotifications ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="ml-8 my-1 border-b border-gray-200/80" />

                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3.5 text-gray-700 font-medium text-sm">
                    <FiMail size={18} className="text-[#1B6D77]" />
                    <span>Email Notifications</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailNotifications((prev) => !prev)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative cursor-pointer ${
                      emailNotifications ? "bg-[#1B6D77]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        emailNotifications ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 3️⃣ Appearance & Language Section */}
            <div className="bg-white/50 backdrop-blur-sm border border-[#EBE3D9] rounded-2xl p-6 shadow-sm">
              <h2 className="text-[#1B6D77] font-bold text-base mb-4">
                Appearance & Language
              </h2>
              <div className="flex flex-col">
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3.5 text-gray-700 font-medium text-sm">
                    <FiMoon size={18} className="text-[#1B6D77]" />
                    <span>Dark Mood</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDarkMode((prev) => !prev)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative cursor-pointer ${
                      darkMode ? "bg-[#1B6D77]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        darkMode ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="ml-8 my-1 border-b border-gray-200/80" />

                <button
                  type="button"
                  onClick={() => navigate("/language")}
                  className="flex items-center justify-between py-2.5 w-full text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 text-gray-700 font-medium text-sm">
                    <FiGlobe size={18} className="text-[#1B6D77]" />
                    <span>Language</span>
                  </div>
                  <FiChevronRight size={18} className="text-gray-400 group-hover:text-[#1B6D77] transition-colors" />
                </button>
              </div>
            </div>

            {/* 4️⃣ Privacy & Support Section */}
            <div className="bg-white/50 backdrop-blur-sm border border-[#EBE3D9] rounded-2xl p-6 shadow-sm">
              <h2 className="text-[#1B6D77] font-bold text-base mb-4">
                Privacy & Support
              </h2>
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => navigate("/privacy")}
                  className="flex items-center justify-between py-2.5 w-full text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 text-gray-700 font-medium text-sm">
                    <FiLock size={18} className="text-[#1B6D77]" />
                    <span>Privacy Setting</span>
                  </div>
                  <FiChevronRight size={18} className="text-gray-400 group-hover:text-[#1B6D77] transition-colors" />
                </button>

                <div className="ml-8 my-1 border-b border-gray-200/80" />

                <button
                  type="button"
                  onClick={() => navigate("/help")}
                  className="flex items-center justify-between py-2.5 w-full text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 text-gray-700 font-medium text-sm">
                    <FiPhoneCall size={18} className="text-[#1B6D77]" />
                    <span>Get Help</span>
                  </div>
                  <FiChevronRight size={18} className="text-gray-400 group-hover:text-[#1B6D77] transition-colors" />
                </button>
              </div>
            </div>

            {/* Log Out Button */}
            <div className="flex justify-center w-full mt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="w-72 md:w-80 py-3 rounded-2xl bg-[#D98832] hover:bg-[#c47728] text-white font-bold text-base transition-colors shadow-sm cursor-pointer text-center"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





