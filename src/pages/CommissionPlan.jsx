import { useState } from "react";
import "../styles/CommissionPlan.css";
import { supabase } from "../lib/supabase";

export default function CommissionPlan() {

  const [selectedPlan, setSelectedPlan] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    city: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("commission_leads")
      .insert([
        {
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          message: formData.message,
          plan: selectedPlan
        }
      ]);

    if (error) {
      alert("Error submitting form");
      console.log(error);
    } else {
      alert("Application submitted successfully!");
      setSelectedPlan(null);

      setFormData({
        fullname: "",
        email: "",
        phone: "",
        city: "",
        message: ""
      });
    }
  };

  return (
    <div className="commission-page">

      {/* HERO */}
      <section className="commission-hero">
        <h1>Grandview Realty Commission Plans</h1>
        <p>
          Join Grandview Realty and choose the commission structure that helps
          you maximize your earnings.
        </p>
      </section>


      {/* PLANS */}
      <section className="plan-section">

        <div className="plan-card">
          <h2>MAX Plan</h2>
          <h3>$465 / Sale</h3>

          <div className="plan-details">
            <p>Pre-Cap Transaction Fee: $465</p>
            <p>Annual Cap: $9,000</p>
            <p>Post-Cap Fee: $165</p>
            <p>Annual Fee: $700</p>
          </div>

          <button onClick={() => setSelectedPlan("MAX Plan")}>
            Choose Plan
          </button>
        </div>


        <div className="plan-card highlight">
          <h2>SHARE Plan</h2>
          <h3>12% Split</h3>

          <div className="plan-details">
            <p>Pre-Cap Split: 12%</p>
            <p>Annual Cap: $12,000</p>
            <p>Post-Cap Fee: $165</p>
            <p>Annual Fee: $700</p>
          </div>

          <button onClick={() => setSelectedPlan("SHARE Plan")}>
            Choose Plan
          </button>
        </div>


        <div className="plan-card">
          <h2>ELEVATE Plan</h2>
          <h3>$515 + 20%</h3>

          <div className="plan-details">
            <p>Transaction Fee: $515</p>
            <p>Annual Cap: $3,000</p>
            <p>Post-Cap Fee: $165</p>
            <p>Annual Fee: $700</p>
          </div>

          <button onClick={() => setSelectedPlan("ELEVATE Plan")}>
            Choose Plan
          </button>
        </div>

      </section>


      {/* FEATURES */}
      <section className="features-section">

        <h2>Included Tools & Support</h2>

        <div className="features-grid">

          <div className="feature-box">
            <div className="feature-icon">🏢</div>
            <h3>CRM Platform</h3>
            <p>Manage leads and clients easily.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">📊</div>
            <h3>Transaction Management</h3>
            <p>Securely manage all documents.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">📣</div>
            <h3>Marketing Tools</h3>
            <p>Promote listings professionally.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">💻</div>
            <h3>Personal Website</h3>
            <p>Showcase your listings online.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">📱</div>
            <h3>Mobile Access</h3>
            <p>Manage everything on mobile.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🤝</div>
            <h3>Agent Support</h3>
            <p>Dedicated support team.</p>
          </div>

        </div>

      </section>


      {/* FORM MODAL */}

      {selectedPlan && (
        <div className="plan-form-overlay">

          <div className="plan-form">

            <h2>Apply for {selectedPlan}</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <div className="form-buttons">

                <button type="submit" className="plan-submit">
                  Submit
                </button>

                <button
                  type="button"
                  className="plan-cancel"
                  onClick={() => setSelectedPlan(null)}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}