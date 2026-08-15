// src/pages/user/EditProfilePage.jsx
import { useState, useEffect } from "react";
import { FiCamera, FiEdit2, FiCheck } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";

export default function EditProfilePage() {
  // 1. حالة البيانات
  const [formData, setFormData] = useState({
    fullName: "Ruba Alzamly",
    email: "____@gmail.com",
    phone: "059_______",
    dob: "30/December/2000",
    gender: "Female",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
  });

  // حالة زر الحفظ
  const [isSaved, setIsSaved] = useState(false);

  // جلب البيانات المخزنة
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setFormData((prev) => ({
          ...prev,
          fullName: parsed.username || parsed.fullName || prev.fullName,
          email: parsed.email || prev.email,
          phone: parsed.phone || prev.phone,
          dob: parsed.dob || prev.dob,
          gender: parsed.gender || prev.gender,
        }));
      } catch (e) {
        console.error("Error reading saved user data", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleGenderChange = (selectedGender) => {
    setFormData((prev) => ({ ...prev, gender: selectedGender }));
    setIsSaved(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
      setIsSaved(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    setIsSaved(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-3xl font-bold text-[var(--color-teal)] mb-6">Profile</h1>

        {/* صورة البروفايل */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 rounded-full shadow-sm">
            <img
              src={formData.avatar}
              alt="Profile Avatar"
              className="w-full h-full rounded-full object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-[#EBF5F5] border border-[var(--color-teal)] p-2 rounded-full cursor-pointer hover:bg-white transition-colors shadow-sm"
            >
              <FiCamera size={16} className="text-[var(--color-teal)]" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <h2 className="text-[var(--color-teal)] font-semibold text-lg mt-3">
            {formData.fullName || "User Name"}
          </h2>
        </div>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 font-medium text-sm">User full name</label>
            <div className="relative w-full">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-2xl bg-white text-[var(--color-orange)] font-medium outline-none pr-12 shadow-sm border border-transparent focus:border-[var(--color-teal)] transition-all"
              />
              <FiEdit2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 font-medium text-sm">Email address</label>
            <div className="relative w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-2xl bg-white text-[var(--color-orange)] font-medium outline-none pr-12 shadow-sm border border-transparent focus:border-[var(--color-teal)] transition-all"
              />
              <FiEdit2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 font-medium text-sm">Phone number</label>
            <div className="relative w-full">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-2xl bg-white text-[var(--color-orange)] font-medium outline-none pr-12 shadow-sm border border-transparent focus:border-[var(--color-teal)] transition-all"
              />
              <FiEdit2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 font-medium text-sm">Date of birth</label>
            <div className="relative w-full">
              <input
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-2xl bg-white text-[var(--color-orange)] font-medium outline-none pr-12 shadow-sm border border-transparent focus:border-[var(--color-teal)] transition-all"
              />
              <FiEdit2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <label className="text-gray-700 font-medium text-sm">Gender</label>
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => handleGenderChange("Male")}
                className="flex items-center gap-2.5 cursor-pointer outline-none"
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${formData.gender === "Male" ? "border border-[var(--color-teal)] bg-white text-[var(--color-teal)]" : "border border-gray-300 bg-white"}`}>
                  {formData.gender === "Male" && <FiCheck size={14} className="stroke-[3]" />}
                </div>
                <span className="text-gray-800 font-medium text-sm">Male</span>
              </button>

              <button
                type="button"
                onClick={() => handleGenderChange("Female")}
                className="flex items-center gap-2.5 cursor-pointer outline-none"
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${formData.gender === "Female" ? "border border-[var(--color-teal)] bg-white text-[var(--color-teal)]" : "border border-gray-300 bg-white"}`}>
                  {formData.gender === "Female" && <FiCheck size={14} className="stroke-[3]" />}
                </div>
                <span className="text-gray-800 font-medium text-sm">Female</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-2xl font-bold text-lg mt-3 transition-all duration-300 shadow-md cursor-pointer ${
              isSaved
                ? "bg-[var(--color-teal)] text-white hover:bg-[#15565e]"
                : "bg-[var(--color-orange)] text-white hover:bg-[#c27d2f]"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}