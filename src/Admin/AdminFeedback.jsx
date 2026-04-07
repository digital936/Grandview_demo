

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminFeedback.css";
import AdminNavbar from "./AdminNavbar";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
    markAsRead();
  }, []);

  async function fetchFeedbacks() {
    setLoading(true);

    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
    } else {
      setFeedbacks(data || []);
    }

    setLoading(false);
  }

  async function deleteFeedback(id) {
    const confirmDelete = window.confirm("Delete this feedback?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("feedback")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting");
    } else {
      fetchFeedbacks();
    }
  }

  if (loading) {
    return <h2 className="loading">Loading feedback...</h2>;
  }

  async function markAsRead() {
  await supabase
    .from("feedback")
    .update({ is_read: true })
    .eq("is_read", false);
}

  return (
    <>
      <AdminNavbar />

      <div className="feedback-page">
        <div className="feedback-header">
    <h2>Customer Feedback</h2>
  </div>

        <div className="table-container">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{"⭐".repeat(item.rating)}</td>
                  <td className="msg">{item.message}</td>
                  <td>
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteFeedback(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {feedbacks.length === 0 && (
            <p className="empty">No feedback found</p>
          )}
        </div>
      </div>
    </>
  );
}