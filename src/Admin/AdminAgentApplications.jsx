// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../Admin/AdminContacts.css";
// import AdminNavbar from "./AdminNavbar";

// export default function AdminAgentApplications() {

//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = async () => {
//     const { data, error } = await supabase
//       .from("agent_applications")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (!error) setApplications(data);
//     else console.error(error);
//   };

//   const deleteApplication = async (id) => {
//     const confirmDelete = window.confirm("Delete this application?");
//     if (!confirmDelete) return;

//     const { error } = await supabase
//       .from("agent_applications")
//       .delete()
//       .eq("id", id);

//     if (!error) {
//       setApplications((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   return (
//     <>
//     <AdminNavbar />
//     <section className="admin-contacts">
//       <h2>Agent Applications</h2>

//       {applications.length === 0 ? (
//         <p className="no-messages">No applications yet.</p>
//       ) : (
//         <div className="messages-container">
//           {applications.map((item) => (
//             <div key={item.id} className="message-card">

//               <button
//                 className="close-btn"
//                 onClick={() => deleteApplication(item.id)}
//               >
//                 ✖
//               </button>

//               <h4>{item.fullname}</h4>
//               <p className="message-email">{item.email}</p>

//               <p><strong>Phone:</strong> {item.phone}</p>
//               <p><strong>City:</strong> {item.city}</p>

//               <p className="message-text">{item.message}</p>

//               <small className="message-date">
//                 {new Date(item.created_at).toLocaleString()}
//               </small>

//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminContacts.css"; // reuse same table CSS
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

    if (!error) setApplications(data || []);
    else console.error(error);
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    await supabase.from("agent_applications").delete().eq("id", id);
    setApplications((prev) => prev.filter((item) => item.id !== id));
  };

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
                <th>City</th>
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
                  <td>{item.city}</td>
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