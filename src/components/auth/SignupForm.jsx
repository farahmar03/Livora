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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // عند النجاح يتم الانتقال للصفحة الرئيسية مباشرة
      navigate("/");

    } catch (error) {
      // إظهار رسالة الخطأ في الشريط الأحمر داخل الصفحة بدلاً من نافذة المتصفح
      setErrorMessage("Please check your email or password and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off" className="flex flex-col gap-3 sm:gap-4 w-full">
      {/* الشريط الأحمر لعرض الخطأ عند إدخال بيانات خاطئة */}
      {errorMessage && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-full bg-white outline-none text-sm sm:text-base text-gray-900"
          required
        />
        <FiUser className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer pointer-events-none" size={18} />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-full bg-white outline-none text-sm sm:text-base pr-12 text-gray-900 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
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
          <input type="checkbox" className="accent-[var(--color-teal)] cursor-pointer" />
          Remember
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
        disabled={loading}
        className="w-full py-3 sm:py-4 rounded-full bg-[var(--color-orange)] hover:bg-[#c27d2f] text-white font-bold text-base sm:text-lg mt-2 cursor-pointer transition-colors border-none disabled:opacity-50"
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