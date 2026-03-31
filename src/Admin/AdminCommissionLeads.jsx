import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminContacts.css"; // reuse same styling

export default function AdminCommissionLeads() {

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("commission_leads")
      .select("id, fullname, email, phone, city, message, plan, created_at")
      .order("created_at", { ascending: false });

    if (!error) {
      setLeads(data);
    } else {
      console.error(error);
    }
  };

  const deleteLead = async (id) => {
  const confirmDelete = window.confirm("Delete this query?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("commission_leads")
    .delete()
    .eq("id", id);

  if (!error) {
    setLeads((prev) => prev.filter((item) => item.id !== id));
  } else {
    console.error("Error deleting lead:", error);
  }
};

  return (
    <section className="admin-contacts">
      <h2>Commission Plan Queries</h2>

      {leads.length === 0 ? (
        <p className="no-messages">No commission queries yet.</p>
      ) : (
        <div className="messages-container">
          {leads.map((item) => (
            <div key={item.id} className="message-card">

                <button
  className="close-btn"
  onClick={() => deleteLead(item.id)}
>
  ✖
</button>

              <h4>{item.fullname}</h4>
              <p className="message-email">{item.email}</p>

              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>City:</strong> {item.city}</p>
              <p><strong>Plan:</strong> {item.plan}</p>

              <p className="message-text">{item.message}</p>

              <small className="message-date">
                {item.created_at
                  ? new Date(item.created_at).toLocaleString()
                  : "No date"}
              </small>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}