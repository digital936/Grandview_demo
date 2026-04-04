
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/admin-properties.css";
import AdminNavbar from "./AdminNavbar";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });
    setProperties(data || []);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function openAddForm() {
    setForm(initialFormState);
    setEditingId(null);
    setShowForm(true);
  }

  function handleEdit(property) {
    let images = [];
    try {
      images = JSON.parse(property.images || "[]");
    } catch {}
    setForm({ ...property, images });
    setEditingId(property.id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      beds: Number(form.beds),
      baths: Number(form.baths),
      sqft: Number(form.sqft),
      zipcode: Number(form.zipcode),
      images: JSON.stringify(form.images || []),
    };
    if (editingId) {
      await supabase.from("properties").update(payload).eq("id", editingId);
    } else {
      await supabase.from("properties").insert([payload]);
    }
    setShowForm(false);
    fetchProperties();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this property?")) return;
    await supabase.from("properties").delete().eq("id", id);
    fetchProperties();
  }

  async function handleImageUpload(files) {
    const urls = [];
    for (let file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      await supabase.storage.from("property-gallery").upload(fileName, file);
      const { data } = supabase.storage.from("property-gallery").getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }
    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
  }

  function exportToExcel() {
    const data = properties.map((p) => ({
      Title: p.title,
      Price: p.price,
      Beds: p.beds,
      Baths: p.baths,
      City: p.city,
      Status: p.status,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Properties");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "properties.xlsx");
  }

  return (
    <>
      <AdminNavbar />

      <div className="admin-page">

        {/* HEADER */}
        <div className="admin-header">
          <div>
            <h2>Properties</h2>
            <p className="admin-subtitle">{properties.length} total listings</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-export" onClick={exportToExcel}>Export</button>
            <button className="btn btn-add" onClick={openAddForm}>+ Add Property</button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-wrap">
          <table className="property-table">
            <thead>
              <tr>
                <th style={{ width: 72 }}>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Beds / Baths</th>
                <th>Sqft</th>
                <th>City</th>
                <th>Status</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length === 0 && (
                <tr>
                  <td colSpan={9} className="table-empty">No properties found.</td>
                </tr>
              )}
              {properties.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.imageUrl || "https://placehold.co/60x45/f1f5f9/94a3b8?text=—"}
                      alt={p.title}
                      className="table-img"
                    />
                  </td>
                  <td>
                    <div className="prop-title">{p.title}</div>
                    <div className="prop-address">{p.address}</div>
                  </td>
                  <td className="price-cell">${Number(p.price).toLocaleString()}</td>
                  <td className="center-cell">{p.beds} / {p.baths}</td>
                  <td className="center-cell">{p.sqft ? Number(p.sqft).toLocaleString() : "—"}</td>
                  <td>{p.city}</td>
                  <td>
                    <span className={`badge badge-${p.status}`}>
                      {p.status === "available" ? "Available" : "Rented"}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-category">
                      {p.category === "rent" ? "Rent" : "Sale"}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn-action btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                      <button className="btn-action btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FORM MODAL */}
        {showForm && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
            <div className="modal">
              <div className="modal-header">
                <h3>{editingId ? "Edit Property" : "Add Property"}</h3>
                <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
              </div>

              <form className="form-modern" onSubmit={handleSubmit}>

                {/* BASIC INFO */}
                <div className="form-section">
                  <h4>Basic Info</h4>
                  <div className="grid-1">
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Property title" required />
                  </div>
                  <div className="grid-4" style={{ marginTop: 10 }}>
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Price ($)" type="number" min="0" />
                    <input name="sqft" value={form.sqft} onChange={handleChange} placeholder="Sq. feet" type="number" min="0" />
                    <input name="beds" value={form.beds} onChange={handleChange} placeholder="Bedrooms" type="number" min="0" />
                    <input name="baths" value={form.baths} onChange={handleChange} placeholder="Bathrooms" type="number" min="0" />
                  </div>
                </div>

                {/* LOCATION */}
                <div className="form-section">
                  <h4>Location</h4>
                  <div className="grid-1">
                    <input name="address" value={form.address} onChange={handleChange} placeholder="Street address" />
                  </div>
                  <div className="grid-2" style={{ marginTop: 10 }}>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
                    <input name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="Zip code" />
                  </div>
                </div>

                {/* SETTINGS */}
                <div className="form-section">
                  <h4>Settings</h4>
                  <div className="grid-2">
                    <select name="status" value={form.status} onChange={handleChange}>
                      <option value="available">Available</option>
                      <option value="rented">Rented</option>
                    </select>
                    <select name="category" value={form.category} onChange={handleChange}>
                      <option value="rent">For Rent</option>
                      <option value="sale">For Sale</option>
                    </select>
                  </div>
                  <input
                    name="zillow_url"
                    value={form.zillow_url}
                    onChange={handleChange}
                    placeholder="Zillow URL"
                    style={{ marginTop: 10 }}
                  />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Property description…"
                    style={{ marginTop: 10 }}
                  />
                  <label className="checkbox-label">
                    <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                    Mark as featured property
                  </label>
                </div>

                {/* MEDIA */}
                <div className="form-section">
                  <h4>Media</h4>
                  <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Main image URL (https://…)" />
                  <div className="file-upload-area" style={{ marginTop: 10 }}>
                    <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e.target.files)} />
                    <span>Upload additional images — click or drag &amp; drop</span>
                  </div>
                  {form.images?.length > 0 && (
                    <div className="image-preview">
                      {form.images.map((img, i) => (
                        <div key={i} className="img-box">
                          <img src={img} alt={`upload-${i}`} />
                          <button
                            type="button"
                            className="img-remove"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                images: prev.images.filter((_, idx) => idx !== i),
                              }))
                            }
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-add">
                    {editingId ? "Update Property" : "Save Property"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}