


import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/PostProperty.css";
import Footer from "../components/Footer";


const PostProperty = () => {

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
    sqft: ""
  });

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("sale"); // sale or rent

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("post_properties")
      .insert([{ ...form, property_type: type }]);

    if (error) {
      console.error(error);
      alert("Error submitting property");
    } else {

      alert("Property submitted successfully!");

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
        sqft: ""
      });

    }

    setLoading(false);
  };

  return (
    <>
    <div className="post-property-page">

      <h2>Post Your Property</h2>

      {/* Sell or Rent Selection */}
      <div className="property-type-buttons">

        <button
          type="button"
          onClick={() => setType("sale")}
        >
          Sell Property
        </button>

        <button
          type="button"
          onClick={() => setType("rent")}
        >
          Rent Property
        </button>

      </div>

      <form
        className="post-property-form"
        onSubmit={handleSubmit}
      >

        {/* Property Address */}
        <input
          type="text"
          name="address"
          placeholder="Property Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        {/* City + Zip */}
        <div className="form-row">

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={form.zip}
            onChange={handleChange}
          />

        </div>

        {/* Owner Info */}
        <div className="form-row">

          <input
            type="text"
            name="name"
            placeholder="Owner Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

        </div>

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        {/* Price */}
        <div className="input-group">

          <span>$</span>

          <input
            type="number"
            name="price"
            placeholder={type === "sale" ? "Sale Price" : "Rent Price (per month)"}
            value={form.price}
            onChange={handleChange}
          />

        </div>

        {/* Beds Baths Sqft */}
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

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Property"}
        </button>

      </form>

    </div>
    <Footer />
    </>
  );
  
};

export default PostProperty;