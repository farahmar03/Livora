import laptopMockup from "@/assets/labtop.png";

export default function DiscountBannerSection({ onNavigate }) {
  const handleShopNow = () => {
    // استخدام النظام الموحد للحماية
    onNavigate("/offers");
  };

  return (
    <section className="w-full bg-[var(--color-page)] pt-40 pb-8 overflow-visible relative">
      
      <div 
        className="w-full bg-[var(--color-card)] py-6 md:py-8 relative overflow-visible shadow-sm"
      >
        
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center relative">
          
          <div 
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-delay="200"
            className="z-10 text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start md:-ml-6 lg:-ml-12 transition-all duration-300"
          >
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-[var(--color-orange)] mb-1 md:mb-2 leading-tight whitespace-nowrap">
              Get Discount Up to 50% Off Today!
            </h2>
            
            <p className="text-gray-700 text-xs md:text-sm mb-3 md:mb-4 max-w-md mx-auto md:mx-0">
              Every new membership will get 50% discount on their first product
            </p>
            
            {/* ✅ الزر المعدل */}
            <button 
              onClick={handleShopNow}
              className="w-full max-w-[210px] md:max-w-[270px] bg-[var(--color-orange)] hover:bg-[#B86A2A] text-white font-semibold py-2 md:py-2.5 rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300 text-sm"
            >
              Shop Now
            </button>
          </div>

          <div 
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="300"
            className="relative flex justify-center md:justify-end order-1 md:order-2 h-[120px] md:h-[160px]"
          >
            <div className="absolute -bottom-4 right-6 md:right-20 w-40 md:w-56 h-4 md:h-6 bg-black/15 rounded-full blur-xl"></div>
            
            <img
              src={laptopMockup}
              alt="Laptop Discount"
              className="absolute -bottom-12 md:-bottom-16 right-0 md:right-10 lg:right-12 w-[220px] md:w-[280px] lg:w-[340px] rotate-[-3deg] drop-shadow-2xl object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
}