
// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../Admin/AdminContacts.css";

// import AdminNavbar from "./AdminNavbar";

// export default function AdminContacts() {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   async function fetchContacts() {
//     const { data, error } = await supabase
//       .from("contacts")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (!error) {
//       setContacts(data);
//     } else {
//       console.error("Error fetching contacts:", error);
//     }
//   }

//   // ✅ Delete function
//   async function deleteMessage(id) {
//     const confirmDelete = window.confirm("Delete this message?");
//     if (!confirmDelete) return;

//     const { error } = await supabase
//       .from("contacts")
//       .delete()
//       .eq("id", id);

//     if (!error) {
//       setContacts((prev) => prev.filter((item) => item.id !== id));
//     } else {
//       console.error("Error deleting message:", error);
//     }
//   }

//   return (
//     <>
//     <AdminNavbar />

//     <section className="admin-contacts">
//       <h2>Contact Messages</h2>

//       {contacts.length === 0 ? (
//         <p className="no-messages">No messages yet.</p>
//       ) : (
//         <div className="messages-container">
//           {contacts.map((item) => (
//             <div key={item.id} className="message-card">

//               {/* ❌ Close Button */}
//               <button
//                 className="close-btn"
//                 onClick={() => deleteMessage(item.id)}
//               >
//                 ✖
//               </button>

//               <h4>{item.name}</h4>
//               <p className="message-email">{item.email}</p>
//               <p className="message-text">{item.message}</p>

//               {/* ✅ Fixed Time */}
//               <small className="message-date">
//                 {item.created_at
//                   ? new Date(item.created_at).toLocaleString("en-US", {
//                       timeZone: "America/Chicago",
//                     })
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
import "../Admin/AdminContacts.css";
import AdminNavbar from "./AdminNavbar";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setContacts(data || []);
  }

  async function deleteMessage(id) {
    if (!window.confirm("Delete this message?")) return;

    await supabase.from("contacts").delete().eq("id", id);
    setContacts((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <>
      <AdminNavbar />

      <div className="contacts-page">

        {/* HEADER */}
        <div className="contacts-header">
          <h2>Contact Messages</h2>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td className="msg">{item.message}</td>
                  <td>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "No date"}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteMessage(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {contacts.length === 0 && (
            <p className="empty">No messages found</p>
          )}
        </div>
      </div>
    </>
  );
}