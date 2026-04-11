import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminContacts.css"; // reuse same table CSS
import AdminNavbar from "./AdminNavbar";

export default function AdminAgentApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
    markAsRead();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("agent_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setApplications(data || []);
    else console.error(error);
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    await supabase.from("agent_applications").delete().eq("id", id);
    setApplications((prev) => prev.filter((item) => item.id !== id));
  };

  async function markAsRead() {
  await supabase
    .from("agent_applications")
    .update({ is_read: true })
    .eq("is_read", false);
}

  return (
    <>
      <AdminNavbar />

      <div className="contacts-page">

        {/* HEADER */}
        <div className="contacts-header">
          <h2>Agent Applications</h2>
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
                <th>Career</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((item) => (
                <tr key={item.id}>
                  <td>{item.fullname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  {/* <td>{item.city}</td> */}
                  <td>{item.join}</td>

                  <td className="msg">{item.message}</td>
                  <td>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "No date"}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteApplication(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {applications.length === 0 && (
            <p className="empty">No applications found</p>
          )}
        </div>
      </div>
    </>
  );
}