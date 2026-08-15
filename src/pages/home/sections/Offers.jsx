import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  { img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800" },
  { img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800" },
  { img: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800" },
  { img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800" },
  { img: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800" },
  { img: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800" },
];

// أقصى زاوية ميلان وأقصى ارتفاع/هبوط للكروت الطرفية
const MAX_ROTATE = 20; // درجة
const MAX_TRANSLATE_Y = 80; // بكسل

export default function OffersSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // بيحسب ويطبق التحويل (rotate + translateY) على كل سلايد حسب بعده عن المنتصف
  const applyArcTransform = (swiper) => {
    swiper.slides.forEach((slideEl, index) => {
      const progress = swiper.slides[index].progress;
      const clamped = Math.max(-1, Math.min(1, progress));

      const rotate = clamped * MAX_ROTATE;
      const translateY = Math.abs(clamped) * MAX_TRANSLATE_Y;
      const scale = 1 - Math.abs(clamped) * 0.12;

      slideEl.style.transform = `rotate(${rotate}deg) translateY(${translateY}px) scale(${scale})`;
      slideEl.style.transition = "transform 0.3s ease";
      slideEl.style.zIndex = 100 - Math.abs(Math.round(clamped * 10));
    });
  };

  useEffect(() => {
    if (swiperRef.current) {
      applyArcTransform(swiperRef.current);
    }
  }, []);

  return (
    <section id="offers"
      style={{
        position: "relative",
        width: "100%",
        padding: "70px 0 60px",
        background: "#F4EBDD",
        overflow: "hidden",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        textAlign: "center",
      }}
    >
      {/* الكلمة الشفافة بالخلفية */}
      <h1
        style={{
          position: "absolute",
          top: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(80px, 14vw, 220px)",
          fontWeight: 800,
          color: "#E8C79A",
          opacity: 0.35,
          margin: 0,
          letterSpacing: "4px",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Offers
      </h1>

      {/* العنوان الأساسي */}
      <h2
        style={{
          position: "relative",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800,
          color: "#D98E3D",
          margin: "40px 0 60px",
          zIndex: 2,
        }}
      >
        Offers
      </h2>

      {/* السلايدر */}
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onInit={(swiper) => applyArcTransform(swiper)}
        onProgress={(swiper) => applyArcTransform(swiper)}
        onSetTransition={(swiper, duration) => {
          swiper.slides.forEach((slideEl) => {
            slideEl.style.transition = `transform ${duration}ms ease`;
          });
        }}
        onResize={(swiper) => applyArcTransform(swiper)}
        watchSlidesProgress={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={20}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        style={{ padding: "40px 0 20px", overflow: "visible" }}
      >
        {products.map((p, i) => (
          <SwiperSlide
            key={i}
            style={{
              width: "310px",
              height: "300px",
              transformOrigin: "center bottom",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
            >
              {/* شارة الخصم */}
              <span
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "0",
                  background: "#E4341F",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: "0 20px 20px 0",
                  zIndex: 3,
                }}
              >
                Discount 10%
              </span>

              <img
                src={p.img}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* زر عرض الكل */}
      <button
        style={{
          marginTop: "50px",
          background: "#D98E3D",
          color: "#fff",
          fontWeight: 700,
          fontSize: "18px",
          border: "none",
          borderRadius: "30px",
          padding: "16px 60px",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(217,142,61,0.35)",
        }}
      >
        View All
      </button>

      {/* أزرار التنقل */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "2px",
        }}
      >
        <button ref={prevRef} style={navBtnStyle("left")} aria-label="previous">
          ‹
        </button>
        <button ref={nextRef} style={navBtnStyle("right")} aria-label="next">
          ›
        </button>
      </div>
    </section>
  );
}

const navBtnStyle = (side) => ({
  width: "44px",
  height: "40px",
  background: "#2B2B2B",
  color: "#fff",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  borderRadius: side === "left" ? "8px 0 0 8px" : "0 8px 8px 0",
});