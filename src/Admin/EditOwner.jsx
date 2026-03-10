import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./edit-owner.css";

export default function EditOwner() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [owner, setOwner] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");

  useEffect(() => {
    fetchOwner();
    fetchProperties();
  }, []);

  async function fetchOwner() {
    const { data } = await supabase
      .from("owners")
      .select("*")
      .eq("id", id)
      .single();

    setOwner(data);
  }

  async function fetchProperties() {

    const { data } = await supabase
      .from("properties")
      .select("*")
      .is("owner_id", null);

    setProperties(data || []);
  }

  async function assignProperty() {

    if (!selectedProperty) {
      alert("Select property");
      return;
    }

    await supabase
      .from("properties")
      .update({ owner_id: id })
      .eq("id", selectedProperty);

    alert("Property assigned");

    navigate("/admin-owners");
  }

  return (
    <div className="edit-owner-page">

      
        <div>
      {owner && (
        <div className="owner-card">
            <h3>Edit Owner</h3>

          <p><strong>Name:</strong> {owner.name}</p>
          <p><strong>Email:</strong> {owner.email}</p>

          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select Property</option>

            {properties.map(p => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}

          </select>

          <button onClick={assignProperty}>
            Assign Property
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

        </div>
      )}
      </div>

    </div>
  );
}