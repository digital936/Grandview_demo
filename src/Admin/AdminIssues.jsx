import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminIssues.css";

export default function AdminIssues() {

const [issues, setIssues] = useState([]);
const [selectedIssue, setSelectedIssue] = useState(null);

const [showEdit, setShowEdit] = useState(false);
const [showTimeline, setShowTimeline] = useState(false);

const [status, setStatus] = useState("");
const [actionNote, setActionNote] = useState("");
const [actions, setActions] = useState([]);

useEffect(() => {
fetchIssues();
}, []);

async function fetchIssues() {


const { data } = await supabase
  .from("issues")
  .select(`
    *,
    properties(title)
  `)
  .order("created_at", { ascending: false });

setIssues(data || []);


}

function openEdit(issue) {
setSelectedIssue(issue);
setStatus(issue.status);
setShowEdit(true);
}

function closeEdit() {
setShowEdit(false);
setActionNote("");
}

async function updateIssue() {


await supabase
  .from("issues")
  .update({ status })
  .eq("id", selectedIssue.id);

if (actionNote.trim() !== "") {
  await supabase
    .from("issue_actions")
    .insert({
      issue_id: selectedIssue.id,
      action_text: actionNote
    });
}

closeEdit();
fetchIssues();


}

async function openTimeline(issue) {


setSelectedIssue(issue);

const { data } = await supabase
  .from("issue_actions")
  .select("*")
  .eq("issue_id", issue.id)
  .order("created_at", { ascending: false });

setActions(data || []);
setShowTimeline(true);


}

function closeTimeline(){
setShowTimeline(false);
}

return (


<div className="admin-page">

  <h1>Tenant Issues</h1>

  <div className="table-wrapper">

    <table>

      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Property</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {issues.map(issue => (

          <tr key={issue.id}>

            <td>{issue.title}</td>

            <td>{issue.description}</td>

            <td>{issue.properties?.title}</td>

            <td>
              <span className={`status ${issue.status}`}>
                {issue.status}
              </span>
            </td>

            <td>
              {new Date(issue.created_at).toLocaleDateString()}
            </td>

            <td>

              <button
                className="edit-btn"
                onClick={() => openEdit(issue)}
              >
                Edit
              </button>

              <button
                className="timeline-btn"
                onClick={() => openTimeline(issue)}
              >
                Timeline
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  {/* EDIT MODAL */}

  {showEdit && (

    <div className="modal">

      <div className="modal-box">

        <button className="close-modal" onClick={closeEdit}>✕</button>

        <h3>Update Issue</h3>

        {/* <label>Status</label> */}

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        {/* <label>Action Taken</label> */}

        <textarea
          placeholder="Write action taken..."
          value={actionNote}
          onChange={(e)=>setActionNote(e.target.value)}
        />

        <div className="modal-buttons">

          <button
            className="save-btn"
            onClick={updateIssue}
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={closeEdit}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  )}

  {/* TIMELINE MODAL */}

  {showTimeline && (

    <div className="modal">

      <div className="modal-box">

        <button className="close-modal" onClick={closeTimeline}>✕</button>

        <h3>Action Timeline</h3>

        {actions.length === 0 ? (
          <p>No actions yet</p>
        ) : (

          <ul className="timeline">

            {actions.map(action => (

              <li key={action.id}>

                <div className="timeline-dot"></div>

                <div>

                  <p>{action.action_text}</p>

                  <small>
                    {new Date(action.created_at).toLocaleString()}
                  </small>

                </div>

              </li>

            ))}

          </ul>

        )}

      </div>

    </div>

  )}

</div>

);
}
