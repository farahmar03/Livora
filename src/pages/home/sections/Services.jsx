import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Armchair, SprayCan, Truck } from "lucide-react";
import shopPhoto from "@/assets/service-shop.png";
import cleaningPhoto from "@/assets/service-cleaning.png";
import movingPhoto from "@/assets/service-moving.png";

const servicesData = [
  {
    icon: Armchair,
    label: "Shop Used Furniture",
    title: "Shop Furniture",
    description: "Shop furniture from trusted stores with easy delivery.",
    photo: shopPhoto,
    path: "/services/shop-furniture",        // المسار اللي بيفتح الكارت
  },
  {
    icon: SprayCan,
    label: "Furniture Cleaning",
    title: "Furniture Cleaning",
    description: "Book professional cleaning services in just a few clicks.",
    photo: cleaningPhoto,
    path: "/services/cleaning",
  },
  {
    icon: Truck,
    label: "Furniture Moving",
    title: "Furniture Moving",
    description: "Fast and safe furniture moving to your new home.",
    photo: movingPhoto,
    path: "/services/moving",
  },
];

export default function ServicesSection({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // دالة الضغط على الكرت (بتفحص حالة المستخدم)
  const handleCardClick = (path) => {
    if (user) {
      // إذا مسجل -> يروح للصفحة فوراً
      navigate(path);
    } else {
      // إذا مش مسجل -> يرسل المسار لـ HomePage عشان يفتح المودال
      onNavigate(path);
    }
  };

  return (
    <section id="services" className="w-full bg-[var(--color-page)] py-12 px-4 md:px-6">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-[var(--color-teal)] text-3xl font-bold mb-2">Our Services</h2>
        <p className="text-[var(--color-teal)] text-xl font-medium mb-10">
          One Platform, Endless Home Possibilities
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={service.label}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => handleCardClick(service.path)}
                className="relative h-48 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={service.photo}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* الطبقة التركوازية العلوية */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-[var(--color-teal)] to-[#14525a] 
                  flex flex-col items-center justify-center gap-3
                  transition-all duration-500 ease-in-out
                  ${isActive ? "opacity-0" : "opacity-100"}`}
                >
                  <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Icon className="text-[var(--color-teal)]" size={22} />
                  </span>
                  <p className="text-white font-semibold text-base text-center px-4">
                    {service.label}
                  </p>
                </div>

                {/* الطبقة البيضاء شفافة */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-white/60 p-4
                  transition-all duration-500 ease-in-out
                  ${isActive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="text-[var(--color-teal)]" size={18} />
                    <h3 className="text-[var(--color-teal)] font-bold text-base">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Armchair, SprayCan, Truck } from "lucide-react";
// import shopPhoto from "@/assets/service-shop.png";
// import cleaningPhoto from "@/assets/service-cleaning.png";
// import movingPhoto from "@/assets/service-moving.png";

// const servicesData = [
//   {
//     icon: Armchair,
//     label: "Shop Used Furniture",
//     title: "Shop Furniture",
//     description: "Shop furniture from trusted stores with easy delivery.",
//     photo: shopPhoto,
//     path: "/services/shop-furniture",
//   },
//   {
//     icon: SprayCan,
//     label: "Furniture Cleaning",
//     title: "Furniture Cleaning",
//     description: "Book professional cleaning services in just a few clicks.",
//     photo: cleaningPhoto,
//     path: "/services/cleaning",
//   },
//   {
//     icon: Truck,
//     label: "Furniture Moving",
//     title: "Furniture Moving",
//     description: "Fast and safe furniture moving to your new home.",
//     photo: movingPhoto,
//     path: "/services/moving",
//   },
// ];

// function Services() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const navigate = useNavigate();

//   const handleCardClick = (path) => {
//     if (path && path !== "#") {
//       navigate(path);
//     }
//   };

//   return (
//     <section className="relative">
      
//       <h2 className="text-3xl font-bold text-[#1B6D77] mb-2">Our Services</h2>
//       <p className="text-xl text-gray-800 mb-10">
//         One Platform, Endless Home Possibilities
//       </p>

//       <div className="grid grid-cols-3 gap-6">
//         {servicesData.map((service, index) => {
//           const Icon = service.icon;
//           const isActive = index === activeIndex;

//           return (
//             <div
//               key={service.label}
//               onMouseEnter={() => setActiveIndex(index)}
//               onMouseLeave={() => setActiveIndex(null)}
//               onClick={() => handleCardClick(service.path)}
//               className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500"
//             >
//               <img
//                 src={service.photo}
//                 alt={service.title}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />

//               <div
//                 className={`absolute inset-0 bg-gradient-to-b from-[#1B6D77] to-[#155a63] 
//                 flex flex-col items-center justify-center gap-3
//                 transition-all duration-500 ease-in-out
//                 ${isActive ? "opacity-0" : "opacity-100"}`}
//               >
//                 <span
//                   className={`w-12 h-12 rounded-full bg-white flex items-center justify-center 
//                   transition-all duration-500 ${isActive ? "translate-y-4" : "translate-y-0"}`}
//                 >
//                   <Icon className="text-[#1B6D77]" size={22} />
//                 </span>
//                 <p className="text-white font-semibold text-base text-center px-4">
//                   {service.label}
//                 </p>
//               </div>

//               <div
//                 className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4
//                 transition-all duration-500 ease-in-out
//                 ${isActive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
//               >
//                 <div className="flex items-center gap-2 mb-1">
//                   <Icon className="text-[#1B6D77]" size={18} />
//                   <h3 className="text-[#1B6D77] font-bold text-base">
//                     {service.title}
//                   </h3>
//                 </div>
//                 <p className="text-gray-600 text-sm">{service.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default Services;