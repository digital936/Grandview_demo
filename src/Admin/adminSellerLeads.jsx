import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/adminSellerLeads.css";
import AdminNavbar from "./AdminNavbar";

const SellerLeads = () => {
  const [sellerLeads, setSellerLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);


  const fetchLeads = async () => {
  const { data, error } = await supabase
    .from("seller_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    setSellerLeads(data);

    // ✅ MARK AS READ
    await supabase
      .from("seller_leads")
      .update({ is_read: true })
      .eq("is_read", false);
  }

  setLoading(false);
};

  // 🗑️ DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("seller_leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete");
    } else {
      // ⚡ Remove instantly from UI
      setSellerLeads((prev) => prev.filter((lead) => lead.id !== id));
    }
  };

  if (loading) return <p>Loading Seller Leads...</p>;

  return (
    <>
      <AdminNavbar />
      <div className="admin-page">
        <h2>Seller Leads</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Beds</th>
            <th>Baths</th>
            <th>Sqft</th>
            <th>Condition</th>
            <th>Est. Value</th>
            <th>Mortgage</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sellerLeads.length > 0 ? (
            sellerLeads.map((lead) => (
              <tr key={lead.id}>
                <td className="address-text">{lead.address}</td>

                <td>{lead.beds}</td>
                <td>{lead.baths}</td>
                <td>{lead.sqft}</td>
                <td>{lead.condition}</td>

                <td>
                  <span className="price-badge">
                    ${lead.estimated_value}
                  </span>
                </td>

                <td>${lead.mortgage_balance}</td>

                <td>
                  {lead.first_name} {lead.last_name}
                </td>

                <td>{lead.phone}</td>
                <td>{lead.email}</td>

                <td className="date-text">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="empty-state">
                No Seller Leads Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default SellerLeads;