
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./TenantDashboard.css";

export default function TenantDashboard() {

  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [issueForm, setIssueForm] = useState({
    property_id: "",
    title: "",
    description: ""
  });

  useEffect(() => {
    fetchMyProperty();
  }, []);

  async function fetchMyProperty() {

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user.id;

    const { data: tenant } = await supabase
      .from("tenants")
      .select("id")
      .eq("user_id", userId)
      .single();

    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("tenant_id", tenant.id);

    setProperties(data || []);

    if (data && data.length > 0) {
      setIssueForm(prev => ({
        ...prev,
        property_id: data[0].id
      }));
    }
  }

  function handleIssueChange(e) {
    setIssueForm({
      ...issueForm,
      [e.target.name]: e.target.value
    });
  }

  async function submitIssue(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("issues")
      .insert({
        property_id: issueForm.property_id,
        title: issueForm.title,
        description: issueForm.description,
        status: "pending"
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Issue reported successfully");

    setIssueForm({
      property_id: issueForm.property_id,
      title: "",
      description: ""
    });

    setShowForm(false);
  }

  return (
    <div className="tenant-dashboard">

      <h2 className="dashboard-title">My Property</h2>

      <div className="property-container">

        {properties.map((p) => (

          <div className="tenant-property-card" key={p.id}>

            <img
              src={p.imageUrl}
              alt="property"
              className="property-image"
            />

            <div className="property-details">

              <h3>{p.title}</h3>

              <p className="property-address">{p.address}</p>

              <p className="property-price">
                ${p.price}
              </p>

              {/* <p className="property-status">
                Status: {p.status}
              </p> */}

              <button
                className="report-btn"
                onClick={() => setShowForm(true)}
              >
                Report Issue
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* ISSUE MODAL */}

      {showForm && (
        <div className="issue-overlay">

          <div className="issue-modal">

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <h3>Report Maintenance Issue</h3>

            <form onSubmit={submitIssue}>

              <input
                type="text"
                name="title"
                placeholder="Issue Title"
                value={issueForm.title}
                onChange={handleIssueChange}
                required
              />

              <textarea
                name="description"
                placeholder="Describe the issue"
                value={issueForm.description}
                onChange={handleIssueChange}
                required
              />

              <button type="submit" className="submit-btn">
                Submit Issue
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}