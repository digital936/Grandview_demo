import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminContacts.css";
import AdminNavbar from "./AdminNavbar";

export default function AdminAgentApplications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("agent_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setApplications(data);
    else console.error(error);
  };

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm("Delete this application?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("agent_applications")
      .delete()
      .eq("id", id);

    if (!error) {
      setApplications((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
    <AdminNavbar />
    <section className="admin-contacts">
      <h2>Agent Applications</h2>

      {applications.length === 0 ? (
        <p className="no-messages">No applications yet.</p>
      ) : (
        <div className="messages-container">
          {applications.map((item) => (
            <div key={item.id} className="message-card">

              <button
                className="close-btn"
                onClick={() => deleteApplication(item.id)}
              >
                ✖
              </button>

              <h4>{item.fullname}</h4>
              <p className="message-email">{item.email}</p>

              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>City:</strong> {item.city}</p>

              <p className="message-text">{item.message}</p>

              <small className="message-date">
                {new Date(item.created_at).toLocaleString()}
              </small>

            </div>
          ))}
        </div>
      )}
    </section>
    </>
  );
}