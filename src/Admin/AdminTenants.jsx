


import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "./admin-tenants.css";

export default function AdminTenants() {
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    property_id: ""
  });

  useEffect(() => {
    fetchProperties();
    fetchTenants();
  }, []);

  // async function fetchProperties() {
  //   const { data, error } = await supabase
  //     .from("properties")
  //     .select("*")
  //     .eq("status", "available");

  //   if (error) {
  //     alert("Error fetching properties: " + error.message);
  //   } else {
  //     setProperties(data || []);
  //   }
  // }

  async function fetchProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*");

  if (error) {
    alert("Error fetching properties: " + error.message);
  } else {
    setProperties(data || []);
  }
}

  async function fetchTenants() {
    const { data, error } = await supabase
      .from("tenants")
      .select("id, name, email, property_id");

    if (error) {
      alert("Error fetching tenants: " + error.message);
    } else {
      setTenants(data || []);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function createTenant(e) {
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
        role: "tenant"
      });

      // 3️⃣ Insert tenant with property_id
      const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .insert({
          user_id: userId,
          name: form.name,
          email: form.email,
          property_id: form.property_id
        })
        .select()
        .single();

      if (tenantError) throw tenantError;

      // 4️⃣ Assign property as rented with tenant_id
      await supabase
        .from("properties")
        .update({
          status: "rented",
          tenant_id: tenant.id
        })
        .eq("id", form.property_id);

      alert("Tenant created and property assigned");

      // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
        property_id: ""
      });

      // Refresh tenant and property lists
      fetchTenants();
      fetchProperties();

    } catch (err) {
      alert(err.message);
    }
  }

  async function deleteTenant(id) {
  if (!window.confirm("Delete this tenant?")) return;

  try {

    // 1️⃣ Get tenant data to find user_id
    const { data: tenantData, error: tenantFetchError } = await supabase
      .from("tenants")
      .select("user_id")
      .eq("id", id)
      .single();

    if (tenantFetchError) throw tenantFetchError;

    const userId = tenantData.user_id;

    // 2️⃣ Remove tenant from property
    await supabase
      .from("properties")
      .update({
        tenant_id: null,
        status: "available"
      })
      .eq("tenant_id", id);

    // 3️⃣ Delete tenant record
    const { error: tenantDeleteError } = await supabase
      .from("tenants")
      .delete()
      .eq("id", id);

    if (tenantDeleteError) throw tenantDeleteError;

    // 4️⃣ Delete profile
    const { error: profileDeleteError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (profileDeleteError) throw profileDeleteError;

    fetchTenants();
    fetchProperties();

  } catch (err) {
    alert("Failed to delete tenant: " + err.message);
  }
}

  return (
    <div className="admin-tenants">

      <h2>Create Tenant</h2>

      <form onSubmit={createTenant}>

        <input
          name="name"
          placeholder="Tenant Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Tenant Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
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

        <button>Create Tenant</button>

      </form>

      {/* TENANT LIST */}

      <h2 className="tenant-list-title">Tenant List</h2>

      <table className="tenant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Property</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tenants.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{properties.find(p => p.id === t.property_id)?.title || "Not Assigned"}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteTenant(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}