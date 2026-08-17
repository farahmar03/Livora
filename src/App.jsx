import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";

import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import AiTechnologyPage from "./pages/ai/AiTechnologyPage";
import OffersPage from "./pages/offers/OffersPage";

import ShopFurnitureDetails from "./pages/services/ShopFurnitureDetails";
import FurnitureProducts from "./pages/services/FurnitureProducts";
import CleaningServiceBooking from "./pages/services/CleaningServiceBooking";
import MovingServiceBooking from "./pages/services/MovingServiceBooking";

import CartPage from "./pages/user/CartPage";
import PaymentPage from "./pages/user/PaymentPage";
import EditProfilePage from "./pages/user/EditProfilePage";
import SettingsPage from "./pages/user/SettingsPage";
import NotificationsPage from "@/pages/user/NotificationsPage";
import SupportPage from "@/pages/user/SupportPage";
import FavoritesPage from "@/pages/user/FavoritesPage";
import ProductDetails from "./pages/product/ProductDetails";

import AOS from "aos";
import "aos/dist/aos.css";

import ScrollToTop from "./components/layout/ScrollToTop";

function App() {
  const location = useLocation();

  // 1. منع المتصفح من استرجاع مكان السكرول القديم عند الريفرش + التمرير للأعلى
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // 2. التمرير لأعلى الصفحة عند تغيير المسار (Route Change)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 3. تهيئة AOS وإعادة تحديثها
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, [location.pathname]);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/ai-technology" element={<AiTechnologyPage />} />
            <Route
              path="/services/shop-furniture"
              element={<ShopFurnitureDetails />}
            />
            <Route
              path="/services/cleaning"
              element={<ShopFurnitureDetails />}
            />
            <Route path="/services/moving" element={<ShopFurnitureDetails />} />
            <Route
              path="/services/shop-furniture/products"
              element={<FurnitureProducts />}
            />
            <Route
              path="/services/cleaning/booking"
              element={<CleaningServiceBooking />}
            />
            <Route path="/services/moving" element={<MovingServiceBooking />} />
            <Route
              path="/services/moving/booking"
              element={<MovingServiceBooking />}
            />
            <Route
              path="/services/moving/request"
              element={<MovingServiceBooking />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/profile/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
