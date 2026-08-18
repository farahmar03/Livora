// src/pages/home/HomePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/common/AuthModal";

import Hero from "./sections/Hero";
import WhoAreWeSection from "./sections/WhoAreWe";
import OffersSection from "./sections/Offers";
import CategoriesSection from "./sections/CategoriesSection";
import ServicesSection from "./sections/Services";
import WhyChooseUsSection from "./sections/WhyChooseUs";
import DiscountBannerSection from "./sections/DiscountBanner";
import SmartAISection from "./sections/SmartAISection";
import CallToAction from "./sections/CallToAction";
import CustomerReviewsSection from "./sections/CustomerReviews";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // دالة الحماية: تستقبل المسار وتفحص حالة التسجيل
  const handleProtectedAction = (targetPath) => {
    // navigate(targetPath);
    if (user) {
      navigate(targetPath); // مسجل دخول -> ينقله للصفحة مباشرة
    } else {
      setShowAuthModal(true); // غير مسجل -> يظهر المودال فوراً
    }
  };

  return (
    <main className="min-h-screen bg-page">
      {/* 1. المودال يظهر عند الحاجة */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* 2. السكشن الأول */}
      <Hero />

      {/* 3. باقي السكشنز - نمرر لهم دالة الحماية */}
      <WhoAreWeSection />
      <OffersSection onNavigate={handleProtectedAction} />
      <CategoriesSection onNavigate={handleProtectedAction} />
      <ServicesSection onNavigate={handleProtectedAction} />
      <WhyChooseUsSection />
      <DiscountBannerSection onNavigate={handleProtectedAction} />
      <SmartAISection onNavigate={handleProtectedAction} />
      <CustomerReviewsSection />
      <CallToAction onNavigate={handleProtectedAction} />

      <Footer />
    </main>
  );
}
