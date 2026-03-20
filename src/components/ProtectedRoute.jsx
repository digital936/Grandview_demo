import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({ children, reverse = false }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return null;

  // 🔐 Normal protection
  if (!reverse && !session) {
    return <Navigate to="/admin/login" replace />;
  }

  // 🔁 Reverse protection (login page)
  if (reverse && session) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}