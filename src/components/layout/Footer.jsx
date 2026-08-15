import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-teal)] text-white pt-12 pb-6 px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* الجزء العلوي: الشعار وأيقونات التواصل */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-white">
            Livora
          </h2>

          {/* أيقونات التواصل الاجتماعي بدون تأثيرات */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white text-sm"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white text-sm"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white text-sm"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white text-sm"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white text-sm"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* خط الفاصل الأفقي الناعم والممتد تماماً مثل الصورة */}
        <hr className="border-white/40 my-6 w-full" />

        {/* الجزء الأوسط: القوائم (تم إضافة تأثير Zoom-In للعناوين والكلمات الداخلية فقط) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-4 items-start">
          
          {/* قسم Services */}
          <div>
            <h3 
              data-aos="zoom-in"
              data-aos-duration="800"
              className="text-[var(--color-orange)] text-lg md:text-xl font-bold mb-4"
            >
              Services
            </h3>
            <ul 
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="100"
              className="space-y-2.5 text-white text-sm md:text-base font-medium"
            >
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Buy Furniture
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Custom Furniture
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Furniture Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Moving Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Design Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* قسم Resources */}
          <div>
            <h3 
              data-aos="zoom-in"
              data-aos-duration="800"
              className="text-[var(--color-orange)] text-lg md:text-xl font-bold mb-4"
            >
              Resources
            </h3>
            <ul 
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="150"
              className="space-y-2.5 text-white text-sm md:text-base font-medium"
            >
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* قسم Company */}
          <div>
            <h3 
              data-aos="zoom-in"
              data-aos-duration="800"
              className="text-[var(--color-orange)] text-lg md:text-xl font-bold mb-4"
            >
              Company
            </h3>
            <ul 
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="200"
              className="space-y-2.5 text-white text-sm md:text-base font-medium"
            >
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Partners
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* الجزء السفلي: حقوق النشر */}
        <div className="text-center pt-8 text-xs md:text-sm text-white/90 font-medium">
          © Livora 2026 - All Rights Reserved
        </div>

      </div>
    </footer>
  );
}