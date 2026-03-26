

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import ZillowButton from "../buttons/ZillowButton";
import "../styles/PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showTourModal, setShowTourModal] = useState(false);

  const openTourModal = () => setShowTourModal(true);
  const closeTourModal = () => setShowTourModal(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  async function fetchProperty() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error fetching property:", error);
    } else {
      console.log("PROPERTY DATA:", data);
      setProperty(data);
    }
  }

  // 🧠 SAFE IMAGE HANDLER
  function getGalleryImages(property) {
    if (!property) return [];

    if (Array.isArray(property.images)) {
      return property.images;
    }

    if (typeof property.images === "string") {
      try {
        const parsed = JSON.parse(property.images);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {
        console.log("JSON parse failed:", err);
      }
    }

    return [];
  }

  if (!property) {
    return <div className="loading">Loading...</div>;
  }

  const galleryImages = getGalleryImages(property);

  return (
    <div className="pd-page">

      {/* 🔥 FIXED TOP IMAGE */}
      <div className="pd-gallery">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="main-image"
          />
        ) : (
          <p>No Image Available</p>
        )}
      </div>

      <div className="pd-container">

        {/* LEFT SIDE */}
        <div className="pd-left">

          <div className="pd-header-row">
            <div>
              <h1 className="pd-title">{property.title}</h1>
              <p className="pd-address">
                {property.address}, {property.city}, {property.zipcode}
              </p>
            </div>

            <div className="pd-price-box">
              <h2 className="pd-price">
                ${Number(property.price).toLocaleString()} / month
              </h2>
            </div>
          </div>

          <div className="pd-highlights">
            <div><strong>{property.beds}</strong> Beds</div>
            <div><strong>{property.baths}</strong> Baths</div>
            <div><strong>{property.sqft}</strong> Sq Ft</div>
            <div><strong>{property.city}</strong></div>
          </div>

          <div className="pd-section">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          <div className="pd-section">
            <h3>Property Details</h3>
            <div className="pd-details-grid">
              <div>Category</div>
              <div>{property.category}</div>

              <div>Address</div>
              <div>{property.address}</div>

              <div>City</div>
              <div>{property.city}</div>

              <div>Zipcode</div>
              <div>{property.zipcode}</div>

              <div>Bedrooms</div>
              <div>{property.beds}</div>

              <div>Bathrooms</div>
              <div>{property.baths}</div>

              <div>Area</div>
              <div>{property.sqft} Sq Ft</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pd-right">

          <div className="contact-card">
            <button className="schedule-btn" onClick={openTourModal}>
              Schedule Tour
            </button>
          </div>

          <ZillowButton
            zillowLink={property.zillow_url}
            className="zillow-btn"
          />

          {/* 🖼️ GALLERY → OPEN IN NEW TAB */}
          <div className="pd-section">
            <h3>Property Images</h3>

            {galleryImages.length === 0 ? (
              <p>No gallery images available</p>
            ) : (
              <div className="side-images">
                {galleryImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="property"
                    onClick={() => window.open(img, "_blank")} // 🔥 OPEN IN NEW TAB
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* MODAL */}
      {showTourModal && (
        <ScheduleTourModal
          propertyId={property.id}
          closeModal={closeTourModal}
        />
      )}

    </div>
  );
}