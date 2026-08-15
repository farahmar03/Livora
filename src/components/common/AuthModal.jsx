// src/components/common/AuthModal.jsx
import { useNavigate } from "react-router-dom";
import { X, Lock, LogIn, UserPlus } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
        
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="w-20 h-20 mx-auto bg-[#FBDFC7] rounded-full flex items-center justify-center mb-4">
          <Lock className="text-[var(--color-orange)]" size={36} />
        </div>

        <h2 className="text-3xl font-bold text-[var(--color-teal)] mb-3">
          Authentication Required
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-8 px-2">
          Please sign in or create a new account first to access and
          enjoy all our exclusive services!
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-teal)] text-white py-3 rounded-xl font-semibold transition-colors hover:bg-[#14525a]"
          >
            <LogIn size={20} />
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-[var(--color-orange)] text-[var(--color-orange)] py-3 rounded-xl font-semibold transition-colors hover:bg-[var(--color-orange)] hover:text-white"
          >
            <UserPlus size={20} />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}