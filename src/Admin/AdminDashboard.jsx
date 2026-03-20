

import { Link } from "react-router-dom";
import "../Admin/adminDashboard.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FaCalendarAlt } from "react-icons/fa";

import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaUserTie,
  FaEnvelope,
  FaCommentDots,
  FaExclamationCircle,
  FaClipboardList,
  FaChartLine
} from "react-icons/fa";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    properties: 0,
    tenants: 0,
    inquiries: 0,
    issues: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

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

      // const { count: inquiryCount } = await supabase
      //   .from("inquiries")
      //   .select("*", { count: "exact", head: true });

      // const { count: issueCount } = await supabase
      //   .from("issues")
      //   .select("*", { count: "exact", head: true });

      setStats({
        properties: propertyCount || 0,
        tenants: tenantCount || 0,
        owners: ownerCount || 0,
        // inquiries: inquiryCount || 0,
        // issues: issueCount || 0
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <h2>Grandview</h2>
          
        </div>

        <nav>

          <Link to="/admin/dashboard"><FaHome /> Dashboard</Link>
          <Link to="/admin/properties"><FaBuilding /> Manage Properties</Link>
          {/* <Link to="/admin/tenants"><FaUsers /> Manage Tenants</Link>
          <Link to="/admin/owners"><FaUserTie /> Manage Owners</Link> */}
          <Link to="/admin/inquiries"><FaClipboardList /> Inquiries</Link>
          <Link to="/admin/feedback"><FaCommentDots /> Feedback</Link>
          <Link to="/admin/contacts"><FaEnvelope /> Contact Messages</Link>
          <Link to="/admin/issues"><FaExclamationCircle /> Tenant Issues</Link>
          <Link to="/admin/post-properties"><FaBuilding /> Post Properties</Link>
          <Link to="/admin/appointments"><FaCalendarAlt /> Appointments</Link>
          {/* <Link to="/admin/assign-properties"><FaUserTie /> Assign Properties</Link> */}

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOPBAR */}
        <header className="topbar">

          <div className="admin-title">
            <FaChartLine />
            <h1>Dashboard Overview</h1>
          </div>

          <div className="admin-profile">
            <div className="avatar">A</div>
            <span>Admin</span>
          </div>

        </header>

        {/* STATS */}
        <section className="stats-grid">

          <div className="stat-card">
            <h3>Total Properties</h3>
            <p>{stats.properties}</p>
          </div>

          <div className="stat-card">
            <h3>Total Tenants</h3>
            <p>{stats.tenants}</p>
          </div>

          <div className="stat-card">
            <h3>Total Property Owners</h3>
            <p>{stats.owners}</p>
          </div>

          {/* <div className="stat-card">
            <h3>Total Inquiries</h3>
            <p>{stats.inquiries}</p>
          </div>

          <div className="stat-card">
            <h3>Tenant Issues</h3>
            <p>{stats.issues}</p>
          </div> */}

        </section>

      </main>

    </div>
  );
}