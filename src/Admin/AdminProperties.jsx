import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/admin-properties.css";

import AdminNavbar from "./AdminNavbar";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const initialFormState = {
    title: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    address: "",
    zipcode: "",
    city: "",
    imageUrl: "",
    images: [],
    category: "rent",
    zillow_url: "",
    description: "",
    featured: false,
    status: "available",
  };

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProperties(data);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function openAddForm() {
    setForm(initialFormState);
    setEditingId(null);
    setShowForm(true);
  }

function handleEdit(property) {
  let images = [];

  if (Array.isArray(property.images)) {
    images = property.images;
  } else if (typeof property.images === "string") {
    try {
      images = JSON.parse(property.images);
    } catch {
      images = [];
    }
  }

  setForm({
    title: property.title || "",
    price: property.price || "",
    beds: property.beds || "",
    baths: property.baths || "",
    sqft: property.sqft || "",
    address: property.address || "",
    zipcode: property.zipcode || "",
    city: property.city || "",
    imageUrl: property.imageUrl || "",
    zillow_url: property.zillow_url || "",
    description: property.description || "",
    category: property.category || "rent",
    status: property.status || "available",
    featured: property.featured || false,
    images: images, // ✅ FIXED
  });

  setEditingId(property.id);
  setShowForm(true);
}

  async function handleSubmit(e) {
  e.preventDefault();

  // ✅ CLEAN IMAGES
  const cleanImages = (form.images || []).filter(
    (img) => img && img !== "null"
  );

  // ✅ FIX BIGINT FIELDS
  const payload = {
    ...form,

    price: form.price ? Number(form.price) : null,
    beds: form.beds ? Number(form.beds) : null,
    baths: form.baths ? Number(form.baths) : null,
    sqft: form.sqft ? Number(form.sqft) : null,
    zipcode: form.zipcode ? Number(form.zipcode) : null,

    images: JSON.stringify(cleanImages),
  };

  const { error } = editingId
    ? await supabase
        .from("properties")
        .update(payload)
        .eq("id", editingId)
    : await supabase
        .from("properties")
        .insert([payload]);

  if (error) {
    console.log("SUPABASE ERROR:", error);
    alert("Error saving property");
    return;
  }

  setShowForm(false);
  setEditingId(null);
  setForm(initialFormState);
  fetchProperties();
}
  

  async function handleImageUpload(files) {
  const selectedFiles = Array.from(files); // ✅ NO LIMIT
  const uploadedUrls = [];

  for (let file of selectedFiles) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("property-gallery")
      .upload(fileName, file);

    if (error) {
      console.log("Upload error:", error);
      continue;
    }

    const { data } = supabase.storage
      .from("property-gallery")
      .getPublicUrl(fileName);

    uploadedUrls.push(data.publicUrl);
  }

  // ✅ IMPORTANT: KEEP OLD + ADD NEW
  setForm((prev) => ({
    ...prev,
    images: [...(prev.images || []), ...uploadedUrls],
  }));
}

async function handleDelete(id) {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    alert("Delete failed");
    return;
  }

  setProperties((prev) => prev.filter((p) => p.id !== id));
}

  return (
    <>
    <AdminNavbar />
    <div className="admin-properties-page">

      <div className="admin-header">
        <h2>Manage Properties</h2>
        <button className="add-btn" onClick={openAddForm}>
          + Add Property
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="form-modal">
          <div className="form-container">

            <h3>{editingId ? "Update Property" : "Add New Property"}</h3>

            <form className="admin-form" onSubmit={handleSubmit}>

              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
              <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
              <input name="beds" placeholder="Beds" value={form.beds} onChange={handleChange} />
              <input name="baths" placeholder="Baths" value={form.baths} onChange={handleChange} />
              <input name="sqft" placeholder="Sqft" value={form.sqft} onChange={handleChange} />
              <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
              <input name="zipcode" placeholder="Zip Code" value={form.zipcode} onChange={handleChange} />
              <input name="city" placeholder="City" value={form.city} onChange={handleChange} />

              {/* MAIN IMAGE */}
              <input
                name="imageUrl"
                placeholder="Main Image URL"
                value={form.imageUrl}
                onChange={handleChange}
              />

              <input
                name="zillow_url"
                placeholder="Zillow Link"
                value={form.zillow_url}
                onChange={handleChange}
              />

              <select name="category" value={form.category} onChange={handleChange}>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>

              <select name="status" value={form.status} onChange={handleChange}>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
              </select>

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="description-box"
              />

              {/* IMAGE UPLOAD */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <p style={{ fontSize: "12px", color: "gray", margin: 0 }}>
                  Upload multiple images
                </p>
              </div>

              {/* ✅ PREVIEW IMAGES */}
              {/* <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {form.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                ))}
              </div> */}

              <div className="image-preview">
  {form.images?.map((img, i) => (
    <div className="image-box" key={i}>
      <img src={img} alt="preview" />

      {/* ❌ REMOVE BUTTON */}
      <button
  type="button"   // ✅ PREVENT FORM SUBMIT
  className="remove-img"
  onClick={() => {
    const updated = form.images.filter((_, index) => index !== i);
    setForm({ ...form, images: updated });
  }}
>
  ✕
</button>
    </div>
  ))}
</div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                Featured Property
              </label>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingId ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* PROPERTY GRID */}
      <div className="admin-property-grid">
        {properties.map((property) => (
          <div className="admin-property-card" key={property.id}>
            <img src={property.imageUrl} alt={property.title} />

            <div className="property-details">
              <h3>{property.title}</h3>
              <p className="price">${property.price}</p>
              <p>{property.city}</p>
              <p>Status: <b>{property.status}</b></p>
            </div>

            <div className="actions">
              <button onClick={() => handleEdit(property)}>Edit</button>
              <button onClick={() => handleDelete(property.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}