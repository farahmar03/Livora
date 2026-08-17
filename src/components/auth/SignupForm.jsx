import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Username */}
      <div className="relative">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-5 py-4 rounded-full bg-white outline-none"
        />
        <FiUser
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-5 py-4 rounded-full bg-white outline-none"
        />
        <FiMail
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* Phone Number */}
      <div className="relative">
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-5 py-4 rounded-full bg-white outline-none"
        />
        <FiPhone
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full px-5 py-4 rounded-full bg-white outline-none"
        />
        <button
          type="button"
          onClick={function () {
            setShowPassword(!showPassword);
          }}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      <button className="w-full py-4 rounded-full bg-[#D58C38] text-white font-bold text-lg mt-2">
        Done
      </button>
    </div>
  );
}

export default SignUpForm;
