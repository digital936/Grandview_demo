import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminContacts.css"; // reuse table styles
import AdminNavbar from "./AdminNavbar";

export default function AdminCommissionLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
    markAsRead();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("commission_leads")
      .select("id, fullname, email, phone, city, message, plan, created_at")
      .order("created_at", { ascending: false });

    if (!error) setLeads(data || []);
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this query?")) return;

    await supabase.from("commission_leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((item) => item.id !== id));
  };

  async function markAsRead() {
  await supabase
    .from("commission_leads")
    .update({ is_read: true })
    .eq("is_read", false);
  }

  return (
    <>
      <AdminNavbar />

      <div className="contacts-page">

        {/* HEADER */}
        <div className="contacts-header">
          <h2>Commission Plan Queries</h2>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                {/* <th>City</th> */}
                <th>Plan</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((item) => (
                <tr key={item.id}>
                  <td>{item.fullname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  {/* <td>{item.city}</td> */}
                  <td>{item.plan}</td>
                  <td className="msg">{item.message}</td>
                  <td>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "No date"}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteLead(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <p className="empty">No commission queries found</p>
          )}
        </div>
      </div>
    </>
  );
}