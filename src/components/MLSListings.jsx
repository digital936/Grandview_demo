import React from "react";
import "../styles/MLSListings.css";

export default function MLSListings() {
  return (
    <div className="mls-page">

      {/* 🔥 HEADER */}
      <div className="mls-header">
        <h1>Find Your Dream Home</h1>
        <p>Browse all available properties in your area</p>
      </div>

      {/* 📞 CONTACT BUTTONS */}
      <div className="contact-buttons">
        <a href="tel:+1234567890" className="btn call">Call</a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noreferrer"
          className="btn whatsapp"
        >
          WhatsApp
        </a>
        <a href="mailto:info@grandviewrealty.us" className="btn email">
          Email
        </a>
      </div>

      {/* 🏠 MLS LISTINGS */}
      <div className="mls-container">
        <iframe
          src="https://nwa.mlsmatrix.com/Matrix/public/IDX.aspx?idx=1d7c22e"
          title="MLS Listings"
          className="mls-frame"
        />
      </div>

    </div>
  );
}