
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import "../styles/Rent.css";

export default function Rent() {
  const [properties, setProperties] = useState([]);
  const [tourProperty, setTourProperty] = useState(null);
  const [callPopup, setCallPopup] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false });

    setProperties(data || []);
  }

  function getImages(property) {
    if (!property?.images) return [];
    if (Array.isArray(property.images)) return property.images;
    try {
      return JSON.parse(property.images);
    } catch {
      return [];
    }
  }

  return (
    <div className="rm-page">
      <h1 className="rm-title">Homes for Rent</h1>

      <div className="rm-grid">
        {properties.map((p) => {
          const images = getImages(p);

          return (
            <div
              key={p.id}
              className="rm-card"
              onClick={() => navigate(`/property/${p.id}`)}
            >
              <div className="rm-img-wrap">
                <img src={images[0]} alt="" />

                <div className="rm-price">
                  ${Number(p.price).toLocaleString()}/mo
                </div>
              </div>

              <div className="rm-body">
                <h3 className="rm-specs">
                  {p.beds} bd | {p.baths} ba | {p.sqft} sqft
                </h3>

                <p className="rm-address">
                  {p.address}, {p.city}
                </p>

                <div className="rm-actions">
                  <button
                    className="rm-btn-outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTourProperty(p);
                    }}
                  >
                    Request a Tour
                  </button>

                  <button
                    className="rm-btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCallPopup(p);
                    }}
                  >
                    Call
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CALL POPUP */}
      {callPopup && (
        <div className="rm-popup-overlay" onClick={() => setCallPopup(null)}>
          <div className="rm-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Contact Agent</h3>
            <p>{callPopup.address}</p>
            <a href="tel:+14799959165" className="rm-call-btn">
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
  );
}