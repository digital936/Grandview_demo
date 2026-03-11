
import { useState } from "react";
import { supabase } from "../lib/supabase";
import "./ScheduleTour.css";

export default function ScheduleTourModal({ propertyId, closeModal }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    licenseFile: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("tours")
      .insert([
        {
          property_id: propertyId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error submitting tour request");
    } else {
      alert("Tour scheduled successfully!");
      closeModal();
    }
  }

  return (
    <div className="tour-overlay">

      <div className="tour-box">

        <button
          className="close-btn"
          onClick={closeModal}
        >
          ✕
        </button>

        <h2>Schedule Property Tour</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            required
            onChange={handleChange}
          />

          <select
            name="time"
            required
            onChange={handleChange}
          >
            <option value="">Select Time</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
            <option>1:00 PM</option>
            <option>2:00 PM</option>
            <option>3:00 PM</option>
          </select>

          <input
            type="file"
            name="licenseFile"
            onChange={handleChange}
          />

          <div className="form-buttons">

            <button
              type="submit"
              className="submit-btn"
            >
              Submit
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}