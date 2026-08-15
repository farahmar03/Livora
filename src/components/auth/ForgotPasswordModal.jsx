import { useState, useRef } from "react";
import { FiX, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";

export default function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const codeRefs = useRef([]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) {
      codeRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      {step !== 4 && (
        <div className="bg-[var(--color-teal)] rounded-3xl p-8 w-full max-w-sm text-center">
          {step === 1 && (
            <>
              <h2 className="text-white text-xl font-bold mb-2">Forgot Password</h2>
              <p className="text-white/70 text-sm mb-6">
                Enter your email or number to send you a confirmation code.
              </p>
              <input
                type="text"
                placeholder="Email or number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-white outline-none mb-4"
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-full bg-[var(--color-orange)] text-white font-bold mb-3 cursor-pointer hover:opacity-90 transition-opacity"
              >
                Recover Password
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] font-bold cursor-pointer hover:bg-[var(--color-orange)]/10 transition-colors"
              >
                Back
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-white text-xl font-bold mb-2">Forgot Password</h2>
              <p className="text-white/70 text-sm mb-6">Get your code</p>
              <div className="flex justify-center gap-3 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (codeRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="w-12 h-12 rounded-xl text-center text-xl bg-white outline-none"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full py-3 rounded-full bg-[var(--color-orange)] text-white font-bold mb-3 cursor-pointer hover:opacity-90 transition-opacity"
              >
                Verify
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-3 rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] font-bold cursor-pointer hover:bg-[var(--color-orange)]/10 transition-colors"
              >
                Back
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-white text-xl font-bold mb-2">Reset Password</h2>
              <p className="text-white/70 text-sm mb-6">Enter your new password</p>

              <div className="relative mb-4">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full px-5 py-3 rounded-full bg-white outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer p-0 bg-transparent border-none flex items-center justify-center"
                >
                  {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full px-5 py-3 rounded-full bg-white outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer p-0 bg-transparent border-none flex items-center justify-center"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full py-3 rounded-full bg-[var(--color-orange)] text-white font-bold mb-3 cursor-pointer hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-full border-2 border-[var(--color-orange)] text-[var(--color-orange)] font-bold cursor-pointer hover:bg-[var(--color-orange)]/10 transition-colors"
              >
                Back
              </button>
            </>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm border-2 border-[var(--color-teal)]">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FBDFC7] flex items-center justify-center">
                <FiCheck className="text-[var(--color-teal)]" size={18} />
              </span>
              <h3 className="font-bold text-lg">Done</h3>
            </div>
            <button 
              type="button" 
              onClick={onClose}
              className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
            >
              <FiX size={22} className="text-gray-500 hover:text-gray-800 transition-colors" />
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            A new password has been successfully created, log in ongoing
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[var(--color-orange)] text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity border-none"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}