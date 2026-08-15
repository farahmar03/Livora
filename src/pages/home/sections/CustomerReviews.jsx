import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

import pic1 from "@/assets/picc1.png";
import pic2 from "@/assets/picc2.png";
import pic3 from "@/assets/picc3.png";
import pic4 from "@/assets/picc4.png";
import pic5 from "@/assets/picc5.png";

export default function CustomerReviewsSection() {
  const initialCustomers = [
    {
      id: 1,
      img: pic5,
      name: "Adam M.",
      job: "Customer",
      review: "Amazing service and\nvery fast delivery."
    },
    {
      id: 2,
      img: pic4,
      name: "Omar S.",
      job: "HomeOwner",
      review: "The furniture quality was\nexcellent."
    },
    {
      id: 3,
      img: pic1,
      name: "Noura A.",
      job: "HomeOwner",
      review: "Fast delivery, great quality, and the\ncleaning service is top-notch."
    },
    {
      id: 4,
      img: pic2,
      name: "Sara H.",
      job: "Designer",
      review: "Beautiful furniture and\nvery helpful support."
    },
    {
      id: 5,
      img: pic3,
      name: "Lina K.",
      job: "Architect",
      review: "The app made shopping\nso easy."
    }
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const activeCustomer = customers[2];

  const [fade, setFade] = useState(true);
  const [displayedCustomer, setDisplayedCustomer] = useState(activeCustomer);

  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => {
      setDisplayedCustomer(activeCustomer);
      setFade(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [activeCustomer]);

  const handlePrev = () => {
    setCustomers(prev => {
      const newArr = [...prev];
      const last = newArr.pop();
      newArr.unshift(last);
      return newArr;
    });
  };

  const handleNext = () => {
    setCustomers(prev => {
      const newArr = [...prev];
      const first = newArr.shift();
      newArr.push(first);
      return newArr;
    });
  };

  return (
    <section className="relative w-full bg-[var(--color-page)] pt-16 sm:pt-24 md:pt-32 pb-8 scroll-mt-20" id="reviews">
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="w-full max-w-6xl mx-auto bg-[var(--color-card)] rounded-[32px] sm:rounded-[48px] md:rounded-[60px] p-5 sm:p-8 md:p-14 relative shadow-sm">
          
          <h2 
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-gray-900 mb-6 sm:mb-8 md:mb-12"
          >
            What Our Customers Say
          </h2>

          <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-12 mb-6 md:mb-10 w-full overflow-hidden">
            
            <button 
              type="button"
              onClick={handlePrev}
              className="bg-[var(--color-teal)] text-white p-2 sm:p-3 md:p-3.5 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 cursor-pointer border-none"
              aria-label="Previous Review"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </button>

            {customers.map((customer, index) => {
              let sizeClass = "hidden md:block w-16 h-16 md:w-20 md:h-20 opacity-60";
              
              if (index === 1 || index === 3) {
                sizeClass = "w-14 h-14 sm:w-20 sm:h-20 md:w-30 md:h-30 opacity-80 sm:opacity-90";
              } else if (index === 2) {
                sizeClass = "w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 opacity-100 ring-2 ring-[var(--color-teal)]/20";
              }

              return (
                <div key={customer.id} className="flex-shrink-0 transition-all duration-300">
                  <img 
                    src={customer.img} 
                    alt={customer.name}
                    className={`${sizeClass} rounded-full object-cover shadow-md`}
                  />
                </div>
              );
            })}

            <button 
              type="button"
              onClick={handleNext}
              className="bg-[var(--color-teal)] text-white p-2 sm:p-3 md:p-3.5 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 cursor-pointer border-none"
              aria-label="Next Review"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </button>

          </div>

          <div className="text-center mt-2 space-y-1.5 min-h-[140px] md:min-h-[160px] flex flex-col justify-center items-center px-2">
            <div 
              className={`transition-all duration-500 ease-in-out ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-[var(--color-teal)]">
                {displayedCustomer.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-xl font-medium">
                {displayedCustomer.job}
              </p>
              
              <div className="flex justify-center gap-1 sm:gap-1.5 py-1.5 md:py-2 text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="max-w-3xl mx-auto text-gray-800 text-base sm:text-xl md:text-[26px] leading-snug md:leading-normal mt-2 md:mt-3 font-medium whitespace-pre-line">
                “{displayedCustomer.review}”
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}