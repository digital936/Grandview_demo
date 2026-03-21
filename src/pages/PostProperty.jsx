import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/PostProperty.css";

const PostProperty = () => {

  const [type, setType] = useState("sale");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    address: "",
    city: "",
    zip: "",
    name: "",
    email: "",
    phone: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      let imageUrl = null;

      /* STEP 1: Upload Image */

      if (image) {

        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("property-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      /* STEP 2: Insert Data */

      const { error } = await supabase
        .from("post_properties")
        .insert([
          {
            ...form,
            property_type: type,
            image_url: imageUrl
          }
        ]);

      if (error) throw error;

      alert("Property submitted successfully!");

      /* RESET FORM */

      setForm({
        address: "",
        city: "",
        zip: "",
        name: "",
        email: "",
        phone: "",
        price: "",
        beds: "",
        baths: "",
        sqft: "",
        description: ""
      });

      setImage(null);

    } catch (error) {

      console.error("Error:", error);
      alert(error.message);

    }

    setLoading(false);
  };

  return (

    <div className="post-property-page">

      {/* TITLE */}

      <section className="property-action-header">

        <h2>What Would You Like To Do?</h2>

        <p>
          Choose whether you want to sell your home or rent out your property.
        </p>

      </section>


      {/* BUTTONS */}

      <section className="top-buttons">

        <button
          className={type === "sale" ? "active" : ""}
          onClick={() => setType("sale")}
        >
          Sell Property
        </button>

        <button
          className={type === "rent" ? "active" : ""}
          onClick={() => setType("rent")}
        >
          Rent Property
        </button>

      </section>


      {/* SERVICES */}

      <section className="services">

        {type === "sale" ? (
          <>
            <h2>Sell Your Home – Only 1% Listing Fee</h2>
            <p className="section-desc">
              Save thousands compared to traditional agents charging 5–6%.
            </p>
          </>
        ) : (
          <>
            <h2>Rent Your Property</h2>
            <p className="section-desc">
              Tenant placement 25% first month rent and full management for 5%.
            </p>
          </>
        )}

      </section>
<p className="trust-line">
✔ Verified Listing • ✔ Secure Process • ✔ No Hidden Charges
</p>

      {/* FORM */}

      <section className="form-section">

       <div className="form-header">
  <h2>List Your Property</h2>
  <p>Fill in the details below to get started</p>
</div>

        <form className="post-property-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="address"
            placeholder="Property Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <div className="form-row">

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={form.zip}
              onChange={handleChange}
            />

          </div>

          <div className="form-row">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          {/* PRICE */}

          <div className="price-input">

            <span>$</span>

            <input
              type="number"
              name="price"
              placeholder={
                type === "sale"
                  ? "Expected Sale Price"
                  : "Monthly Rent Price"
              }
              value={form.price}
              onChange={handleChange}
            />

          </div>

          {/* DETAILS */}

          <div className="form-row">

            <input
              type="number"
              name="beds"
              placeholder="Beds"
              value={form.beds}
              onChange={handleChange}
            />

            <input
              type="number"
              name="baths"
              placeholder="Baths"
              value={form.baths}
              onChange={handleChange}
            />

            <input
              type="number"
              name="sqft"
              placeholder="Sqft"
              value={form.sqft}
              onChange={handleChange}
            />

          </div>

          {/* DESCRIPTION */}

          <textarea
            name="description"
            placeholder="Property description"
            value={form.description}
            onChange={handleChange}
          />

          {/* IMAGE UPLOAD */}

         
<div className="upload-box">
  <label>
    {image ? (
      <img
        src={URL.createObjectURL(image)}
        alt="preview"
        className="preview-image"
      />
    ) : (
      <div className="upload-placeholder">
        <p>📷 Upload Property Image</p>
        <span>Click or drag & drop</span>
      </div>
    )}
    <input
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
      hidden
    />
  </label>
</div>
          {/* SUBMIT */}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Property"}
          </button>

        </form>

      </section>

    </div>

  );
};

export default PostProperty;