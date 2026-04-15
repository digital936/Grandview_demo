import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./admincalls.css";
import AdminNavbar from "./AdminNavbar";

export default function AdminScheduledCalls() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetchCalls();
  }, []);

  async function fetchCalls() {
    const { data, error } = await supabase
      .from("scheduled_calls")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setCalls(data);
    }
  }

  return (
    <>
      <AdminNavbar />
    <div className="admin-page">
      <h2>📞 Scheduled Calls</h2>

      <div className="calls-table">
        <div className="calls-header">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Agent</span>
          <span>Date</span>
          <span>Time</span>
        </div>

        {calls.map((call) => (
          <div key={call.id} className="calls-row">
            <span>{call.name}</span>
            <span>{call.email}</span>
            <span>{call.phone}</span>
            <span>{call.person}</span>
            <span>{call.date}</span>
            <span>{call.time}</span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}