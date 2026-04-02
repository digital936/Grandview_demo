import { Link, useNavigate } from "react-router-dom";
import "../Admin/adminNavbar.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import logo from "../assets/grandview.png";

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

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleLinkClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="Grandview Logo" className="nav-logo" />
      </div>

      {/* MOBILE TOGGLE */}
      <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* RIGHT */}
      <div className={`nav-right ${menuOpen ? "open" : ""}`}>

        <Link to="/admin/dashboard" onClick={handleLinkClick}><FaHome /> Dashboard</Link>

        <Link to="/admin/properties" onClick={handleLinkClick}>
          <FaBuilding /> Manage Properties
        </Link>

        <Link to="/admin/inquiries" onClick={handleLinkClick}>
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