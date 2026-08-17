import React from "react";
import whoAreWeImg from "@/assets/Group 6356425.png";

const WhoAreWe = () => {
  return (
    <div className="relative w-full min-h-[420px] sm:min-h-[520px] md:min-h-[750px] overflow-hidden bg-[rgba(27,109,119,1)]">
      {/* الصورة مكبرة ومحاذية لليمين بدون أي تأثيرات حركية */}
      <img
        src={whoAreWeImg}
        alt="Livora application experience"
        className="absolute inset-0 w-full h-full object-contain object-right scale-100 sm:scale-105 md:scale-118 origin-right pointer-events-none z-0"
      />

      {/* حاوية النص */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pl-2 sm:pl-4 md:pl-6 pr-6 pt-[40px] sm:pt-[55px] md:pt-[90px] pb-12 text-white ltr">
        <div className="max-w-[300px] sm:max-w-[420px] md:max-w-[520px] space-y-5 sm:space-y-6 md:space-y-7">
          {/* العنوان مع علامة الاستفهام وتأثير الانزلاق من اليسار */}
          <h2
            data-aos="fade-right"
            data-aos-duration="900"
            className="flex items-center gap-3 text-[clamp(24px,3.5vw,42px)] font-bold mb-5 md:mb-7"
          >
            <span className="leading-tight">Who Are We</span>
            <span
              data-aos="zoom-in"
              data-aos-delay="300"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-[rgba(27,109,119,1)] text-xl sm:text-2xl md:text-3xl font-extrabold cursor-pointer hover:scale-110 transition-transform duration-300 shadow-md shrink-0"
            >
              ?
            </span>
          </h2>

          {/* النص الوصفي مع تأثير Fade-up بعد العنوان */}
          {/* على الشاشات الصغيرة (أصغر من md) بيلف النص طبيعي بدون الفواصل اليدوية، وعلى md فما فوق نفس شكل الديسكتوب الأصلي بدون أي تغيير */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            className="text-[clamp(17px,2.1vw,25px)] leading-[1.5] md:leading-[1.48] font-normal tracking-wide drop-shadow-sm"
          >
            Livora, a smart destination
            <br className="hidden md:block" />
            which connect you with <br className="hidden md:block" /> multiple
            stores to browse a<br className="hidden md:block" /> wide range of
            ready-made
            <br className="hidden md:block" /> pieces, while leveraging
            <br className="hidden md:block" /> advanced AI to bring your
            <br className="hidden md:block" /> unique, custom-made furniture
            <br className="hidden md:block" /> designs to life. Beyond buying,
            <br className="hidden md:block" />
            Livora supports your journey
            <br className="hidden md:block" /> from start to finish with
            reliable,
            <br className="hidden md:block" /> high-quality furniture moving
            <br className="hidden md:block" /> and cleaning services.
            <br className="hidden md:block" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
