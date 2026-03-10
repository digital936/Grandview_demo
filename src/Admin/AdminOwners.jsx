import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "./admin-owners.css";
import { useNavigate } from "react-router-dom";



export default function AdminOwners() {

  const [properties, setProperties] = useState([]);
  const [owners, setOwners] = useState([]);
  const [allProperties, setAllProperties] = useState([]);

  const [editingOwner, setEditingOwner] = useState(null);
const [selectedProperty, setSelectedProperty] = useState("");
const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    property_id: ""
  });

  useEffect(() => {
    fetchProperties();
    fetchOwners();
  }, []);

  // Fetch properties
  async function fetchProperties() {

    // properties for dropdown (only unassigned)
    const { data: available } = await supabase
      .from("properties")
      .select("*")
      .is("owner_id", null);

    if (available) setProperties(available);

    // ALL properties for owner list
    const { data: all } = await supabase
      .from("properties")
      .select("*");

    if (all) setAllProperties(all);
  }

  // Fetch owners
  async function fetchOwners() {

    const { data, error } = await supabase
      .from("owners")
      .select("*");

    if (!error) setOwners(data || []);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Create owner
  async function createOwner(e) {

    e.preventDefault();

    try {

      // 1️⃣ Create auth user
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password
      });

      if (error) throw error;

      const userId = data.user.id;

      // 2️⃣ Insert profile
      await supabase.from("profiles").insert({
        id: userId,
        email: form.email,
        role: "owner"
      });

      // 3️⃣ Insert owner
      const { data: owner, error: ownerError } = await supabase
        .from("owners")
        .insert({
          user_id: userId,
          name: form.name,
          email: form.email
        })
        .select()
        .single();

      if (ownerError) throw ownerError;

      // 4️⃣ Assign property
      await supabase
        .from("properties")
        .update({
          owner_id: owner.id
        })
        .eq("id", form.property_id);

      alert("Owner created and property assigned");

      setForm({
        name: "",
        email: "",
        password: "",
        property_id: ""
      });

      fetchOwners();
      fetchProperties();

    } catch (err) {
      alert(err.message);
    }
  }

  async function assignProperty() {

  if (!selectedProperty) {
    alert("Please select property");
    return;
  }

  try {

    await supabase
      .from("properties")
      .update({
        owner_id: editingOwner.id
      })
      .eq("id", selectedProperty);

    alert("Property assigned successfully");

    setEditingOwner(null);
    setSelectedProperty("");

    fetchOwners();
    fetchProperties();

  } catch (err) {
    alert(err.message);
  }

}

  // Delete owner
  async function deleteOwner(id) {

  if (!window.confirm("Delete this owner?")) return;

  try {

    // 1️⃣ Get user_id from owner
    const { data: ownerData, error: fetchError } = await supabase
      .from("owners")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const userId = ownerData.user_id;

    // 2️⃣ Remove owner from properties
    await supabase
      .from("properties")
      .update({ owner_id: null })
      .eq("owner_id", id);

    // 3️⃣ Delete owner
    const { error: ownerDeleteError } = await supabase
      .from("owners")
      .delete()
      .eq("id", id);

    if (ownerDeleteError) throw ownerDeleteError;

    // 4️⃣ Delete profile
    const { error: profileDeleteError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (profileDeleteError) throw profileDeleteError;

    fetchOwners();
    fetchProperties();

  } catch (err) {
    alert("Failed to delete owner: " + err.message);
  }
}

  return (
    <div className="admin-owners">

      <h2>Create Owner</h2>

      <form onSubmit={createOwner}>

        <input
          name="name"
          placeholder="Owner Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Owner Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="property_id"
          value={form.property_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Property</option>

          {properties.map(p => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}

        </select>

        <button>Create Owner</button>

      </form>

      {/* OWNER LIST */}

      <h2 className="owner-list-title">Owner List</h2>

      <table className="owner-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Properties</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {owners.map(owner => {

            const ownerProperties = allProperties.filter(
              p => p.owner_id === owner.id
            );

            return (
              <tr key={owner.id}>
                <td>{owner.name}</td>
                <td>{owner.email}</td>

                <td>
                  {ownerProperties.length > 0
                    ? ownerProperties.map(p => p.title).join(", ")
                    : "No Properties"}
                </td>

                {/* <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteOwner(owner.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => editOwner(owner.id)}
                  >
                    Edit
                  </button>
                </td> */}

                <td>
  <button
  className="edit-btn"
  onClick={() => navigate(`/edit-owner/${owner.id}`)}
>
  Edit
</button>

  <button
    className="delete-btn"
    onClick={() => deleteOwner(owner.id)}
  >
    Delete
  </button>
</td>

              </tr>
            );
          })}

        </tbody>

      </table>

      {editingOwner && (
  <div className="edit-owner-box">

    <h3>Edit Owner: {editingOwner.name}</h3>

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

    <button onClick={() => setEditingOwner(null)}>
      Cancel
    </button>

  </div>
)}

    </div>
  );
}