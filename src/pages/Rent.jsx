
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import Footer from "../components/Footer";
import "../styles/Rent.css";

export default function Rent() {
  const [properties, setProperties] = useState([]);
  const [activeImage, setActiveImage] = useState({});
  const [tourProperty, setTourProperty] = useState(null);
  const [showCallPopup, setShowCallPopup] = useState(null);

  const navigate = useNavigate();
  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    fetchProperties();
  }, []);

  // Mobile Auto Slider
  useEffect(() => {
    if (!isMobile()) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => {
        const updated = { ...prev };

        properties.forEach((property) => {
          const images = getGalleryImages(property);
          if (images.length <= 1) return;

          const current = updated[property.id] || 0;
          updated[property.id] = (current + 1) % images.length;
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [properties]);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "available") // ⭐ This hides rented properties
      .order("created_at", { ascending: false });

    setProperties(data);
  }

  // Same logic as PropertyDetails
  function getGalleryImages(property) {
    if (!property) return [];

    if (Array.isArray(property.images)) return property.images;

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

  const nextImage = (e, property) => {
    e.stopPropagation();
    const images = getGalleryImages(property);

    setActiveImage((prev) => {
      const current = prev[property.id] || 0;
      return { ...prev, [property.id]: (current + 1) % images.length };
    });
  };

  const prevImage = (e, property) => {
    e.stopPropagation();
    const images = getGalleryImages(property);

    setActiveImage((prev) => {
      const current = prev[property.id] || 0;
      return {
        ...prev,
        [property.id]: (current - 1 + images.length) % images.length,
      };
    });
  };

  return (
    <>
    <div className="rent-page">
      <h1 className="rent-title">Homes for Rent</h1>

      <div className="property-grid">
        {properties.map((property) => {
          const images = getGalleryImages(property);
          const current = activeImage[property.id] || 0;

          return (
            <div
              key={property.id}
              className="rent-property-card"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <div className="rent-card-image">
                {images.length > 0 ? (
                  <img src={images[current]} alt="property" />
                ) : (
                  <div className="no-image">No Image</div>
                )}

                <div className="price-tag">
                  ${Number(property.price).toLocaleString()}
                </div>

                {!isMobile() && images.length > 1 && (
                  <>
                    <button
                      className="slider-btn left"
                      onClick={(e) => prevImage(e, property)}
                    >
                      ‹
                    </button>

                    <button
                      className="slider-btn right"
                      onClick={(e) => nextImage(e, property)}
                    >
                      ›
                    </button>
                  </>
                )}

                {images.length > 1 && (
                  <div className="image-dots">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        className={
                          i === current ? "dot active-dot" : "dot"
                        }
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="card-content">
                <h3>{property.title}</h3>

                <p className="card-address">
                  {property.address}, {property.city}, {property.zipcode}
                </p>

                <div className="rent-card-actions">
                  <button
                    className="call-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isMobile()) {
                        window.location.href = "tel:+1 (479) 995-9165";
                      } else {
                        setShowCallPopup(property);
                      }
                    }}
                  >
                    Call
                  </button>

                  <button
                    className="tour-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTourProperty(property);
                    }}
                  >
                    Request a Tour
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call Popup */}
      {showCallPopup && (
        <div
          className="call-popup-overlay"
          onClick={() => setShowCallPopup(null)}
        >
          <div className="call-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Contact Agent</h3>
            <p>{showCallPopup.address}</p>
            <a href="tel:+1 (479) 995-9165" className="popup-call-btn">
              Call Now
            </a>
          </div>
        </div>
      )}

      {tourProperty && (
        <ScheduleTourModal
          propertyId={tourProperty.id}
          closeModal={() => setTourProperty(null)}
        />
      )}
    </div>
    <Footer />
    </>
  );
}