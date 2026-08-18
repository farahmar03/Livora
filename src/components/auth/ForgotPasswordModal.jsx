import { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { supabase } from "../../services/supabase";

export default function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState(1); // 1: إدخال الإيميل، 2: تم الإرسال بنجاح
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      // إرسال رابط إعادة تعيين كلمة المرور عبر Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/update-password", // الرابط اللي رح يرجع له المستخدم
      });

      if (error) throw error;
      setStep(2); // الانتقال لشاشة نجاح الإرسال
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      {step === 1 && (
        <div className="bg-[var(--color-teal)] rounded-3xl p-8 w-full max-w-sm text-center shadow-xl">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          <h2 className="text-white text-xl font-bold mb-2">Forgot Password</h2>
          <p className="text-white/70 text-sm mb-6">
            Enter your email to send you a password reset link.
          </p>

          <form onSubmit={handleRequestReset} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-white outline-none text-gray-900 font-medium"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[var(--color-orange)] text-white font-bold cursor-pointer hover:opacity-90 transition-opacity border-none disabled:opacity-50 shadow-md"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] font-bold cursor-pointer hover:bg-[var(--color-orange)]/10 transition-colors bg-transparent"
            >
              Back
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm border-2 border-[var(--color-teal)] shadow-xl text-center">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FBDFC7] flex items-center justify-center">
                <FiCheck className="text-[var(--color-teal)]" size={18} />
              </span>
              <h3 className="font-bold text-lg text-gray-900">Check Your Email</h3>
            </div>
            <button 
              type="button" 
              onClick={onClose}
              className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
            >
              <FiX size={22} className="text-gray-500 hover:text-gray-800 transition-colors" />
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            We have sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>. Please check your inbox.
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-full bg-[var(--color-orange)] text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity border-none shadow-md"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}