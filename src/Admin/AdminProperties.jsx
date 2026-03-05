
// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../Admin/admin-properties.css";

// export default function AdminProperties() {
//   const [properties, setProperties] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

  

//   const initialFormState = {
//     title: "",
//     price: "",
//     beds: "",
//     baths: "",
//     sqft: "",
//     address: "",
//     city: "",
//     imageUrl: "",
//     category: "rent",
//     zillow_url: "",
//     description: "",
//     featured: false,

//   };

//   const [form, setForm] = useState(initialFormState);

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   async function fetchProperties() {
//     const { data, error } = await supabase
//       .from("properties")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (!error) setProperties(data);
//   }

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   }

//   function openAddForm() {
//     setForm(initialFormState);
//     setEditingId(null);
//     setShowForm(true);
//   }

//   function handleEdit(property) {
//     setForm(property);
//     setEditingId(property.id);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (editingId) {
//       await supabase
//         .from("properties")
//         .update(form)
//         .eq("id", editingId);
//     } else {
//       await supabase.from("properties").insert([form]);
//     }

//     setShowForm(false);
//     setEditingId(null);
//     setForm(initialFormState);
//     fetchProperties();
//   }

//   async function handleDelete(id) {
//     await supabase.from("properties").delete().eq("id", id);
//     fetchProperties();
//   }

//   return (
//     <div className="admin-properties-page">
//       <div className="admin-header">
//         <h2>Manage Properties</h2>
//         <button className="add-btn" onClick={openAddForm}>
//           + Add Property
//         </button>
//       </div>

//       {/* CONDITIONAL FORM */}
//       {showForm && (
//         <div className="form-modal">
//           <div className="form-container">
//             <h3>{editingId ? "Update Property" : "Add New Property"}</h3>

//             <form className="admin-form" onSubmit={handleSubmit}>
//               <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//               <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
//               <input name="beds" placeholder="Beds" value={form.beds} onChange={handleChange} />
//               <input name="baths" placeholder="Baths" value={form.baths} onChange={handleChange} />
//               <input name="sqft" placeholder="Sqft" value={form.sqft} onChange={handleChange} />
//               <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
//               <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
//               <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
//               <input name="zillow_url" placeholder="Zillow Link" value={form.zillow_url} onChange={handleChange} />

//               <select name="category" value={form.category} onChange={handleChange}>
//                 <option value="rent">Rent</option>
//                 <option value="sale">Sale</option>
//               </select> 

//               <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="description-box" />
//               {/* <textarea
//   className="description-box"
//   placeholder="Enter property description..."
// ></textarea> */}
//               <label className="checkbox">
//                 <input
//                   type="checkbox"
//                   name="featured"
//                   checked={form.featured}
//                   onChange={handleChange}
//                 />
//                 Featured Property
//               </label>

//               <div className="form-actions">
//                 <button type="submit" className="save-btn">
//                   {editingId ? "Update" : "Save"}
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* PROPERTY GRID */}
//       <div className="admin-property-grid">
//         {properties.map((property) => (
//           <div className="admin-property-card" key={property.id}>
//             <img src={property.imageUrl} alt={property.title} />

//             <div className="property-details">
//               <h3>{property.title}</h3>
//               <p className="price">${property.price}</p>
//               <p>{property.city}</p>
//             </div>

//             {property.status === "available" && (
//       <button
//         onClick={() => handleRentClick(property.id)}
//         className="rent-btn"
//       >
//         Rent Property
//       </button>
//     )}

//             <div className="actions">
//               <button
//                 className="edit-btn"
//                 onClick={() => handleEdit(property)}
//               >
//                 Edit
//               </button>

//               <button
//                 className="delete-btn"
//                 onClick={() => handleDelete(property.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/admin-properties.css";

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
    city: "",
    imageUrl: "",
    category: "rent",
    zillow_url: "",
    description: "",
    featured: false,
    status: "available",   // ✅ ADDED
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
    setForm(property);
    setEditingId(property.id);
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await supabase
        .from("properties")
        .update(form)
        .eq("id", editingId);
    } else {
      await supabase
        .from("properties")
        .insert([form]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(initialFormState);
    fetchProperties();
  }

  async function handleDelete(id) {
    await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    fetchProperties();
  }

  return (
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

              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />

              <input
                name="beds"
                placeholder="Beds"
                value={form.beds}
                onChange={handleChange}
              />

              <input
                name="baths"
                placeholder="Baths"
                value={form.baths}
                onChange={handleChange}
              />

              <input
                name="sqft"
                placeholder="Sqft"
                value={form.sqft}
                onChange={handleChange}
              />

              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />

              <input
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
              />

              <input
                name="zillow_url"
                placeholder="Zillow Link"
                value={form.zillow_url}
                onChange={handleChange}
              />

              {/* CATEGORY */}
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>

              {/* ✅ STATUS DROPDOWN */}
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
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

              <p>Status: <b>{property.status}</b></p> {/* optional */}
            </div>

            <div className="actions">

              <button
                className="edit-btn"
                onClick={() => handleEdit(property)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(property.id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}