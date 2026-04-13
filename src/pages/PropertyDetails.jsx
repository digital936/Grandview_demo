
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

  // 🔥 IMAGE POPUP STATE
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      setProperty(data);
    }
  }

function getGalleryImages(property) {
  if (!property) return [];

  // ✅ case 1: already array
  if (Array.isArray(property.images)) return property.images;

  // ✅ case 2: string JSON
  if (typeof property.images === "string") {
    try {
      const parsed = JSON.parse(property.images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

  // 🔥 POPUP FUNCTIONS
  const openImagePopup = (index) => {
    setCurrentIndex(index);
    setShowImagePopup(true);
  };

  const closeImagePopup = () => {
    setShowImagePopup(false);
  };

  const nextImage = (galleryImages) => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (galleryImages) => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  if (!property) {
    return <div className="loading">Loading...</div>;
  }

  const galleryImages = getGalleryImages(property);

  return (
    <div className="pd-page">

      {/* TOP IMAGE */}
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

        {/* LEFT */}
        <div className="pd-left">
          <div className="pd-header-row">
            <div>
              <h1 className="pd-title">{property.title} {property.city}, {property.zipcode}</h1>
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
              <div>Category</div><div>{property.category}</div>
              <div>Address</div><div>{property.address}</div>
              <div>City</div><div>{property.city}</div>
              <div>Zipcode</div><div>{property.zipcode}</div>
              <div>Bedrooms</div><div>{property.beds}</div>
              <div>Bathrooms</div><div>{property.baths}</div>
              <div>Area</div><div>{property.sqft} Sq Ft</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="pd-right">

          <div className="contact-card">
            <button className="schedule-btn" onClick={openTourModal}>
              Request Tour
            </button>
          </div>

          <ZillowButton
            zillowLink={property.zillow_url}
            className="zillow-btn"
          />

          {/* GALLERY */}
          <div className="pd-section">
            <h3>Property Images</h3>

            {galleryImages.length === 0 ? (
              <p>No gallery images available</p>
            ) : (
              <div
                className="side-images"
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "10px",
                  paddingBottom: "10px"
                }}
              >
                {galleryImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="property"
                    loading="lazy"
                    onClick={() => openImagePopup(i)}
                    style={{
                      width: "120px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 🔥 IMAGE POPUP */}
      {showImagePopup && (
        <div
          className="image-popup"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <button
            className="close-popup"
            onClick={closeImagePopup}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "30px",
              color: "#fff",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            ✕
          </button>

          <button
            className="nav-btn left"
            onClick={() => prevImage(galleryImages)}
            style={{
              position: "absolute",
              left: "20px",
              fontSize: "40px",
              color: "#fff",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            ‹
          </button>

          <img
            src={galleryImages[currentIndex]}
            alt="preview"
            className="popup-image"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px"
            }}
          />

          <button
            className="nav-btn right"
            onClick={() => nextImage(galleryImages)}
            style={{
              position: "absolute",
              right: "20px",
              fontSize: "40px",
              color: "#fff",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            ›
          </button>
        </div>
      )}

      {/* TOUR MODAL */}
      {showTourModal && (
        <ScheduleTourModal
          propertyId={property.id}
          closeModal={closeTourModal}
        />
      )}

    </div>
  );
}