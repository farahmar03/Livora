import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeadset, 
  faShieldHalved, 
  faLock, 
  faTruck 
} from "@fortawesome/free-solid-svg-icons";
import groupWhyImg from "@/assets/phone-showcase.png";

const features = [
  {
    icon: faHeadset,
    title: "24/7 Support",
    desc: "We're here to\nhelp anytime",
  },
  {
    icon: faShieldHalved,
    title: "Trusted Stores",
    desc: "Verified sellers and\nquality products",
  },
  {
    icon: faLock,
    title: "Secure Payments",
    desc: "100% safe and\nsecure checkout",
  },
  {
    icon: faTruck,
    title: "Easy Tracking",
    desc: "Track your orders\nin real-time",
  },
];

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "2K+", label: "Partner Stores" },
  { number: "100K+", label: "Products" },
  { number: "25+", label: "Cities Served" },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative w-full bg-[var(--color-page)] pt-32 pb-12 px-4 md:px-6 overflow-hidden">
      
      {/* صورة الهاتف الجانبية مع تأثير الظهور من اليسار */}
      <div 
        data-aos="fade-right"
        data-aos-duration="1000"
        className="absolute left-0 top-[60%] -translate-y-1/2 pointer-events-none z-0"
      >
        <img
          src={groupWhyImg}
          alt="Why Choose Livora"
          className="max-w-[310px] md:max-w-[380px] lg:max-w-[430px] object-contain transition-all duration-300"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* تم إزالة تأثير الأنيميشن من العنوان */}
        <h2 
          className="text-3xl font-bold text-left mb-10 text-gray-900"
        >
          Why Choose <span className="text-[var(--color-teal)]">Livora</span>?
        </h2>

        {/* إزاحة المحتوى الداخلي لليمين لمنع أي تداخل مع الصورة */}
        <div className="lg:pl-36 xl:pl-44 transition-all duration-300">
          
          {/* شبكة المميزات مع ظهور متسلسل للبطاقات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
            {features.map((item, index) => {
              return (
                <div
                  key={item.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  data-aos-duration="800"
                  className={`flex flex-col items-center px-4 py-2 ${
                    index !== features.length - 1 ? "md:border-r md:border-[#d9dbd7]" : ""
                  }`}
                >
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className="text-[var(--color-teal)] hover:text-[#D58C38] transition-colors duration-300 mb-3 text-4xl sm:text-5xl cursor-pointer" 
                  />
                  
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{item.title}</h3>
                  
                  <p className="text-gray-700 text-base font-medium leading-snug whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* شريط الإحصائيات بدون تأثير Zoom ككل، ولكن بداخلة تأثيرات للعناصر */}
          <div 
            className="bg-[var(--color-teal)] text-white rounded-2xl py-8 px-4 grid grid-cols-2 md:grid-cols-4 text-center gap-6 shadow-md"
          >
            {stats.map((stat, idx) => (
              <div 
                key={stat.label} 
                data-aos="fade-up" 
                data-aos-delay={300 + idx * 100}
                className="group cursor-pointer"
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 transition-transform duration-300 group-hover:-translate-y-2 inline-block">
                  {stat.number}
                </h2>
                <p className="text-white/80 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}