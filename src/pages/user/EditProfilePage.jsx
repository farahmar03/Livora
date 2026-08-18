import { useState, useEffect } from "react";
import { FiCamera, FiEdit2 } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "../../services/supabase";
import { useAuth } from "@/context/AuthContext";

export default function EditProfilePage() {
  const { refreshProfile } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const usernameRegex = /^[a-zA-Z0-9_]{8,}$/;
  const isUsernameValid = usernameRegex.test(formData.username);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const googleAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setFormData({
          username: profileData?.username || user.user_metadata?.username || user.user_metadata?.full_name || "",
          email: user.email || "",
          phone: profileData?.phone || "",
          avatar: profileData?.avatar_url || googleAvatar || defaultAvatar,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, avatar: previewUrl }));
    setIsSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isUsernameValid) {
      setErrorMessage("Username must be at least 8 characters, English letters, numbers, or underscores only, with no spaces.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      let avatarUrl = formData.avatar;

      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, selectedFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicURLData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        avatarUrl = publicURLData.publicUrl;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username: formData.username,
          phone: formData.phone,
          avatar_url: avatarUrl,
          updated_at: new Date(),
        })
        .eq("id", user.id);

      if (error) throw error;

      await refreshProfile();

      setFormData((prev) => ({ ...prev, avatar: avatarUrl }));
      setSelectedFile(null);
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving profile:", error);
      setErrorMessage(error.message || "Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-3xl font-bold text-[var(--color-teal)] mb-6">Profile</h1>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-xl text-xs font-semibold max-w-md w-full text-center">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 rounded-full shadow-sm">
            <img
              src={formData.avatar || defaultAvatar}
              alt="Profile Avatar"
              className="w-full h-full rounded-full object-cover border-2 border-[var(--color-teal)]"
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
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          </div>
          <h2 className="text-[var(--color-teal)] font-semibold text-lg mt-3">
            {formData.username || "User Name"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 font-medium text-sm">Username</label>
            <div className="relative w-full">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-5 py-3.5 rounded-2xl bg-white text-[var(--color-orange)] font-medium outline-none pr-12 shadow-sm border transition-all ${
                  formData.username && !isUsernameValid 
                    ? "border-red-400" 
                    : formData.username && isUsernameValid 
                    ? "border-green-400" 
                    : "border-transparent focus:border-[var(--color-teal)]"
                }`}
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
                disabled
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-100 text-gray-500 font-medium outline-none pr-12 shadow-sm border border-transparent cursor-not-allowed"
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg mt-3 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 ${
              isSaved
                ? "bg-[var(--color-teal)] text-white hover:bg-[#15565e]"
                : "bg-[var(--color-orange)] text-white hover:bg-[#c27d2f]"
            }`}
          >
            {loading ? "Saving..." : isSaved ? "Saved" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}