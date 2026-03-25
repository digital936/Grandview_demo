

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import ZillowButton from "../buttons/ZillowButton";
import "../styles/PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  /* ⭐ Modal state */
  const [showTourModal, setShowTourModal] = useState(false);

  const openTourModal = () => setShowTourModal(true);
  const closeTourModal = () => setShowTourModal(false);

  useEffect(() => {
    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (!property) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="pd-page">

      {/* PROPERTY IMAGE */}
      <div className="pd-gallery">
        <img src={property.imageUrl} alt={property.title} />
      </div>

      <div className="pd-container">

        {/* LEFT SIDE */}
        <div className="pd-left">
          {/* HEADER */}
          <div className="pd-header-row">
            <div>
              <h1 className="pd-title">{property.title}</h1>
              <p className="pd-address">{property.address}, {property.city}</p>
            </div>

            <div className="pd-price-box">
              <h2 className="pd-price">${Number(property.price).toLocaleString()} / month</h2>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="pd-highlights">
            <div><strong>{property.beds}</strong> Beds</div>
            <div><strong>{property.baths}</strong> Baths</div>
            <div><strong>{property.sqft}</strong> Sq Ft</div>
            <div><strong>{property.city}</strong></div>
          </div>

          {/* DESCRIPTION */}
          <div className="pd-section">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          {/* PROPERTY DETAILS GRID */}
          <div className="pd-section">
            <h3>Property Details</h3>
            <div className="pd-details-grid">
              <div>Category</div>
              <div>{property.category}</div>

              <div>Address</div>
              <div>{property.address}</div>

              <div>City</div>
              <div>{property.city}</div>

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

          {/* CONTACT CARD */}
          <div className="contact-card">
            <button className="schedule-btn" onClick={openTourModal}>
              Schedule Tour
            </button>
          </div>

          {/* ZILLOW BUTTON */}
          <ZillowButton zillowLink={property.zillow_url} className="zillow-btn" />

          {/* LOCATION MAP */}
          {/* <div className="pd-section">
            <h3>Location</h3>
            <iframe
              title="map"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
            ></iframe>
          </div> */}
        </div>

      </div>

      {/* SCHEDULE TOUR MODAL */}
      {showTourModal && (
        <ScheduleTourModal
          propertyId={property.id}
          closeModal={closeTourModal}
        />
      )}

    </div>
  );
}