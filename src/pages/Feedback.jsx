


import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("feedback")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          rating: String(formData.rating),
          message: formData.message
        }
      ]);

    if (error) {
      alert("Error submitting feedback");
      console.log(error);
    } else {
      alert("Thank you for your feedback!");

      setFormData({
        name: "",
        email: "",
        rating: 5,
        message: ""
      });
    }

    setLoading(false);
  };

  return (
     <section className="Feedback-page">
      <div className="feedback-container">
        <h2>We Value Your Feedback</h2>
        <p>Your experience helps us improve Grandview Realty.</p>

        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Rating</label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
            <option value="4">⭐⭐⭐⭐ - Very Good</option>
            <option value="3">⭐⭐⭐ - Good</option>
            <option value="2">⭐⭐ - Fair</option>
            <option value="1">⭐ - Poor</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Feedback"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
     </section>
  );
};

export default Feedback;