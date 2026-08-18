import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { supabase } from "../../services/supabase";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // قراءة الإيميل المحفوظ مسبقاً وتفعيل الخيار بناءً عليه
  const savedEmail = localStorage.getItem("rememberedEmail") || "";
  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(!!savedEmail);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // فحص الشروط بالخلفية لنفس نمط الـ SignUp
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setLoading(true);
    setErrorMessage("");

    try {
      // 1. تسجيل الدخول عبر Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 2. تحديث خيار تذكرني في الـ localStorage بناءً على اختيار المستخدم الحالي
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/");

    } catch (error) {
      setErrorMessage("Please check your email or password and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off" className="flex flex-col gap-3 sm:gap-4 w-full">
      {errorMessage && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-xl text-xs font-semibold transition-all duration-300">
          {errorMessage}
        </div>
      )}

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          placeholder="Email (@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-full bg-white outline-none text-sm sm:text-base text-gray-900 transition-all duration-300 ${
            email && !isEmailValid ? "border-2 border-red-400" : email && isEmailValid ? "border-2 border-green-400" : ""
          }`}
          required
        />
        <FiUser className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-full bg-white outline-none text-sm sm:text-base pr-12 text-gray-900 transition-all duration-300 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden ${
            password && !isPasswordValid ? "border-2 border-red-400" : password && isPasswordValid ? "border-2 border-green-400" : ""
          }`}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer z-10 bg-transparent border-none p-0 flex items-center justify-center"
        >
          {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-1 text-sm gap-2 sm:gap-0">
        <label className="flex items-center gap-2 text-[var(--color-teal)] cursor-pointer">
          <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-[var(--color-teal)] cursor-pointer" 
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-[var(--color-teal)] hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`w-full py-3 sm:py-4 rounded-full text-white font-bold text-base sm:text-lg mt-2 transition-all duration-300 border-none ${
          isFormValid 
            ? "bg-[var(--color-orange)] hover:bg-[#c27d2f] cursor-pointer opacity-100" 
            : "bg-gray-300 cursor-not-allowed opacity-60"
        }`}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      <p className="text-center text-[var(--color-teal)] text-xs sm:text-sm mt-2">Or continue with</p>

      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-colors border-none">
          <FcGoogle size={20} />
        </button>
        <button type="button" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--color-teal)] hover:bg-[#15575f] flex items-center justify-center cursor-pointer transition-colors border-none">
          <FaFacebookF size={18} color="white" />
        </button>
      </div>

      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </form>
  );
}