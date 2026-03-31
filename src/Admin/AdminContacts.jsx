
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminContacts.css";

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

    if (!error) {
      setContacts(data);
    } else {
      console.error("Error fetching contacts:", error);
    }
  }

  // ✅ Delete function
  async function deleteMessage(id) {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id);

    if (!error) {
      setContacts((prev) => prev.filter((item) => item.id !== id));
    } else {
      console.error("Error deleting message:", error);
    }
  }

  return (
    <section className="admin-contacts">
      <h2>Contact Messages</h2>

      {contacts.length === 0 ? (
        <p className="no-messages">No messages yet.</p>
      ) : (
        <div className="messages-container">
          {contacts.map((item) => (
            <div key={item.id} className="message-card">

              {/* ❌ Close Button */}
              <button
                className="close-btn"
                onClick={() => deleteMessage(item.id)}
              >
                ✖
              </button>

              <h4>{item.name}</h4>
              <p className="message-email">{item.email}</p>
              <p className="message-text">{item.message}</p>

              {/* ✅ Fixed Time */}
              <small className="message-date">
                {item.created_at
                  ? new Date(item.created_at).toLocaleString("en-US", {
                      timeZone: "America/Chicago",
                    })
                  : "No date"}
              </small>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}