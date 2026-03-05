


// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../Admin/AdminTourRequests.css";

// export default function AdminTourRequests() {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   async function fetchRequests() {
//     const { data, error } = await supabase
//       .from("tour_requests")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (!error) setRequests(data);
//   }

//   const approveRequest = async (id) => {
//     await supabase
//       .from("tour_requests")
//       .update({ status: "approved" })
//       .eq("id", id);

//     fetchRequests();
//   };

//   // 🔹 Generate Public URL for license
//   const getLicenseUrl = (path) => {
//     if (!path) return null;

//     const { data } = supabase
//       .storage
//       .from("licenses")   // 👈 your bucket name (change if different)
//       .getPublicUrl(path);

//     return data.publicUrl;
//   };

//   return (
//     <div className="admin-wrapper">
//       <div className="admin-container">
//         <h2 className="admin-title">Tour Requests</h2>

//         {requests.map((req) => {
//           const licenseUrl = getLicenseUrl(req.license_path);

//           return (
//             <div key={req.id} className="request-card">

//               <div className="request-header">
//                 <div className="request-name">{req.name}</div>

//                 <span
//                   className={`status-badge ${
//                     req.status === "approved"
//                       ? "status-approved"
//                       : "status-pending"
//                   }`}
//                 >
//                   {req.status}
//                 </span>
//               </div>

//               <div className="request-details">
//                 <p><strong>Email:</strong> {req.email}</p>
//                 <p><strong>Phone:</strong> {req.phone}</p>
//                 <p><strong>Date:</strong> {req.date}</p>
//                 <p><strong>Time:</strong> {req.time}</p>
//               </div>

//               {/* 🔹 Driving License Preview */}
//               {licenseUrl && (
//                 <div className="license-preview">
//                   <p><strong>Driving Licence:</strong></p>
//                   <img
//                     src={licenseUrl}
//                     alt="Driving License"
//                     className="license-image"
//                   />
//                 </div>
//               )}

//               {req.status === "pending" && (
//                 <button
//                   className="approve-btn"
//                   onClick={() => approveRequest(req.id)}
//                 >
//                   Approve Request
//                 </button>
//               )}

//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminTourRequests.css";

export default function AdminTourRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {

    const { data, error } = await supabase
      .from("tour_requests")
      .select("*")
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

  return (

    <div className="admin-wrapper">

      <h2 className="admin-title">Tour Requests</h2>

      <table className="tour-table">

        <thead>
          <tr>
            <th>Name</th>
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

  );
}