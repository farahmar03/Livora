import React, { useState, useEffect } from "react";
import { SlidersHorizontal, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/common/ProductCard";
import { supabase } from "@/services/supabase";

// استيراد الصور الثابتة
import chairImg1 from "@/assets/chair0.jpg";
import chairImg2 from "@/assets/chair1.jpg";
import sofa1 from "@/assets/sofa1.jpg";
import sofa2 from "@/assets/sofa2.jpg";
import sofa3 from "@/assets/sofa3.jpg";
import bed1 from "@/assets/bed1.jpg";
import bed2 from "@/assets/bed2.jpg";
import bed3 from "@/assets/bed3.jpg";
import tealChairImg from "@/assets/chair2.png";
import grayChairImg from "@/assets/gray-chair1.png";
import orangeChairImg from "@/assets/orang-chair2.png";

const imageMap = {
  "chair0.jpg": chairImg1, "chair1.jpg": chairImg2,
  "sofa1.jpg": sofa1, "sofa2.jpg": sofa2, "sofa3.jpg": sofa3,
  "bed1.jpg": bed1, "bed2.jpg": bed2, "bed3.jpg": bed3
};

const sampleChairProduct = {
  id: "sample-chair-1",
  originalId: "sample-chair-1",
  name: "Nordic OAK Chair",
  title: "Nordic OAK Chair",
  subtitle: "Emerald Green / Linen",
  material: "Emerald Green / Linen",
  price: 1250,
  oldPrice: 1500,
  discount: "16% OFF",
  rating: 4.9,
  category: "Chairs",
  condition: "Excellent Condition",
  usedDuration: "Used 1 Month",
  image: tealChairImg,
  colors: [
    { name: "Teal", hex: "#1D8B96", image: tealChairImg },
    { name: "Gray", hex: "#A8B2C1", image: grayChairImg },
    { name: "Orange", hex: "#C77D24", image: orangeChairImg },
  ],
};

export default function FurnitureProducts() {
  const [filterBy, setFilterBy] = useState("Category");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productsData, setProductsData] = useState([sampleChairProduct]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      // جلب المنتجات المخصصة للمتجر (والتي تكون معرفة بـ sofas, chairs, beds الخاصة بالمتجر)
      const { data, error } = await supabase.from("services").select("*");
      if (!error && data) {
        // تصفية المنتجات لتقتصر على الـ 3 صور لكل فئة الخاصة بالمتجر (مثلاً عبر التأكد من وجودها في imageMap أو تحديدها)
        const shopItems = data.filter(item => imageMap[item.image_url]);

        const formatted = shopItems.map(item => {
          const categoryMap = { "chairs": "Chairs", "sofas": "Sofas", "beds": "Beds" };
          const conditionMap = { "chairs": "Good Condition", "sofas": "Excellent Condition", "beds": "Fair Condition" };

          return {
            ...item,
            category: categoryMap[item.service_type] || "Chairs",
            condition: conditionMap[item.service_type] || "Good Condition",
            image: imageMap[item.image_url] || chairImg1,
            colors: [{ name: "Default", hex: "#1B6D77", image: imageMap[item.image_url] || chairImg1 }]
          };
        });
        setProductsData([sampleChairProduct, ...formatted]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const getGroupedProducts = () => {
    if (filterBy === "Category") {
      return ["Sofas", "Chairs", "Beds"].map((cat) => ({
        title: cat,
        items: productsData.filter((item) => item.category === cat),
      }));
    } else if (filterBy === "Condition") {
      return ["Excellent Condition", "Good Condition", "Fair Condition"].map((cond) => ({
        title: cond,
        items: productsData.filter((item) => item.condition === cond),
      }));
    } else {
      return [{
        title: "All Products (Sorted by Price)",
        items: [...productsData].sort((a, b) => a.price - b.price),
      }];
    }
  };

  const groupedData = getGroupedProducts();

  return (
    <div className="bg-[#F8F6F0] min-h-screen flex flex-col pb-16">
      <Navbar />
      <main className="max-w-[1250px] mx-auto w-full px-6 pt-8 flex-1">
        <div className="flex items-center justify-between mb-8 relative">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1B6D77] mb-1">Shop Used Furniture</h1>
            <p className="text-gray-600 text-sm font-medium">Browse quality pre-owned furniture for your home.</p>
          </div>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`p-2.5 rounded-xl transition-all shadow-md ${isFilterOpen ? "bg-[#1B6D77] text-white" : "bg-transparent text-[#1B6D77]"}`}>
            <SlidersHorizontal size={20} />
          </button>
          {isFilterOpen && (
            <div className="absolute right-0 top-14 z-50 w-64 bg-[#F5ECE0] border border-[#E3D4C1] rounded-2xl p-4 shadow-xl">
              <h3 className="font-bold text-black text-base mb-3">Filter according to:</h3>
              <div className="space-y-2">
                {["Category", "Condition", "Price"].map((type) => (
                  <button key={type} onClick={() => { setFilterBy(type); setIsFilterOpen(false); }} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm ${filterBy === type ? "bg-white text-[#1B6D77] font-bold" : "bg-white/80 text-gray-700"}`}>
                    <span>{type}</span>
                    {filterBy === type && <CheckCircle2 size={18} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {loading ? <div className="text-center">Loading...</div> : (
          <div className="space-y-12">
            {groupedData.map((group, idx) => (
              <div key={idx}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{group.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
                  {group.items.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}