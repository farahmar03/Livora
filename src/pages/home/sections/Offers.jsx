import React, { useRef, useState, useEffect } from "react";

import offer1 from "@/assets/offer1.png";
import offer2 from "@/assets/offer2.png";
import offer3 from "@/assets/offer3.png";
import offer4 from "@/assets/offer4.png";
import offer5 from "@/assets/offer5.png";
import offer6 from "@/assets/offer6.png";
import offer7 from "@/assets/offer7.png";
import offer8 from "@/assets/offer8.png";
import offer9 from "@/assets/offer9.png";
import offer10 from "@/assets/offer10.png";
import offer11 from "@/assets/offer11.png";
import offer12 from "@/assets/offer12.png";

const chairs = [
  { id: 1, alt: "مقعد مفرد 1", src: offer1 },
  { id: 2, alt: "مقعد مفرد 2", src: offer2 },
  { id: 3, alt: "مقعد مفرد 3", src: offer3 },
  { id: 4, alt: "مقعد مفرد 4", src: offer4 },
  { id: 5, alt: "مقعد مفرد 5", src: offer5 },
  { id: 6, alt: "مقعد مفرد 6", src: offer6 },
  { id: 7, alt: "مقعد مفرد 7", src: offer7 },
  { id: 8, alt: "مقعد مفرد 8", src: offer8 },
  { id: 9, alt: "مقعد مفرد 9", src: offer9 },
  { id: 10, alt: "مقعد مفرد 10", src: offer10 },
  { id: 11, alt: "مقعد مفرد 11", src: offer11 },
  { id: 12, alt: "مقعد مفرد 12", src: offer12 },
];

