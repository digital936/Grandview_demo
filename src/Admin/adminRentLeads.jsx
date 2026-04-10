import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const RentLeads = () => {
  const [rentLeads, setRentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("rent_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setRentLeads(data);
    }

    setLoading(false);
  };

  // 🗑️ DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("rent_leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete");
    } else {
      // remove from UI instantly ⚡
      setRentLeads((prev) => prev.filter((lead) => lead.id !== id));
    }
  };

  if (loading) return <p>Loading Rent Leads...</p>;

  return (
    <div className="admin-page">
      <h2>Rent Leads</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Type</th>
            <th>Bed</th>
            <th>Bath</th>
            <th>Rent</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rentLeads.length > 0 ? (
            rentLeads.map((lead) => (
              <tr key={lead.id}>
                <td className="address-text">{lead.address}</td>
                <td>{lead.property_type}</td>
                <td>{lead.bedrooms}</td>
                <td>{lead.bathrooms}</td>

                <td>
                  <span className="rent-badge">
                    ${lead.expected_rent}
                  </span>
                </td>

                <td>{lead.name}</td>
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
              <td colSpan="10" className="empty-state">
                No Rent Leads Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RentLeads;