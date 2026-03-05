// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../Admin/AdminFeedback.css";

// export default function AdminFeedback() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   async function fetchFeedbacks() {
//     const { data, error } = await supabase
//       .from("feedbacks")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("Error fetching feedback:", error);
//     } else {
//       setFeedbacks(data);
//     }

//     setLoading(false);
//   }

//   if (loading) {
//     return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading feedback...</h2>;
//   }

//   return (
//     <section className="admin-feedback-page">
//       <div className="admin-feedback-container">
//         <h2>Customer Feedback</h2>

//         {feedbacks.length === 0 ? (
//           <p>No feedback submitted yet.</p>
//         ) : (
//           <div className="feedback-list">
//             {feedbacks.map((item) => (
//               <div key={item.id} className="feedback-card">
//                 <h3>{item.name}</h3>
//                 <p><strong>Email:</strong> {item.email}</p>
//                 <p><strong>Rating:</strong> {"⭐".repeat(item.rating)}</p>
//                 <p className="message">{item.message}</p>
//                 <small>
//                   {new Date(item.created_at).toLocaleString()}
//                 </small>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminFeedback.css";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // FETCH FEEDBACK
  async function fetchFeedbacks() {
    setLoading(true);

    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching feedback:", error.message);
    } else {
      setFeedbacks(data || []);
    }

    setLoading(false);
  }

  // DELETE FEEDBACK
  async function deleteFeedback(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("feedback")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting feedback");
      console.error(error);
    } else {
      alert("Feedback deleted successfully");
      fetchFeedbacks(); // refresh list
    }
  }

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading feedback...
      </h2>
    );
  }

  return (
    <section className="admin-feedback-page">
      <div className="admin-feedback-container">
        <h2>Customer Feedback</h2>

        {feedbacks.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <div className="feedback-list">
            {feedbacks.map((item) => (
              <div key={item.id} className="feedback-card">
                <h3>{item.name}</h3>

                <p>
                  <strong>Email:</strong> {item.email}
                </p>

                <p>
                  <strong>Rating:</strong> {"⭐".repeat(item.rating)}
                </p>

                <p className="message">{item.message}</p>

                <small>
                  {new Date(item.created_at).toLocaleString()}
                </small>

                <br />

                <button
                  className="delete-btn"
                  onClick={() => deleteFeedback(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}