import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import { FaHome, FaBuilding, FaClipboardList } from "react-icons/fa";

export default function AdminNavbar() {

  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    getAdminUser();
  }, []);

  const getAdminUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setAdminEmail(user.email);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        <Link to="/admin/dashboard"><FaHome /> Dashboard</Link>

        <Link to="/admin/properties">
          <FaBuilding /> Manage Properties
        </Link>

        <Link to="/admin/inquiries">
          <FaClipboardList /> Inquiries
        </Link>

        <div className="nav-profile">
          <div className="avatar">
            {adminEmail ? adminEmail.charAt(0).toUpperCase() : "A"}
          </div>

          <span>{adminEmail || "Admin"}</span>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

      </div>

    </header>
  );
}