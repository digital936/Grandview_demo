
import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/CommissionPlan.css";


export default function CommissionPlan() {
  const [displayDate, setDisplayDate] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
const [selectedPerson, setSelectedPerson] = useState("");
const [scheduleData, setScheduleData] = useState({
  date: "",
  time: ""
});
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

  // Convert YYYY-MM-DD → MM-DD-YYYY (for display)
const formatToUSDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${month}-${day}-${year}`;
};

// Convert MM-DD-YYYY → YYYY-MM-DD (for DB)
const parseToISODate = (value) => {
  const [month, day, year] = value.split("-");
  if (!month || !day || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// Auto format while typing
const formatDateInput = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
};

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
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("agent_applications").insert([{ ...formData }]);
    
    if (error) {
      console.error(error);
      alert("Error submitting application ❌");
    } else {
      alert("Inquiry submitted successfully! A managing broker will be in touch confidentially. ✅");
      setFormData({ fullname: "", email: "", phone: "", city: "", message: "", join: "", help: [], brokerage: "", zip: "" });
    }
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("commission_leads").insert([{
      fullname: formData.fullname, email: formData.email, phone: formData.phone, city: formData.city, message: formData.message, plan: selectedPlan
    }]);

    if (error) {
      alert("Error submitting form");
    } else {
      alert("Application submitted successfully! We will reach out confidentially.");
      setSelectedPlan(null);
    }
  };

  return (
    <div className="join-page-container">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">JOIN GRANDVIEW REALTY</span>
          <h1>Stop Giving Away Your <br/> <span className="gradient-text">Hard-Earned Commission.</span></h1>
          <p>Elevate your brand, keep more of your money, and get the elite broker support you actually deserve.</p>
          <div className="hero-buttons">
            <a href="#plans" className="btn-primary">View Commission Plans</a>
            <a href="#contact" className="btn-secondary">Book Confidential Call</a>
          </div>
        </div>
      </section>

      {/* 2. VALUE PILLARS */}
      <section className="value-pillars">
        <div className="pillar">
          <div className="icon">🛡️</div>
          <h3>100% Transparency</h3>
          <p>No hidden franchise fees, no surprise desk fees. What you see is exactly what you get.</p>
        </div>
        <div className="pillar">
          <div className="icon">🚀</div>
          <h3>Elite Tech Stack</h3>
          <p>Stop paying out of pocket. We provide a premium CRM and transaction management on day one.</p>
        </div>
        <div className="pillar">
          <div className="icon">🤝</div>
          <h3>Unmatched Support</h3>
          <p>In business for yourself, but never by yourself. Get 24/7 access to our managing brokers.</p>
        </div>
      </section>

      {/* 3. COMMISSION PLANS */}
      <section id="plans" className="plans-section">
        <h2>Choose the Path that Fits Your Hustle</h2>
        <div className="plans-grid">
          
          <div className="plan-card">
            <h3>The Launchpad</h3>
            <div className="price">$500 + 20%</div>
            <p className="subtitle">For Growing Agents</p>
            <ul className="features">
              <li>✔ Premium Support</li>
              <li>✔ Advanced Mentorship</li>
              <li>✔ Concierge Level Access</li>
            </ul>
            <button className="commissionbtn-outline" onClick={() => setSelectedPlan("The Launchpad")}>Select Launchpad</button>
          </div>

          <div className="plan-card popular-plan">
            <div className="popular-badge">MOST POPULAR</div>
            <h3>The Momentum</h3>
            <div className="price">12% Split</div>
            <p className="subtitle">For Established Agents</p>
            <ul className="features">
              <li>✔ Revenue Share Bonus</li>
              <li>✔ Marketing Tools & CRM</li>
              <li>✔ Team Building Support</li>
            </ul>
            <button className="btn-primary" onClick={() => setSelectedPlan("The Momentum")}>Select Momentum</button>
          </div>

          <div className="plan-card">
            <h3>The Apex</h3>
            <div className="price">$450 / Sale</div>
            <p className="subtitle">For Top Producers</p>
            <ul className="features">
              <li>✔ 100% Commission</li>
              <li>✔ Keep Your Entire Check</li>
              <li>✔ No Hidden Fees</li>
            </ul>
            <button className="commissionbtn-outline" onClick={() => setSelectedPlan("The Apex")}>Select Apex</button>
          </div>

        </div>
      </section>

      {/* 4. VIP CONTACT FORM */}
      <section id="contact" className="contact-section">
        <div className="contact-wrapper">
          <div className="contact-text">
            <h2>Let's grab a confidential coffee.</h2>
            <p>Not ready to make a move today? No problem. Let's just talk about your goals and see if the math makes sense for you. 100% confidential. No pressure.</p>
          </div>

          <form className="vip-form" onSubmit={handleAgentSubmit}>
            <div className="input-row">
              <input type="text" name="fullname" placeholder="Full Name *" value={formData.fullname} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-row">
              <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required />
              <input type="text" name="brokerage" placeholder="Current Brokerage (Optional)" value={formData.brokerage} onChange={handleChange} />
            </div>
            
            <div className="radio-group">
              <label>Where are you in your career?</label>
              <div className="options">
                <label><input type="radio" name="join" value="Ready to transition now" onChange={handleChange} /> Ready to transition now</label>
                <label><input type="radio" name="join" value="Just exploring options" onChange={handleChange} /> Just exploring options</label>
              </div>
            </div>

            <textarea name="message" rows="3" placeholder="Anything else you want us to know?" value={formData.message} onChange={handleChange}></textarea>
            
            <button type="submit" className="commissionbtn-submit">Submit Confidential Inquiry</button>
          </form>

          <div className="call-section">
  <div className="divider">— OR — Prefer to talk directly?</div>

  {/* <div className="call-buttons">
    <a href="tel:+1123456789" className="call-btn">
      📞 Call Sam
    </a>

    <a href="tel:+1987654321" className="call-btn">
      📞 Call John
    </a>
  </div> */}

  <div className="call-buttons">
  <button
    className="call-btn"
    onClick={() => {
      setSelectedPerson("Sam");
      setShowSchedule(true);
    }}
  >
    📅 Schedule with Sam
  </button>

  <button
    className="call-btn"
    onClick={() => {
      setSelectedPerson("John");
      setShowSchedule(true);
    }}
  >
    📅 Schedule with John
  </button>
</div>

  <p className="availability">Available 9 AM – 7 PM</p>
</div>
        </div>
      </section>

      {showSchedule && (
  <div className="schedule-overlay">
    <div className="schedule-box">
      <h3 className="schedule-title">
        Schedule a Call with {selectedPerson}
      </h3>

    

<input
  className="schedule-input"
  type="text"
  placeholder="MM-DD-YYYY"
  value={displayDate}
  onChange={(e) => {
    const formatted = formatDateInput(e.target.value);
    setDisplayDate(formatted);

    const isoValue = parseToISODate(formatted);

    if (isoValue) {
      setScheduleData({
        ...scheduleData,
        date: isoValue
      });
    }
  }}
/>

      <input
        className="schedule-input"
        type="time"
        value={scheduleData.time}
        onChange={(e) =>
          setScheduleData({ ...scheduleData, time: e.target.value })
        }
      />

      <div className="schedule-actions">
        <button
          className="schedule-confirm"
          onClick={async () => {
            const { error } = await supabase
              .from("scheduled_calls")
              .insert([
                {
                  name: formData.fullname,
                  email: formData.email,
                  phone: formData.phone,
                  person: selectedPerson,
                  date: scheduleData.date,
                  time: scheduleData.time
                }
              ]);

            if (error) {
              alert("Error scheduling call ❌");
            } else {
              alert("Call scheduled successfully ✅");
              setShowSchedule(false);
              setScheduleData({ date: "", time: "" });
            }
          }}
        >
          Confirm Booking
        </button>

        <button
          className="schedule-cancel"
          onClick={() => setShowSchedule(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {/* 5. PLAN MODAL */}
      {selectedPlan && (
        <div className="commissionmodal-overlay">
          <div className="modal-content">
            <h2>Apply for {selectedPlan}</h2>
            <p>All inquiries are kept strictly confidential.</p>
            <form onSubmit={handlePlanSubmit}>
              <input type="text" name="fullname" placeholder="Full Name *" value={formData.fullname} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} required />
               <textarea
    name="message"
    placeholder="Your message (optional)"
    rows="3"
    value={formData.message}
    onChange={handleChange}
  />
              <div className="commissionmodal-actions">
                <button type="submit" className="commissionbtn-submit">Submit Inquiry</button>
                <button type="button" className="commissionbtn-cancel" onClick={() => setSelectedPlan(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}