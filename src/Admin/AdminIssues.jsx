import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminIssues.css";

export default function AdminIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  async function fetchIssues() {
    const { data, error } = await supabase
      .from("issues")
      .select(`
        *,
        properties(title)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setIssues(data);
    }
  }

  return (
    <div className="admin-page">
      <h1>Tenant Issues</h1>

      {issues.length === 0 ? (
        <p>No issues reported.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Property</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.title}</td>
                <td>{issue.description}</td>
                <td>{issue.properties?.title || "N/A"}</td>
                <td>{issue.status}</td>
                <td>{new Date(issue.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}