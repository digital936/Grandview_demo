

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
    message: "",

    join: "",
  help: [],
  brokerage: "",
  zip: ""
  });

//   const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;

//   if (type === "checkbox") {
//     setFormData((prev) => ({
//       ...prev,
//       help: checked
//         ? [...prev.help, value]
//         : prev.help.filter((item) => item !== value)
//     }));
//   } else {
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   }
// };

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox") {
    setFormData((prev) => ({
      ...prev,
      help: checked
        ? [...prev.help, value]
        : prev.help.filter((item) => item !== value)
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
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

  const handleAgentSubmit = async (e) => {
  e.preventDefault();

  const { error } = await supabase
    .from("agent_applications")
    .insert([
      {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        message: formData.message,
        join: formData.join,
        help: formData.help, // array ✅
        brokerage: formData.brokerage,
        zip: formData.zip
      }
    ]);

  if (error) {
    console.error(error);
    alert("Error submitting application ❌");
  } else {
    alert("Application submitted successfully! ✅");

    setFormData({
      fullname: "",
      email: "",
      phone: "",
      city: "",
      message: "",
      join: "",
      help: [],
      brokerage: "",
      zip: ""
    });
  }
};

  return (
    <div className="commission-page">

      {/* HERO */}
      <section className="commission-hero">
        <h1>Grandview Realty Commission Plans</h1>
        <p>Choose the plan that fits your growth journey.</p>
      </section>

      {/* PLANS */}
      <section className="plan-section">

        {/* MAX */}
        <div className="plan-card">
          <h2>MAX Plan</h2>
          <h3>$450 / Sale</h3>

          <div className="plan-details">
            <p>Pre-Cap: $465</p>
            <p>Cap: $9,000</p>
            <p>Post-Cap: $165</p>
            <p>Annual: $700</p>
          </div>

          <ul className="plan-features">
            <li>✔ 100% Commission</li>
            <li>✔ CRM & Marketing</li>
            <li>✔ Training Included</li>
            <li>✔ No Hidden Fees</li>
          </ul>

          <div className="revenue-box">
            <h4>Revenue Share</h4>
            <p>Level 1: 10%</p>
            <p>Level 2: 8%</p>
            <p>Level 3: 5%</p>
          </div>

          <div className="extra-details">
            <p>Residential Lease: $120</p>
            <p>Commercial Cap: $5,000</p>
          </div>

          <button onClick={() => setSelectedPlan("MAX Plan")}>
            Choose Plan
          </button>
          {/* <button className="secondary-btn">Get More Info</button> */}
        </div>


        {/* SHARE */}
        <div className="plan-card highlight">
          <span className="commission-badge">MOST POPULAR</span>
          <h2>SHARE Plan</h2>
          <h3>12% Split</h3>

          <div className="plan-details">
            <p>Pre-Cap: 12%</p>
            <p>Cap: $12,000</p>
            <p>Post-Cap: $165</p>
            <p>Annual: $700</p>
          </div>

          <ul className="plan-features">
            <li>✔ Revenue Share Bonus</li>
            <li>✔ Marketing Tools</li>
            <li>✔ CRM Included</li>
            <li>✔ Team Support</li>
          </ul>

          <div className="revenue-box">
            <h4>Revenue Share</h4>
            <p>Level 1: 12%</p>
            <p>Level 2: 10%</p>
            <p>Level 3: 7%</p>
          </div>

          <div className="extra-details">
            <p>Residential Lease: $120</p>
            <p>Commercial Cap: $5,000</p>
          </div>

          <button onClick={() => setSelectedPlan("SHARE Plan")}>
            Choose Plan
          </button>
          {/* <button className="secondary-btn">Get More Info</button> */}
        </div>


        {/* ELEVATE */}
        <div className="plan-card">
          <h2>ELEVATE Plan</h2>
          <h3>$500 + 20%</h3>

          <div className="plan-details">
            <p>Fee: $515</p>
            <p>Cap: $3,000</p>
            <p>Post-Cap: $165</p>
            <p>Annual: $700</p>
          </div>

          <ul className="plan-features">
            <li>✔ Premium Support</li>
            <li>✔ Advanced Tools</li>
            <li>✔ High Growth Plan</li>
            <li>✔ Concierge Level</li>
          </ul>

          <div className="revenue-box">
            <h4>Revenue Share</h4>
            <p>Level 1: 15%</p>
            <p>Level 2: 12%</p>
            <p>Level 3: 10%</p>
          </div>

          <div className="extra-details">
            <p>Residential Lease: $120</p>
            <p>Commercial Cap: $5,000</p>
          </div>

          <button onClick={() => setSelectedPlan("ELEVATE Plan")}>
            Choose Plan
          </button>
          {/* <button className="secondary-btn">Get More Info</button> */}
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

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="contact-section">

  <div className="contact-card">

    <div className="contact-header">
      <h2>Get More Info</h2>
      <p>Fill out the form and our team will get back to you shortly.</p>
    </div>

    <form className="contact-form-pro" onSubmit={handleAgentSubmit}>

      {/* NAME */}
      <div className="input-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      </div>

      {/* EMAIL + PHONE */}
      <div className="row">
        <div className="input-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* RADIO */}
      <div className="input-group">
        <label>Ready to join Elevate?</label>
        <div className="radio-group-pro">
          <label>
            <input type="radio" name="join" value="Yes" onChange={handleChange} /> Yes, Apply Now
          </label>
        </div>
      </div>

      {/* CHECKBOX */}
      <div className="input-group">
        <label>How can we help?</label>
        <div className="checkbox-group-pro">
          <label><input type="checkbox" name="help" /> Ask a Question</label>
          <label><input type="checkbox" name="help" /> Meet Broker</label>
          <label><input type="checkbox" name="help" /> Join Team</label>
          <label><input type="checkbox" name="help" /> Request eBook</label>
        </div>
      </div>

      {/* DROPDOWN */}
      <div className="input-group">
        <label>Current Brokerage</label>
        <select name="brokerage" onChange={handleChange}>
          <option>Select option</option>
          <option>None</option>
          <option>Other</option>
        </select>
      </div>

      {/* <div className="input-group">
        <label>State</label>
        <select name="state" onChange={handleChange}>
          <option>Select State</option>
          <option>Maharashtra</option>
          <option>Gujarat</option>
        </select>
      </div> */}

      {/* CITY + ZIP */}
      <div className="row">
        <div className="input-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Zip Code</label>
          <input type="text" name="zip" onChange={handleChange} />
        </div>
      </div>

      {/* MESSAGE */}
      <div className="input-group">
        <label>Message</label>
        <textarea
          rows="4"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {/* BUTTON */}
      <button type="submit" className="submit-btn-pro">
        Submit Application
      </button>

    </form>
  </div>
</section>

      {/* FORM MODAL (UNCHANGED) */}
      {selectedPlan && (
        <div className="plan-form-overlay">
          <div className="plan-form">
            <h2>Apply for {selectedPlan}</h2>

            <form onSubmit={handleSubmit}>
              <input name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} required />
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
              <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>

              <div className="form-buttons">
                <button type="submit" className="plan-submit">Submit</button>
                <button type="button" className="plan-cancel" onClick={() => setSelectedPlan(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      
    </div>
  );
}