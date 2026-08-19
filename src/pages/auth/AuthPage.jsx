import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignupForm";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/signup" ? "signup" : "signin"
  );

  const handleAuthSubmit = async (email, password, isSignUp) => {
    try {
      if (isSignUp) {
        await signup(email, password); 
      } else {
        await login(email, password); 
      }
      navigate("/");
    } catch (error) {
      // تم إزالة الـ alert لتفادي ظهور النافذة السوداء المنبثقة، 
      // والأخطاء يتم معالجتها وعرضها داخل الشريط الأحمر في الفورم نفسه.
      throw error;
    }
  };

  useEffect(() => {
    if (location.pathname === "/signup") setActiveTab("signup");
    else if (location.pathname === "/signin") setActiveTab("signin");
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Navbar />

      <div className="flex flex-col items-center py-16 px-4">
        <div className="flex bg-[#E7DBC7] rounded-full p-1 w-full max-w-md mb-8">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-3 rounded-full font-bold transition-colors cursor-pointer ${
              activeTab === "signin"
                ? "bg-[var(--color-orange)] text-white"
                : "text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 rounded-full font-bold transition-colors cursor-pointer ${
              activeTab === "signup"
                ? "bg-[var(--color-orange)] text-white"
                : "text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="w-full max-w-md">
          {activeTab === "signin" ? (
            <SignInForm onSubmit={(email, pass) => handleAuthSubmit(email, pass, false)} />
          ) : (
            <SignUpForm />
          )}
        </div>
      </div>
    </div>
  );
}