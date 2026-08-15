import Navbar from "@/components/layout/Navbar";
import heroImage from "@/assets/hero.png";
import livoraText from "@/assets/logo-text.png";
import { HashLink } from "react-router-hash-link";

function Hero() {
  return (
    <div id="hero" className="relative w-full bg-[#FBF3E8] overflow-hidden">
      
      {/* الصورة الخلفية بدون أي تأثيرات حركية */}
      <img
        src={heroImage}
        alt="Hero Background"
        className="w-full h-auto object-contain block pointer-events-none"
      />

      {/* النافبار فوق الصورة */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar transparent={true} />
      </div>

      {/* النص والزر فوق الصورة مع تأثيرات دخول متتابعة (Staggered) */}
      <div className="absolute top-[24%] left-[7%] z-10 max-w-[48%] flex flex-col items-start gap-2 sm:gap-4">
        
        {/* صورة اللوجو/النص تنزلق من الأعلى وتكبر بسلاسة */}
        <img 
          src={livoraText} 
          alt="Livora" 
          data-aos="zoom-out-right"
          data-aos-delay="200"
          data-aos-duration="1000"
          className="w-[95%] max-w-[450px] h-auto object-contain" 
        />
        
        {/* النص الوصفي ينزلق من اليسار */}
        <p 
          data-aos="fade-right"
          data-aos-delay="400"
          data-aos-duration="900"
          className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 leading-snug"
        >
          Everything your home needs, <br />
          <span className="text-orange">all in one place.</span>
        </p>

        {/* زر اكتشاف الفئات مع أنيميشن ظهور واستجابة عند اللمس */}
        <div 
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="800"
          className="mt-2 sm:mt-4"
        >
          <HashLink
            smooth
            to="/#CategoriesSection"
            className="inline-block px-5 py-2 sm:px-7 sm:py-3 rounded-full bg-[var(--color-teal)] text-white text-xs sm:text-base font-medium shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Explore Services
          </HashLink>
        </div>

      </div>
    </div>
  );
}

export default Hero;