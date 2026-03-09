
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Footer from "../components/Footer";

export default function Login() {
  const [role, setRole] = useState("tenant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Login with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // 2️⃣ Get role from profiles table
      const { data: profile, error: roleError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (roleError || !profile) {
        alert("User role not found.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // 3️⃣ Check if selected role matches DB role
      if (profile.role !== role) {
        alert(`You are registered as ${profile.role}, not ${role}.`);
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // 4️⃣ Redirect based on role
      if (role === "tenant") {
        navigate("/tenant-dashboard");
      } else {
        navigate("/owner-dashboard");
      }

    } catch (err) {
      console.error("Login error:", err.message);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Grandview Login</h2>

        <div className="role-toggle">
          <button
            type="button"
            className={role === "tenant" ? "active" : ""}
            onClick={() => setRole("tenant")}
          >
            Tenant
          </button>

          <button
            type="button"
            className={role === "owner" ? "active" : ""}
            onClick={() => setRole("owner")}
          >
            Property Owner
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading
              ? "Logging in..."
              : `Login as ${role === "tenant" ? "Tenant" : "Owner"}`}
          </button>
        </form>

        {/* <p className="login-footer">
  Don’t have an account?{" "}
  <span onClick={() => navigate("/register")} className="register-link">
    Register here
  </span>
</p> */}
      </div>
    </div>
    <Footer />
    </>
  );
}