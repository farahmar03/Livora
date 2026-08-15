import React from 'react';
import whoAreWeImg from "@/assets/Group 6356425.png"; 

const AboutSection = () => {
  return (
    <div className="relative w-full min-h-[650px] md:min-h-[750px] overflow-hidden bg-[rgba(27,109,119,1)]">
      
      {/* الصورة مكبرة ومحاذية لليمين بدون أي تأثيرات حركية */}
      <img
        src={whoAreWeImg}
        alt="Livora application experience"
        className="absolute inset-0 w-full h-full object-contain object-right scale-118 origin-right pointer-events-none z-0"
      />

      {/* حاوية النص */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pl-2 sm:pl-4 md:pl-6 pr-6 pt-[60px] md:pt-[90px] pb-12 text-white ltr">
        <div className="max-w-[480px] sm:max-w-[520px] space-y-7">
          
          {/* العنوان مع علامة الاستفهام وتأثير الانزلاق من اليسار */}
          <h2 
            data-aos="fade-right"
            data-aos-duration="900"
            className="flex items-center gap-3 text-[clamp(28px,3.5vw,42px)] font-bold mb-7"
          >
            <span className="leading-tight">Who Are We</span>
            <span 
              data-aos="zoom-in"
              data-aos-delay="300"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-[rgba(27,109,119,1)] text-2xl sm:text-3xl font-extrabold cursor-pointer hover:scale-110 transition-transform duration-300 shadow-md shrink-0"
            >
              ?
            </span>
          </h2>

          {/* النص الوصفي مع تأثير Fade-up بعد العنوان */}
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            className="text-[clamp(19px,2.1vw,25px)] leading-[1.48] font-normal tracking-wide drop-shadow-sm"
          >
            Livora, a smart destination<br /> 
            which connect
            you with <br /> multiple
            stores to browse
            a<br /> wide range
            of ready-made<br /> pieces,
            while leveraging<br /> advanced
            AI to bring
            your<br /> unique, custom-made
            furniture<br /> designs to
            life. Beyond buying,<br />
            Livora supports your
            journey<br /> from start
            to finish with
            reliable,<br /> high-quality furniture
            moving<br /> and cleaning
            services.<br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;