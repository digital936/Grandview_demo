// import { useState } from "react";
// import { supabase } from "../lib/supabase";
// import { useNavigate } from "react-router-dom";
// import "../styles/admin.css";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (!error) {
//       navigate("/admin/dashboard");
//     } else {
//       alert("Invalid login");
//     }
//   };

//   return (
//     <div className="admin-login">
//       <form onSubmit={handleLogin}>
//         <h2>Grandview Admin</h2>
//         <input
//           type="email"
//           placeholder="Admin Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button>Login</button>
//       </form>
//     </div>
//   );
// }

// File: src/pages/AdminLogin.jsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     if (session) navigate("/admin/dashboard");
  //   });
  // }, [navigate]);

  useEffect(() => {
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      navigate("/admin/dashboard");
    }
  };

  checkSession();
}, [navigate]);

    localStorage.setItem("admin", JSON.stringify(user));

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
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