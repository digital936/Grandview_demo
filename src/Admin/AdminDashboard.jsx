
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

  const [notifications, setNotifications] = useState({
  feedback: 0,
  contacts: 0,
  inquiries: 0,
  rentLeads: 0,
  sellerLeads: 0,

  commission: 0,
  applications: 0,
  tours: 0
});

  const [adminEmail, setAdminEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    getAdminUser();
    fetchNotifications();
  }, []);

  useEffect(() => {
  const channel = supabase
    .channel("notifications")
    .on(
      "postgres_changes",
      { event: "*", schema: "public" },
      () => {
        fetchNotifications(); // auto refresh
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
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

  const fetchNotifications = async () => {
  try {
    const { count: feedbackCount } = await supabase
      .from("feedback")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    const { count: contactCount } = await supabase
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    const { count: inquiryCount } = await supabase
      .from("management_inquiries")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    const { count: rentLeadCount } = await supabase
      .from("rent_leads")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    const { count: sellerLeadCount } = await supabase
      .from("seller_leads")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);


    const { count: commissionCount } = await supabase
      .from("commission_leads")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    const { count: applicationCount } = await supabase
      .from("agent_applications")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    const { count: tourCount } = await supabase
      .from("tour_requests")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    setNotifications({
      feedback: feedbackCount || 0,
      contacts: contactCount || 0,
      inquiries: inquiryCount || 0,
      rentLeads: rentLeadCount || 0,
      sellerLeads: sellerLeadCount || 0,
      commission: commissionCount || 0,
      applications: applicationCount || 0,
      tours: tourCount || 0
    });

  } catch (error) {
    console.error(error);
  }
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

        {/* RIGHT MENU */}
        <div className={`nav-right ${menuOpen ? "open" : ""}`}>
          <Link to="/admin/dashboard"><FaHome /> Dashboard</Link>
          <Link to="/admin/properties"><FaBuilding /> Manage Properties</Link>
          <Link to="/admin/inquiries"><FaClipboardList /> Tour Requests {notifications.tours > 0 && (
    <span className="badge">{notifications.tours}</span>

  )}</Link>

          {/* ONLY LOGOUT HERE */}
          <div className="nav-profile">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        
        <nav className="sidebar-links">
          <Link to="/admin/feedback"><FaCommentDots /> Feedback {notifications.feedback > 0 && (
    <span className="badge">{notifications.feedback}</span>
  )}</Link>
          <Link to="/admin/contacts"><FaEnvelope /> Contact Messages {notifications.contacts > 0 && (
    <span className="badge">{notifications.contacts}</span>
  )}</Link>
          <Link to="/admin/post-properties"><FaBuilding /> Management Inquiries {notifications.inquiries > 0 && (
    <span className="badge">{notifications.inquiries}</span>
  )}</Link>

          <Link to="/admin/rent-leads"><FaBuilding /> Rent Leads {notifications.rentLeads > 0 && (
    <span className="badge">{notifications.rentLeads}</span>
  )}</Link>

          <Link to="/admin/seller-leads"><FaBuilding /> Seller Leads {notifications.sellerLeads > 0 && (
    <span className="badge">{notifications.sellerLeads}</span>
  )}</Link>

          <Link to="/admin/commission-leads"><FaChartLine /> Commission Queries {notifications.commission > 0 && (
    <span className="badge">{notifications.commission}</span>
  )}</Link>
          <Link to="/admin/agent-applications"><FaChartLine /> Agent Applications {notifications.applications > 0 && (
    <span className="badge">{notifications.applications}</span>
  )}</Link>
        </nav>

        {/* 🔽 Avatar at Bottom */}
        <div className="sidebar-profile">
          <div className="avatar">
            {adminEmail ? adminEmail.charAt(0).toUpperCase() : "A"}
          </div>
          <span>{adminEmail || "Admin"}</span>
        </div>
      </aside>

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