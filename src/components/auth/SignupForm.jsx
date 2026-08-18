import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "../../services/supabase";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // فحص الشروط بالخلفية بدون إظهار رسائل مزعجة
  const usernameRegex = /^[a-zA-Z0-9_]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  
  const isUsernameValid = usernameRegex.test(username);
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;

  // الزر لن يفعل إلا إذا كانت كل الشروط صحيحة
  const isFormValid = isUsernameValid && isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, phone },
        },
      });

      if (error) throw error;

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off" className="flex flex-col gap-4 w-full">
      {/* رسالة الخطأ من السيرفر فقط إذا حصلت مشكلة حقيقية مثل إيميل مستخدم مسبقاً */}
      {errorMessage && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-xl text-xs font-semibold transition-all duration-300">
          {errorMessage}
        </div>
      )}

      {/* Username */}
      <div className="relative">
        <input
          type="text"
          placeholder="Username (min 8 chars, English)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full px-5 py-4 rounded-full bg-white outline-none text-gray-900 transition-all duration-300 ${
            username && !isUsernameValid ? "border-2 border-red-400" : username && isUsernameValid ? "border-2 border-green-400" : ""
          }`}
          required
        />
        <FiUser
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={20}
        />
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          placeholder="Email (@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-5 py-4 rounded-full bg-white outline-none text-gray-900 transition-all duration-300 ${
            email && !isEmailValid ? "border-2 border-red-400" : email && isEmailValid ? "border-2 border-green-400" : ""
          }`}
          required
        />
        <FiMail
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={20}
        />
      </div>

      {/* Phone Number */}
      <div className="relative">
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-5 py-4 rounded-full bg-white outline-none text-gray-900"
        />
        <FiPhone
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={20}
        />
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className={`w-full px-5 py-4 rounded-full bg-white outline-none pr-12 text-gray-900 transition-all duration-300 ${
            password && !isPasswordValid ? "border-2 border-red-400" : password && isPasswordValid ? "border-2 border-green-400" : ""
          }`}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`w-full py-4 rounded-full text-white font-bold text-lg mt-2 transition-all duration-300 border-none ${
          isFormValid 
            ? "bg-[#D58C38] hover:bg-[#c27d2f] cursor-pointer opacity-100" 
            : "bg-gray-300 cursor-not-allowed opacity-60"
        }`}
      >
        {loading ? "Creating account..." : "Done"}
      </button>
    </form>
  );
}

 export default SignUpForm;