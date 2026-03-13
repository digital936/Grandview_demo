// import { useState } from "react";
// import "../styles/CommissionPlan.css";

// export default function CommissionPlan() {

//   const [selectedPlan, setSelectedPlan] = useState(null);

//   return (
//     <div className="commission-page">

//       <h1>Grandview Realty Commission Plans</h1>

//       <div className="plan-section">

//         <div className="plan-card">
//           <h2>MAX Plan</h2>
//           <button onClick={() => setSelectedPlan("MAX")}>
//             Choose Plan
//           </button>
//         </div>

//         <div className="plan-card">
//           <h2>SHARE Plan</h2>
//           <button onClick={() => setSelectedPlan("SHARE")}>
//             Choose Plan
//           </button>
//         </div>

//         <div className="plan-card">
//           <h2>ELEVATE Plan</h2>
//           <button onClick={() => setSelectedPlan("ELEVATE")}>
//             Choose Plan
//           </button>
//         </div>

//       </div>

//       {selectedPlan && (
//         <div className="form-modal">

//           <div className="form-box">

//             <button
//               className="close-btn"
//               onClick={() => setSelectedPlan(null)}
//             >
//               ✖
//             </button>

//             <h2>Apply for {selectedPlan} Plan</h2>

//             <form>

//               <input type="text" placeholder="Full Name" required />

//               <input type="email" placeholder="Email" required />

//               <input type="tel" placeholder="Phone Number" required />

//               <textarea placeholder="Message"></textarea>

//               <button type="submit">Submit</button>

//             </form>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

import { useState } from "react";
import "../styles/CommissionPlan.css";

export default function CommissionPlan() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="commission-page">

      {/* HERO */}
      <section className="commission-hero">
        <h1>Grandview Realty Commission Plans</h1>
        <p>
          Join Grandview Realty and choose the commission structure that helps
          you maximize your earnings and grow your real estate business.
        </p>
      </section>


      {/* COMMISSION PLANS */}
      <section className="plan-section">

        {/* PLAN 1 */}
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


        {/* PLAN 2 */}
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


        {/* PLAN 3 */}
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



      {/* FEATURES SECTION */}
      <section className="features-section">

        <h2>Included Tools & Support</h2>

        <div className="features-grid">

          <div className="feature-box">
            <div className="feature-icon">🏢</div>
            <h3>CRM Platform</h3>
            <p>Manage leads, clients, and deals with powerful CRM tools.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">📊</div>
            <h3>Transaction Management</h3>
            <p>Securely manage all transaction documents and processes.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">📣</div>
            <h3>Marketing Tools</h3>
            <p>Promote listings using professional marketing tools.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">💻</div>
            <h3>Personal Website</h3>
            <p>Create a personal website to showcase your properties.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">📱</div>
            <h3>Mobile Access</h3>
            <p>Manage listings and clients anytime from mobile devices.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🤝</div>
            <h3>Agent Support</h3>
            <p>Dedicated support team to help you grow your business.</p>
          </div>

        </div>

      </section>



      {/* APPLICATION FORM MODAL */}
     {selectedPlan && (
  <div className="plan-form-overlay">
    <div className="plan-form">

      <h2>Join Grandview Realty</h2>

      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email Address" />
      <input type="tel" placeholder="Phone Number" />
      <input type="text" placeholder="City" />

      <textarea placeholder="Message"></textarea>

      <div className="form-buttons">
        <button className="plan-submit">Submit</button>
        <button className="plan-cancel">Cancel</button>
      </div>

    </div>
  </div>
)}
     

    </div>
  );
}