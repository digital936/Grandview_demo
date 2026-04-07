
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminTourRequests.css";

import AdminNavbar from "./AdminNavbar";

export default function AdminTourRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
    markAsRead();
  }, []);

  async function fetchRequests() {

    const { data, error } = await supabase
      .from("tour_requests")
      .select(`
  *,
  properties ( title )
`)
      .order("created_at", { ascending: false });

    if (!error) {
      setRequests(data);
    }
  }

  // Approve request
  const approveRequest = async (id) => {

    await supabase
      .from("tour_requests")
      .update({ status: "approved" })
      .eq("id", id);

    fetchRequests();
  };

  // Delete request
  const deleteRequest = async (id) => {

    const confirmDelete = window.confirm("Delete this request?");

    if (!confirmDelete) return;

    await supabase
      .from("tour_requests")
      .delete()
      .eq("id", id);

    fetchRequests();
  };

  // Generate license public URL
  const getLicenseUrl = (path) => {

    if (!path) return null;

    const { data } = supabase
      .storage
      .from("licenses")
      .getPublicUrl(path);

    return data.publicUrl;
  };

  async function markAsRead() {
  await supabase
    .from("tour_requests")
    .update({ is_read: true })
    .eq("is_read", false);
}

  return (
    <>
    <AdminNavbar />

    <div className="admin-wrapper">

      <h2 className="admin-title">Tour Requests</h2>

      <table className="tour-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Property</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            
            <th>Time</th>
            <th>Status</th>
            <th>License</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {requests.map((req) => {

            const licenseUrl = getLicenseUrl(req.license_path);

            return (
              <tr key={req.id}>

                <td>{req.name}</td>
                <td>{req.properties?.title || "—"}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.date}</td>
                
                <td>{req.time}</td>

                <td>
                  <span
                    className={
                      req.status === "approved"
                        ? "status-approved"
                        : "status-pending"
                    }
                  >
                    {req.status}
                  </span>
                </td>

                {/* View License Button */}
                <td>
                  {licenseUrl && (
                    <a
                      href={licenseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="view-license-btn"
                    >
                      View License
                    </a>
                  )}
                </td>

                {/* Actions */}
                <td>

                  {req.status === "pending" && (
                    <button
                      className="approve-btn"
                      onClick={() => approveRequest(req.id)}
                    >
                      Approve
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() => deleteRequest(req.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
    </>

  );
}