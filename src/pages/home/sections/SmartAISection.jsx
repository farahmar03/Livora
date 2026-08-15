// src/pages/home/sections/SmartAISection.jsx
import React from 'react';
import aiSuggestedImg from "@/assets/ai-suggested.png"; 
import beforeImg from "@/assets/before-room.png";
import afterImg from "@/assets/after-room.png";

export default function SmartAISection({ onNavigate }) {
  const handleTryAI = () => {
    onNavigate("/ai-technology"); // يمرر المسار لدالة الحماية
  };

  return (
    <section id="features" className="relative w-full bg-[var(--color-page)] pt-32 pb-8">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-16 lg:gap-20">
        
        {/* الجزء الأول */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1 flex flex-col justify-center h-full md:-ml-4 lg:-ml-8 transition-all duration-300">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Powered By <span className="text-[var(--color-teal)]">Smart AI</span>
            </h2>
            <ul className="space-y-3 text-gray-700 text-base sm:text-lg font-medium">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-teal)] mt-1.5 text-xs">•</span>
                <span>Upload a photo of your room easily.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-teal)] mt-1.5 text-xs">•</span>
                <span>Our AI analyzes space and understands it.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-teal)] mt-1.5 text-xs">•</span>
                <span>Try furniture in your room by AR Technology.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-teal)] mt-1.5 text-xs">•</span>
                <span>Get instant price based on size, material.</span>
              </li>
            </ul>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end md:-translate-x-4 lg:-translate-x-8 transition-all duration-300">
            <img 
              src={aiSuggestedImg} 
              alt="AI Suggested Room" 
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="w-full max-w-[550px] h-auto object-contain rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* الجزء الثاني */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1 flex flex-col justify-center h-full md:-ml-4 lg:-ml-8 transition-all duration-300">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              See The <span className="text-[var(--color-teal)]">Transformation</span>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg font-medium mb-6">
              From empty space to your dream home.
            </p>
            <button 
              onClick={handleTryAI}
              className="self-start bg-[var(--color-orange)] hover:bg-[#c07a32] text-white font-semibold text-base px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Try AI Technology
            </button>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end relative w-full md:-translate-x-4 lg:-translate-x-8 transition-all duration-300">
            <div className="relative max-w-[550px] w-full">
              <div className="grid grid-cols-2 gap-4 w-full relative">
                <img 
                  src={beforeImg} 
                  alt="Empty Room Before" 
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  className="w-full h-auto object-contain rounded-2xl shadow-xl"
                />
                <img 
                  src={afterImg} 
                  alt="Furnished Room After" 
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  className="w-full h-auto object-contain rounded-2xl shadow-xl"
                />
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 z-10">
                <div className="bg-white/70 rounded-full p-2.5 flex items-center justify-center shadow-md">
                  <svg width="12" height="14" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                    <path d="M12.6312 8.49405V5.83496L0.000535727 -0.000266194V3.27743L8.97497 7.12757L8.87341 6.95215V7.37686L8.97497 7.20144L0.000535727 11.0516V14.3293L12.6312 8.49405Z" fill="var(--color-teal)" stroke="var(--color-teal)" strokeWidth="0.05"/>
                  </svg>
                </div>

                <div className="bg-white/60 rounded-full p-2.5 flex items-center justify-center shadow-md">
                  <svg width="12" height="14" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6312 8.49405V5.83496L0.000535727 -0.000266194V3.27743L8.97497 7.12757L8.87341 6.95215V7.37686L8.97497 7.20144L0.000535727 11.0516V14.3293L12.6312 8.49405Z" fill="var(--color-teal)" stroke="var(--color-teal)" strokeWidth="0.05"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}