
import { Link, useNavigate } from "react-router-dom";
import "../Admin/adminDashboard.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FaCalendarAlt } from "react-icons/fa";

import {
  FaHome,
  FaBuilding,
  FaEnvelope,
  FaCommentDots,
  FaExclamationCircle,
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

      // ✅ NEW FILTERED COUNTS
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

      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Grandview</h2>
        </div>

        <nav>
          <Link to="/admin/dashboard"><FaHome /> Dashboard</Link>
          <Link to="/admin/properties"><FaBuilding /> Manage Properties</Link>
          <Link to="/admin/inquiries"><FaClipboardList /> Inquiries</Link>
          <Link to="/admin/feedback"><FaCommentDots /> Feedback</Link>
          <Link to="/admin/contacts"><FaEnvelope /> Contact Messages</Link>
          {/* <Link to="/admin/issues"><FaExclamationCircle /> Tenant Issues</Link> */}
          <Link to="/admin/post-properties"><FaBuilding /> Post Properties</Link>
          {/* <Link to="/admin/appointments"><FaCalendarAlt /> Appointments</Link> */}
          <Link to="/admin/commission-leads"><FaChartLine /> Commission Queries</Link>
          <Link to="/admin/agent-applications"><FaChartLine /> Agent Applications</Link>
        </nav>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <div className="admin-title">
            <FaChartLine />
            <h1>Dashboard Overview</h1>
          </div>

          <div className="admin-profile">
            <div className="avatar">
              {adminEmail ? adminEmail.charAt(0).toUpperCase() : "A"}
            </div>
            <span>{adminEmail || "Admin"}</span>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        {/* ✅ UPDATED STATS */}
        <section className="stats-grid">

          <div className="stat-card">
            <h3>Total Properties</h3>
            <p>{stats.properties}</p>
          </div>

          {/* <div className="stat-card">
            <h3>Total Tenants</h3>
            <p>{stats.tenants}</p>
          </div>

          <div className="stat-card">
            <h3>Total Property Owners</h3>
            <p>{stats.owners}</p>
          </div> */}

          {/* ✅ NEW: AVAILABLE */}
          <div
            className="stat-card clickable"
            onClick={() => navigate("/admin/properties/available")}
          >
            <h3>Available Properties</h3>
            <p>{stats.available}</p>
          </div>

          {/* ✅ NEW: RENTED */}
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