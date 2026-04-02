// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../Admin/AdminContacts.css"; // reuse same styling

// import AdminNavbar from "./AdminNavbar";

// export default function AdminCommissionLeads() {

//   const [leads, setLeads] = useState([]);

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const fetchLeads = async () => {
//     const { data, error } = await supabase
//       .from("commission_leads")
//       .select("id, fullname, email, phone, city, message, plan, created_at")
//       .order("created_at", { ascending: false });

//     if (!error) {
//       setLeads(data);
//     } else {
//       console.error(error);
//     }
//   };

//   const deleteLead = async (id) => {
//   const confirmDelete = window.confirm("Delete this query?");
//   if (!confirmDelete) return;

//   const { error } = await supabase
//     .from("commission_leads")
//     .delete()
//     .eq("id", id);

//   if (!error) {
//     setLeads((prev) => prev.filter((item) => item.id !== id));
//   } else {
//     console.error("Error deleting lead:", error);
//   }
// };

//   return (
//     <>
//     <AdminNavbar />
//     <section className="admin-contacts">
//       <h2>Commission Plan Queries</h2>

//       {leads.length === 0 ? (
//         <p className="no-messages">No commission queries yet.</p>
//       ) : (
//         <div className="messages-container">
//           {leads.map((item) => (
//             <div key={item.id} className="message-card">

//                 <button
//   className="close-btn"
//   onClick={() => deleteLead(item.id)}
// >
//   ✖
// </button>

//               <h4>{item.fullname}</h4>
//               <p className="message-email">{item.email}</p>

//               <p><strong>Phone:</strong> {item.phone}</p>
//               <p><strong>City:</strong> {item.city}</p>
//               <p><strong>Plan:</strong> {item.plan}</p>

//               <p className="message-text">{item.message}</p>

//               <small className="message-date">
//                 {item.created_at
//                   ? new Date(item.created_at).toLocaleString()
//                   : "No date"}
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
import "../Admin/AdminContacts.css"; // reuse table styles
import AdminNavbar from "./AdminNavbar";

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

    if (!error) setLeads(data || []);
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this query?")) return;

    await supabase.from("commission_leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((item) => item.id !== id));
  };

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
                <th>City</th>
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
                  <td>{item.city}</td>
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