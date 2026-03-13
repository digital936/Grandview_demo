// import { Link } from "react-router-dom";
// import "../Admin/adminDashboard.css";
// import { supabase } from "../lib/supabase";

// const rentProperty = async (propertyId, tenantData) => {
//   try {
//     // 1️⃣ Create tenant auth user
//     const { data, error } = await supabase.auth.admin.createUser({
//       email: tenantData.email,
//       password: tenantData.password,
//       email_confirm: true
//     });

//     if (error) throw error;

//     const userId = data.user.id;

//     // 2️⃣ Insert into tenants table
//     const { data: tenantInsert, error: tenantError } =
//       await supabase.from("tenants").insert({
//         user_id: userId,
//         property_id: propertyId,
//         name: tenantData.name,
//         email: tenantData.email
//       }).select().single();

//     if (tenantError) throw tenantError;

//     // 3️⃣ Update property
//     await supabase.from("properties")
//       .update({
//         status: "rented",
//         tenant_id: tenantInsert.id
//       })
//       .eq("id", propertyId);

//     alert("Property rented successfully");

//   } catch (err) {
//     console.error(err);
//     alert("Error renting property");
//   }
// };

// export default function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       <aside>
//         <h2>Grandview Admin</h2>
//         <Link to="/admin/properties">Manage Properties</Link>
//         <Link to="/admin/tenants">Manage Tenants</Link>
//         <Link to="/admin/owners">Manage Owners</Link>
//         <Link to="/admin/inquiries">View Inquiries</Link>
//         <Link to="/admin/feedback">View Feedback</Link>
//         <Link to="/admin/contacts">View ContactUs details</Link>
//         <Link to="/admin/issues">View Tenant Issues</Link>
        

//         {/* NEW PAGE */}
//         <Link to="/admin/post-properties">
//           View Post Properties
//         </Link>
        
//       </aside>

//       <div className="admin-content">
//         <h1>Welcome Admin</h1>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import "../Admin/adminDashboard.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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
          {/* <span>Admin Panel</span> */}
        </div>

        <nav>

          <Link to="/admin/dashboard"><FaHome /> Dashboard</Link>
          <Link to="/admin/properties"><FaBuilding /> Manage Properties</Link>
          <Link to="/admin/tenants"><FaUsers /> Manage Tenants</Link>
          <Link to="/admin/owners"><FaUserTie /> Manage Owners</Link>
          <Link to="/admin/inquiries"><FaClipboardList /> Inquiries</Link>
          <Link to="/admin/feedback"><FaCommentDots /> Feedback</Link>
          <Link to="/admin/contacts"><FaEnvelope /> Contact Messages</Link>
          <Link to="/admin/issues"><FaExclamationCircle /> Tenant Issues</Link>
          <Link to="/admin/post-properties"><FaBuilding /> Post Properties</Link>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOPBAR */}
        <header className="topbar">

          <div className="page-title">
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