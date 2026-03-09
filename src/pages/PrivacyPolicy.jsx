import React from "react";
import "../styles/privacy.css";

function PrivacyPolicy() {
  return (
    <div className="policy-container">

      <div className="policy-card">
        <h1>Self-Guided Property Tour Agreement</h1>
        <h3>Grand View Realty, LLC</h3>

        <p>
          This Self-Guided Tour Agreement (“Agreement”) governs access to properties
          managed by Grand View Realty, LLC (“Company”) for the purpose of
          conducting a self-guided property tour.
        </p>

        <p>
          By submitting a request or entering the property, the visitor
          (“Visitor”) agrees to the following terms.
        </p>

        <section>
          <h2>1. Identity Verification</h2>
          <p>To protect the property and ensure security, Visitor must provide accurate identification information including:</p>
          <ul>
            <li>Full Name</li>
            <li>Phone Number</li>
            <li>Email Address</li>
            <li>Valid Driver’s License or Government Issued Identification</li>
          </ul>
          <p>
            Visitor agrees that the identification submitted belongs to them and is accurate.
            Grand View Realty reserves the right to deny or cancel access if identity
            verification cannot be completed.
          </p>
        </section>

        <section>
          <h2>2. Privacy Policy Consent</h2>
          <p>Visitor consents to the collection and use of their personal information for:</p>
          <ul>
            <li>Identity verification</li>
            <li>Scheduling and confirming property tours</li>
            <li>Property security and fraud prevention</li>
            <li>Communication regarding the property</li>
            <li>Record keeping related to the showing</li>
          </ul>
          <p>
            Grand View Realty will not sell or distribute personal information except
            as required by law or necessary to provide services.
          </p>
        </section>

        <section>
          <h2>3. SMS / Text Message Consent</h2>
          <p>By providing a mobile phone number, Visitor consents to receive SMS text messages regarding:</p>
          <ul>
            <li>Tour approval notifications</li>
            <li>Access instructions</li>
            <li>Appointment reminders</li>
            <li>Property information</li>
            <li>Follow-up communication</li>
          </ul>
          <p>Standard message and data rates may apply depending on your carrier.</p>
        </section>

        <section>
          <h2>4. Access Authorization</h2>
          <p>
            Property access will be granted only to the verified individual who
            registered for the tour.
          </p>
          <ul>
            <li>Access codes must not be shared</li>
            <li>Only approved individuals may enter</li>
            <li>The property must be secured upon leaving</li>
          </ul>
        </section>

        <section>
          <h2>5. Tour Time Window</h2>
          <p>
            Access is granted only during the scheduled tour time. Visitors must
            leave before the access period expires.
          </p>
        </section>

        <section>
          <h2>6. Property Condition & Safety</h2>
          <p>Visitor understands the property may be:</p>
          <ul>
            <li>Vacant</li>
            <li>Under construction</li>
            <li>Recently renovated</li>
            <li>Unfurnished</li>
          </ul>
        </section>

        <section>
          <h2>7. Prohibited Activities</h2>
          <ul>
            <li>Smoking or vaping</li>
            <li>Bringing pets</li>
            <li>Hosting gatherings</li>
            <li>Damaging property</li>
            <li>Tampering with locks or alarms</li>
          </ul>
        </section>

        <section>
          <h2>8. Security Cameras</h2>
          <p>
            For safety and fraud prevention, the property may contain exterior
            security cameras or monitoring systems.
          </p>
        </section>

        <section>
          <h2>9. Liability Waiver</h2>
          <p>
            Visitor acknowledges entering the property is voluntary and at their
            own risk. Grand View Realty, LLC shall not be liable for any injury,
            accident, or damage during the tour.
          </p>
        </section>

        <section>
          <h2>10. No Landlord-Tenant Relationship</h2>
          <p>
            Participation in a self-guided tour does not create a lease agreement
            or landlord-tenant relationship.
          </p>
        </section>

        <section>
          <h2>11. Minors</h2>
          <p>
            Visitors under 18 must be accompanied by a parent or legal guardian.
          </p>
        </section>

        <section>
          <h2>12. Fraud Prevention</h2>
          <p>
            Grand View Realty reserves the right to deny access if fraud or
            suspicious activity is detected.
          </p>
        </section>

        <section>
          <h2>13. Agreement Confirmation</h2>
          <p>By submitting a tour request or entering the property, Visitor confirms that:</p>
          <ul>
            <li>All information provided is accurate</li>
            <li>Visitor has read and agrees to this agreement</li>
            <li>Visitor consents to identity verification and SMS communication</li>
          </ul>
        </section>

      </div>

    </div>
  );
}

export default PrivacyPolicy;