// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // دالة لجلب بيانات المستخدم مدمجة مع جدول profiles من قاعدة البيانات
  const fetchUserProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // جلب البيانات من جدول profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      // دمج بيانات الـ Auth مع بيانات الـ Profile
      setUser({
        ...authUser,
        ...profile,
        // الحفاظ على الأسماء المتوافقة مع الكود القديم
        name: profile?.username || authUser.user_metadata?.username || authUser.email?.split("@")[0],
        avatar: profile?.avatar_url || authUser.user_metadata?.avatar_url,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(authUser);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      await fetchUserProfile(authUser);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await fetchUserProfile(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: email.split('@')[0] }
      }
    });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // دالة لتحديث البيانات محلياً فور حفظها في صفحة البروفايل لتتحدث القائمة فوراً
  const refreshProfile = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    await fetchUserProfile(authUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);