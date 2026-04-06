
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
  const [tourCounts, setTourCounts] = useState({});
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  // --- NEW: Filter States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

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
    fetchTourCounts();
  }, []);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });
    setProperties(data || []);
  }

  // --- NEW: Filtering Logic ---
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      (p.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.address || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      String(p.status).toLowerCase() === filterStatus.toLowerCase();

    const matchesCategory =
      filterCategory === "all" ||
      String(p.category).toLowerCase() === filterCategory.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

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
    // UPDATED: Now exports only the filtered list, not everything!
    const data = filteredProperties.map((p) => ({
      Title: p.title,
      Price: p.price,
      Beds: p.beds,
      Baths: p.baths,
      City: p.city,
      Status: p.status,
      Category: p.category,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Properties");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "properties.xlsx");
  }

  async function fetchTourCounts() {
  const { data, error } = await supabase
    .from("tour_requests")
    .select("property_id");

  if (error) {
    console.error("Error fetching tour requests:", error);
    return;
  }

  // Count requests per property
  const counts = {};
  data.forEach((req) => {
    counts[req.property_id] = (counts[req.property_id] || 0) + 1;
  });

  setTourCounts(counts);
}

  return (
    <>
      <AdminNavbar />

      <div className="admin-page">

        {/* HEADER */}
        <div className="admin-header">
          <div>
            <h2>Properties</h2>
            <p className="admin-subtitle">
              Showing {filteredProperties.length} of {properties.length} listings
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-export" onClick={exportToExcel}>Export</button>
            <button className="btn btn-add" onClick={openAddForm}>+ Add Property</button>
            <button className="btn btn-secondary" onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}> {viewMode === "table" ? "Grid View" : "Table View"}</button>
          </div>
        </div>

        {/* --- NEW: FILTER BAR --- */}
        <div className="filter-bar">
          <div className="filter-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              placeholder="Search by title, city, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-selects">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
              <option value="pending">Pending</option>
            </select>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>
        </div>

        
        {/* <div className="table-wrap">
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
              {filteredProperties.length === 0 && (
                <tr>
                  <td colSpan={9} className="table-empty">No properties found matching your filters.</td>
                </tr>
              )}
              
              {filteredProperties.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.imageUrl || "https://placehold.co/60x45/f1f5f9/94a3b8?text=—"}
                      alt={p.title}
                      className="table-img"
                    />
                  </td>
                  <td>
                    
                    <div className="prop-title-wrapper">
    
                        <div className="prop-title">{p.title}</div>
                                {tourCounts[p.id] > 0 && (
                                  <div className="tour-badge">
                                    🔔 {tourCounts[p.id]}
                                  </div>
                                )}

                              </div>
                    
                    <div className="prop-address">{p.address}</div>
                  </td>
                  <td className="price-cell">${Number(p.price).toLocaleString()}</td>
                  <td className="center-cell">{p.beds} / {p.baths}</td>
                  <td className="center-cell">{p.sqft ? Number(p.sqft).toLocaleString() : "—"}</td>
                  <td>{p.city}</td>
                  
                  
                  <td>
                    <span 
                      className={`badge badge-${p.status ? String(p.status).toLowerCase().replace(/\s+/g, '-') : 'default'}`}
                    >
                      {p.status || "No Status"}
                    </span>
                  </td>
                  
                  
                  <td>
                    <span className="badge badge-category">
                      {p.category || "No Category"}
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
        </div> */}

        {viewMode === "table" ? (

  /* ================= TABLE VIEW ================= */
  <div className="table-wrap">
    <table className="property-table">
      <thead>
        <tr>
          <th>Image</th>
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
        {filteredProperties.map((p) => (
          <tr key={p.id}>
            <td>
              <img src={p.imageUrl} alt={p.title} className="table-img" />
            </td>

            <td>
              <div className="prop-title-wrapper">
                <div className="prop-title">{p.title}</div>
                {tourCounts[p.id] > 0 && (
                  <div className="tour-badge">🔔 {tourCounts[p.id]}</div>
                )}
              </div>
              <div className="prop-address">{p.address}</div>
            </td>

            <td>${p.price}</td>
            <td>{p.beds} / {p.baths}</td>
            <td>{p.sqft}</td>
            <td>{p.city}</td>

            <td>
              <span className={`badge badge-${p.status}`}>
                {p.status}
              </span>
            </td>

            <td>
              <span className="badge badge-category">
                {p.category}
              </span>
            </td>

            {/* <td>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </td> */}

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

) : (

  /* ================= GRID VIEW ================= */
  <div className="grid-view">
    {filteredProperties.map((p) => (
      <div className="property-card" key={p.id}>

        <div className="card-image">
          <img src={p.imageUrl} alt={p.title} />

          {tourCounts[p.id] > 0 && (
            <div className="tour-badge">🔔 {tourCounts[p.id]}</div>
          )}
        </div>

        <div className="card-body">
          <h3>{p.title}</h3>
          <p className="card-address">{p.address}</p>

          <div className="card-info">
            <span>💰 ${p.price}</span>
            <span>🛏 {p.beds}</span>
            <span>🛁 {p.baths}</span>
          </div>

          <div className="card-footer">
            <span className={`badge badge-${p.status}`}>{p.status}</span>
            <span className="badge badge-category">{p.category}</span>
          </div>

          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(p)}>Edit</button>
            <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        </div>

      </div>
    ))}
  </div>

)}

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
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Sold">Sold</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <select name="category" value={form.category} onChange={handleChange}>
                      <option value="For Rent">For Rent</option>
                      <option value="For Sale">For Sale</option>
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