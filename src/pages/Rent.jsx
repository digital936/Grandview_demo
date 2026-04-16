
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import "../styles/Rent.css";

export default function Rent() {
  // Base state
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [cities, setCities] = useState([]);
  
  // Modal state
  const [tourProperty, setTourProperty] = useState(null);
  const [callPopup, setCallPopup] = useState(null);

  // Filter state
  const [selectedCity, setSelectedCity] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  // Re-run filters whenever the properties list or filter selections change
  useEffect(() => {
    applyFilters();
  }, [properties, selectedCity, minBeds, maxPrice]);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false });

    const fetchedData = data || [];
    setProperties(fetchedData);

    // Automatically extract unique cities from the database results
    const uniqueCities = [...new Set(fetchedData.map((p) => p.city))].filter(Boolean);
    setCities(uniqueCities.sort());
  }

  function applyFilters() {
    let result = properties;

    if (selectedCity) {
      result = result.filter((p) => p.city === selectedCity);
    }
    if (minBeds) {
      result = result.filter((p) => Number(p.beds) >= Number(minBeds));
    }
    if (maxPrice) {
      result = result.filter((p) => Number(p.price) <= Number(maxPrice));
    }

    setFilteredProperties(result);
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
      
      {/* 🔥 HEADER (Centered Above Filters) */}
      <div className="rm-header-wrapper">
        <h1 className="rm-title">Properties for Lease</h1>
        <p className="rm-results-count">{filteredProperties.length} results</p>
      </div>

      {/* 🔥 FILTER BAR (Centered) */}
      <div className="rm-filter-bar">
        <div className="rm-filter-container">
          
          <div className="rm-filter-group">
            <label>Location</label>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map((city, idx) => (
                <option key={idx} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="rm-filter-group">
            <label>Bedrooms</label>
            <select 
              value={minBeds} 
              onChange={(e) => setMinBeds(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1+ Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
          </div>

          <div className="rm-filter-group">
            <label>Max Price</label>
            <select 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="">Any Price</option>
              <option value="1000">$1,000 /mo</option>
              <option value="1500">$1,500 /mo</option>
              <option value="2000">$2,000 /mo</option>
              <option value="3000">$3,000 /mo</option>
              <option value="5000">$5,000 /mo</option>
              <option value="10000">$10,000 /mo</option>
            </select>
          </div>

          <button 
            className="rm-reset-btn"
            onClick={() => {
              setSelectedCity("");
              setMinBeds("");
              setMaxPrice("");
            }}
          >
            Reset
          </button>

        </div>
      </div>

      {/* 🔥 PROPERTY GRID */}
      {filteredProperties.length === 0 ? (
        <div className="rm-no-results">
          <h3>No exact matches found</h3>
          <p>Try changing or clearing your filters to see more homes.</p>
        </div>
      ) : (
        <div className="rm-grid">
          {filteredProperties.map((p) => {
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
      )}

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

      {/* TOUR MODAL */}
      {tourProperty && (
        <ScheduleTourModal
          propertyId={tourProperty.id}
          propertyName={tourProperty.address}
          
          closeModal={() => setTourProperty(null)}
        />
      )}
      
    </div>
  );
}