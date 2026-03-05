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
    }
  }

  return (
    <section className="admin-contacts">
  <h2>Customer Messages</h2>

  {contacts.length === 0 ? (
    <p className="no-messages">No messages yet.</p>
  ) : (
    <div className="messages-container">
      {contacts.map((item) => (
        <div key={item.id} className="message-card">
          <h4>{item.name}</h4>
          <p className="message-email">{item.email}</p>
          <p className="message-text">{item.message}</p>
          <small className="message-date">
            {new Date(item.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )}
</section>
  );
}