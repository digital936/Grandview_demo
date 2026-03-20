

// File: src/pages/AdminLogin.jsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

  useEffect(() => {
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      navigate("/admin/dashboard");
    }
  };

  checkSession();
}, [navigate]);

    

  const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!error) {
    // ✅ store session user
    localStorage.setItem("admin", JSON.stringify(data.user));

    navigate("/admin/dashboard");
  } else {
    alert("Invalid login credentials");
  }
};

  return (
    <div className="admin-login">
      <form onSubmit={handleLogin}>
        <h2>Grandview Admin</h2>
        <input
          type="email"
          placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}