
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/grandview.png";
import "../Admin/adminDashboard.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import {
  FaHome,
  FaBuilding,
  FaEnvelope,
  FaCommentDots,
  FaClipboardList,
  FaChartLine
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  

  const [stats, setStats] = useState({
    properties: 0,
    tenants: 0,
    owners: 0,
    available: 0,
    rented: 0
  });

  const [adminEmail, setAdminEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    getAdminUser();
  }, []);

  const getAdminUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setAdminEmail(user.email);
  };

  const fetchDashboardData = async () => {
    try {
      const { count: propertyCount } = await supabase
        .from("properties")
        .select("*", { count: "exact", head: true });

      const { count: tenantCount } = await supabase
        .from("tenants")
        .select("*", { count: "exact", head: true });

      const { count: ownerCount } = await supabase
        .from("owners")
        .select("*", { count: "exact", head: true });

      const { count: availableCount } = await supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("status", "available");

      const { count: rentedCount } = await supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("status", "rented");

      setStats({
        properties: propertyCount || 0,
        tenants: tenantCount || 0,
        owners: ownerCount || 0,
        available: availableCount || 0,
        rented: rentedCount || 0
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">

      {/* ===== TOP NAVBAR ===== */}
      <header className="admin-navbar">

        {/* LEFT: LOGO */}
        <div className="nav-left">
          <img src={logo} alt="Logo" className="nav-logo" />
        </div>

        

        {/* MOBILE MENU BUTTON */}
        <div
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* RIGHT: MENU */}
        <div className={`nav-right ${menuOpen ? "open" : ""}`}>

          <Link to="/admin/dashboard"><FaHome /> Dashboard</Link>
          <Link to="/admin/properties"><FaBuilding /> Manage Properties</Link>
          <Link to="/admin/inquiries"><FaClipboardList /> Inquiries</Link>

          {/* PROFILE */}
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

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div> */}
        <nav>
          {/* Sidebar links (optional) */}
          <Link to="/admin/feedback"><FaCommentDots /> Feedback</Link>
          <Link to="/admin/contacts"><FaEnvelope /> Contact Messages</Link>
          <Link to="/admin/post-properties"><FaBuilding /> Post Properties</Link>
          <Link to="/admin/commission-leads"><FaChartLine /> Commission Queries</Link>
          <Link to="/admin/agent-applications"><FaChartLine /> Agent Applications</Link>
        </nav>
      </aside>

      {/* SIDEBAR OVERLAY (MOBILE) */}
      {/* {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>} */}

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        <div className="admin-title">
          <FaChartLine />
          <h1>Dashboard Overview</h1>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Properties</h3>
            <p>{stats.properties}</p>
          </div>

          <div
            className="stat-card clickable"
            onClick={() => navigate("/admin/properties/available")}
          >
            <h3>Available Properties</h3>
            <p>{stats.available}</p>
          </div>

          <div
            className="stat-card clickable"
            onClick={() => navigate("/admin/properties/rented")}
          >
            <h3>Rented Properties</h3>
            <p>{stats.rented}</p>
          </div>
        </section>
      </main>
    </div>
  );
}