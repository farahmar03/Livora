import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { CheckCircle2, Send } from "lucide-react";

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    // محاكاة إرسال الطلب للسيرفر
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setMessage("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-300/60 shadow-sm text-left">
          
          {/* العنوان الرئيسي والفرعي */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#1B6D77] mb-2">
            How can we help you?
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Please describe your problem or inquiry below, and our support team will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* مربع النص */}
            <div className="flex flex-col gap-2">
              <label htmlFor="supportMessage" className="text-sm font-semibold text-gray-700">
                Your Message
              </label>
              <textarea
                id="supportMessage"
                rows="6"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (isSubmitted) setIsSubmitted(false);
                }}
                placeholder="Describe your problem here..."
                required
                className="w-full p-4 rounded-2xl border border-gray-300/80 focus:border-[#1B6D77] focus:ring-2 focus:ring-[#1B6D77]/20 outline-none transition-all resize-none text-gray-800 text-sm md:text-base bg-white/80 placeholder:text-gray-400"
              />
            </div>

            {/* زر الإرسال المعدل */}
            <button
              type="submit"
              disabled={loading || isSubmitted}
              className={`w-80 mx-auto py-3.5 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer border-none shadow-sm ${
                isSubmitted
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-[#D58C38] hover:bg-[#c27c2e] text-white active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <span className="inline-block animate-pulse">Sending...</span>
              ) : isSubmitted ? (
                <>
                  <CheckCircle2 size={20} />
                  <span>Sent</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send</span>
                </>
              )}
            </button>
          </form>

          {/* رسالة تأكيد إضافية تظهر بعد الإرسال */}
          {isSubmitted && (
            <p className="mt-4 text-xs md:text-sm text-emerald-600 font-medium text-center animate-fade-in">
              Thank you! Your message has been sent successfully.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}