export default function Offers({ id = "offers", onNavigate }) {
  const trackRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e) => {
    isDown.current = true;
    setDragging(true);
    startX.current = e.pageX;
    scrollStart.current = trackRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDown.current = false;
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const walk = e.pageX - startX.current;
    trackRef.current.scrollLeft = scrollStart.current - walk;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const middleIndex = Math.floor(chairs.length / 2);
    const middleCard = track.children[middleIndex];
    if (middleCard) {
      const trackCenter = track.clientWidth / 2;
      const cardCenter = middleCard.offsetLeft + middleCard.clientWidth / 2;
      track.scrollLeft = cardCenter - trackCenter;
    }
  }, []);

  // ✅ دالة معالجة الضغط مع الحماية (مثل CategoriesSection)
  const handleViewAllClick = () => {
    if (onNavigate) {
      onNavigate("/offers");
    }
  };

  return (
    <section id={id} className="ellipse-section">
      <style>{`
        .ellipse-section {
          padding: 0;
          margin: 0;
          position: relative;
          background: var(--color-page);
        }

        .ellipse-section .container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .ellipse-section .title-wrapper {
          position: relative;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ellipse-section .bg-title {
          position: absolute;
          top: -160px;
          font-size: 180px;
          font-weight: bold;
          color: rgba(213, 140, 56, 0.25);
          filter: blur(4px);
          z-index: 0;
          margin: 0;
          user-select: none;
          white-space: nowrap;
          letter-spacing: 10px;
        }

        .ellipse-section .main-title {
          position: relative;
          z-index: 2;
          font-size: 50px;
          font-weight: bold;
          color: var(--color-orange);
          margin: 0;
          margin-top: -60px;
          letter-spacing: 6px;
        }

        .products-section {
          width: 100%;
          margin: 0 auto;
          margin-top: 90px;
        }

        .ellipse-section .track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          cursor: grab;
          user-select: none;
          padding: 10px calc(50% - 160px);
          scrollbar-width: none;
        }

        .ellipse-section .track.dragging {
          cursor: grabbing;
          scroll-snap-type: none;
          scroll-behavior: auto;
        }

        .ellipse-section .track::-webkit-scrollbar {
          display: none;
        }

        .ellipse-section .ca {
          flex: 0 0 auto;
          width: 320px;
          scroll-snap-align: center;
          scroll-snap-stop: always;
        }

        .ellipse-section .card {
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid transparent;
          pointer-events: none;
        }

        .ellipse-section .card img {
          object-fit: cover;
          object-position: center 130%;
          width: 100%;
          height: 300px;
          display: block;
          transition: transform 0.2s ease-in-out;
        }

        .ellipse-section .card:hover {
          border-color: #f3e5ab;
          box-shadow:
            0 12px 28px rgba(212, 175, 55, 0.3),
            0 4px 10px rgb(0, 0, 0);
        }

        .ellipse-section .card:hover img {
          transform: scale(1.1);
        }

        .ellipse-bottom {
          background: var(--color-page);
          height: 175px;
          position: relative;
          top: 150px;
          clip-path: ellipse(65% 100% at 50% 0%);
          z-index: 1;
        }

        .ellipse-section .ellipse-top {
          background: var(--color-page);
          height: 152px;
          position: relative;
          bottom: 100px;
          clip-path: ellipse(67% 100% at 50% 100%);
        }

        .ellipse-section .view-all-container {
          display: flex;
          justify-content: center;
          margin-top: -170px;
          margin-bottom: 0px; 
          padding-bottom: 80px; 
          position: relative;
          z-index: 2;
          background: var(--color-page);
        }

        .ellipse-section .view-all-btn {
          appearance: button;
          align-self: flex-start;
          border-radius: calc(infinity * 1px);
          background-color: var(--color-orange);
          padding-inline: calc(0.25rem * 8);
          padding-block: calc(0.25rem * 3);
          font-size: var(--text-base, 1rem);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--color-white, #fff);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
          padding: 12px 150px; 
          font-size: 21px;
        }

        .ellipse-section .view-all-btn:hover {
          filter: brightness(0.9);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
        }

        @media (min-width: 768px) and (max-width: 1200px) {
          .ellipse-bottom {
            background: var(--color-page);
            height: 190px;
            position: relative;
            top: 49px;
            clip-path: ellipse(79% 100% at 50% 0%);
            z-index: 1;
          }
          .ellipse-section .ellipse-top {
            background: var(--color-page);
            height: 100px;
            position: relative;
            bottom: 60px;
            clip-path: ellipse(70% 100% at 50% 100%);
          }
          .ellipse-section .ca {
            width: 320px;
          }
          .ellipse-section .track {
            padding: 10px calc(50% - 160px);
          }
          .ellipse-section .bg-title {
            font-size: 90px;
            top: -40px;
            letter-spacing: 4px;
          }
          .ellipse-section .main-title {
            font-size: 34px;
            margin-top: -20px;
          }
          .ellipse-section .view-all-btn {
            padding: 12px 90px;
            font-size: 19px;
          }
        }

        @media (max-width: 768px) {
          .ellipse-section {
            padding: 70px 0;
          }
          .ellipse-section .bg-title {
            font-size: 55px;
            top: -18px;
            letter-spacing: 2px;
            filter: blur(6px);
          }
          .ellipse-section .main-title {
            font-size: 26px;
            margin-top: -8px;
            letter-spacing: 3px;
          }
          .ellipse-section .ca {
            width: 260px;
          }
          .ellipse-section .card img {
            height: 250px;
            object-position: center 35%;
          }
          .ellipse-section .track {
            padding: 10px calc(50% - 130px);
            gap: 16px;
          }
          .ellipse-section .ellipse-top {
            display: none;
          }
          .ellipse-section .ellipse-bottom {
            display: none;
          }
          .ellipse-section .view-all-container {
            margin-top: 30px;
            padding-bottom: 30px;
          }
          .ellipse-section .view-all-btn {
            padding: 12px 60px;
          }
        }

        @media (max-width: 480px) {
          .ellipse-section .bg-title {
            font-size: 40px;
            top: -10px;
            letter-spacing: 2px;
          }
          .ellipse-section .main-title {
            font-size: 18px;
            margin-top: -4px;
          }
          .ellipse-section .ca {
            width: 220px;
          }
          .ellipse-section .card img {
            height: 210px;
          }
          .ellipse-section .track {
            padding: 10px calc(50% - 110px);
            gap: 12px;
          }
          .ellipse-section .view-all-btn {
            padding: 10px 40px;
            font-size: 16px;
          }
        }
      `}</style>

      <div className="ellipse-bottom">
        <div className="container title-wrapper">
          <h2 className="bg-title">Offers</h2>
          <span className="main-title">Offers</span>
        </div>
      </div>

      <div className="products-section">
        <div
          className={`track ${dragging ? "dragging" : ""}`}
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
          onMouseMove={handleMouseMove}
        >
          {chairs.map((chair) => (
            <div className="ca" key={chair.id}>
              <div className="card">
                <img src={chair.src} alt={chair.alt} draggable="false" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ellipse-top"></div>

      <div className="view-all-container">
        <button className="view-all-btn" onClick={handleViewAllClick}>
          View All
        </button>
      </div>
    </section>
  );
}