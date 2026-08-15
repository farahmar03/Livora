import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase"; // تأكد من مسار ملف الـ supabase لديك
import ctaBg from "@/assets/CallToAction.png";

export default function CallToActionSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // التحقق من حالة تسجيل الدخول للمستخدم
  useEffect(() => {
    // جلب المستخدم الحالي
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // الاستماع لأي تغيرات في حالة المصادقة (دخول / خروج)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (user) {
      // إذا كان مسجل دخول، يذهب لاستكشاف الخدمات (أول خدمة مثلاً)
      navigate("/services/shop-furniture");
    } else {
      // إذا لم يكن مسجل دخول، يذهب لصفحة التسجيل
      navigate("/signup");
    }
  };

  return (
    <section className="w-full bg-[var(--color-page)] pt-32 p-0 m-0 overflow-hidden">
      {/* تم إزالة أي تأثير عن الصورة (الخلفية) */}
      <div
        className="w-full relative min-h-[360px] md:min-h-[480px] lg:min-h-[520px] flex items-start bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 pt-12 md:pt-16 pb-12 flex justify-start">
          
          {/* تأثير Zoom-in لكل شيء داخل الحاوية ما عدا خلفية الصورة */}
          <div 
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="max-w-md space-y-4 text-left bg-white/40 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none"
          >
            
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-gray-900 leading-tight tracking-tight">
              Your dream home is just <br />a{" "}
              <span className="text-[var(--color-orange)]">tap</span> away!
            </h2>

            <p className="text-base md:text-lg font-medium text-gray-700 leading-snug">
              Start using{" "}
              <span className="text-[var(--color-orange)] font-semibold">Livora</span>,
              start your furniture <br />
              journey today.
            </p>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleButtonClick}
                className="w-full max-w-[280px] h-[54px] bg-[var(--color-orange)] hover:opacity-90 text-white font-semibold text-base rounded-xl transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center"
                style={{
                  filter: "drop-shadow(0px 4px 4px rgba(213, 140, 56, 0.3))"
                }}
              >
                {user ? "Explore Services" : "Sign Up"}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}