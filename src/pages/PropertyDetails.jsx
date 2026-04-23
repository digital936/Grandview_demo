
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import "../styles/PropertyDetails.css";
import Footer from "../components/Footer";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [showTour, setShowTour] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  async function fetchProperty() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    setProperty(data);
  }

  function getImages(p) {
    if (!p?.images) return [];
    if (Array.isArray(p.images)) return p.images;
    try {
      return JSON.parse(p.images);
    } catch {
      return [];
    }
  }

  // Opens the popup gallery at the correct image index
  function openGallery(i) {
    setIndex(i);
    setShowPopup(true);
  }

  if (!property) return <div className="pm-loading">Loading...</div>;

  // 👉 THIS IS THE FIX: Grab all images, then slice the first 5 for the grid
  const images = getImages(property);
  const displayImages = images.slice(0, 5);

  return (
    <>
    <div className="pm-page">

      {/* 🔥 ZILLOW-STYLE IMAGE GRID */}
      <div className="pm-hero-grid">
        {displayImages.map((img, i) => (
          <div 
            className="pm-img-box" 
            key={i} 
            onClick={() => openGallery(i)}
          >
            <img src={img} alt={`Property photo ${i + 1}`} />
            
            {/* Show "View All" overlay on the 5th image if there are more */}
            {i === 4 && images.length > 5 && (
              <div className="pm-view-all-overlay">
                View all {images.length} photos
              </div>
            )}
          </div>
        ))}
        
        {/* Button alternative if they have 5 or fewer images */}
        {images.length > 0 && images.length <= 5 && (
           <button className="pm-view-all-btn" onClick={() => openGallery(0)}>
             View all photos
           </button>
        )}
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="pm-container">

        {/* LEFT SIDE */}
        <div className="pm-left">

          <div className="pm-header-info">
            <h1 className="pm-price">
              ${Number(property.price).toLocaleString()} <span>/ month</span>
            </h1>
            
            <div className="pm-highlights">
              <span><strong>{property.beds}</strong> bd</span>
              <span className="pm-divider">|</span>
              <span><strong>{property.baths}</strong> ba</span>
              <span className="pm-divider">|</span>
              <span><strong>{property.sqft}</strong> sqft</span>
            </div>

            <p className="pm-address">
              {property.address}, {property.city}, {property.zipcode}
            </p>
          </div>

          <div className="pm-section">
            <h3>Overview</h3>
            <p className="pm-description">{property.description}</p>
          </div>

          <div className="pm-section">
            <h3>Facts and features</h3>
            <div className="pm-details-grid">
              <div className="pm-detail-item">
                <span className="pm-detail-label">Type</span>
                <span className="pm-detail-value">{property.category}</span>
              </div>
              <div className="pm-detail-item">
                <span className="pm-detail-label">City</span>
                <span className="pm-detail-value">{property.city}</span>
              </div>
              <div className="pm-detail-item">
                <span className="pm-detail-label">Zipcode</span>
                <span className="pm-detail-value">{property.zipcode}</span>
              </div>
              <div className="pm-detail-item">
                <span className="pm-detail-label">Bedrooms</span>
                <span className="pm-detail-value">{property.beds}</span>
              </div>
              <div className="pm-detail-item">
                <span className="pm-detail-label">Bathrooms</span>
                <span className="pm-detail-value">{property.baths}</span>
              </div>
              <div className="pm-detail-item">
                <span className="pm-detail-label">Living Area</span>
                <span className="pm-detail-value">{property.sqft} sqft</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE (STICKY CONTACT CARD) */}
        <div className="pm-right">
          <div className="pm-contact-card">
            <h3>Interested in this home?</h3>
            <button
              className="pm-tour-btn"
              onClick={() => setShowTour(true)}
            >
              Request a Tour
            </button>

            <a href="tel:+14799959165" className="pm-call-btn">
              Contact Agent
            </a>

            {property.zillow_url && (
  <button
    className="pm-zillow-btn"
    onClick={() => window.open(property.zillow_url, "_blank")}
  >
    View on Zillow
  </button>
)}
          </div>
        </div>

      </div>

      {/* 🔥 FULLSCREEN IMAGE POPUP */}
      {showPopup && (
        <div className="pm-popup" onClick={() => setShowPopup(false)}>
          <button
            className="pm-close"
            onClick={() => setShowPopup(false)}
          >
            ✕
          </button>

          <button
            className="pm-nav left"
            onClick={(e) => {
              e.stopPropagation(); // Prevents clicking the button from closing the modal
              setIndex(index === 0 ? images.length - 1 : index - 1);
            }}
          >
            ‹
          </button>

          <img 
            src={images[index]} 
            alt="Gallery view" 
            className="pm-popup-img"
            onClick={(e) => e.stopPropagation()} // Prevents clicking the image from closing the modal
          />

          <button
            className="pm-nav right"
            onClick={(e) => {
              e.stopPropagation(); // Prevents clicking the button from closing the modal
              setIndex((index + 1) % images.length);
            }}
          >
            ›
          </button>

          <div className="pm-counter">
            {index + 1} / {images.length}
          </div>
        </div>
      )}

      {/* TOUR MODAL */}
      {showTour && (
        <ScheduleTourModal
          propertyId={property.id}
          propertyName={property.address}
          closeModal={() => setShowTour(false)}
        />
      )}

    </div>
    <Footer />
    </>
  );
}