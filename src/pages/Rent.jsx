

import { FaBed, FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/Rent.css";

import ScheduleTourModal from "../buttons/ScheduleTourModal";
import ZillowButton from "../buttons/ZillowButton";
import Footer from "../components/Footer";

export default function Rent() {

  const [properties, setProperties] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  /* ⭐ modal state */
  const [showTourModal, setShowTourModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProperties();
  }, []);

  /* ⭐ GET CITY FROM URL (Top Cities click) */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get("city");

    if (city) {
      setSelectedCity(city);
    }
  }, [location]);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "available");

    if (error) {
      console.log(error);
    } else {
      setProperties(data);
    }
  }

  const handleNavigate = (id) => {
    navigate(`/property/${id}`);
  };

  /* ========================= */
  /* OPEN MODAL FUNCTION       */
  /* ========================= */

  const openTourModal = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setShowTourModal(true);
  };

  const closeTourModal = () => {
    setShowTourModal(false);
    setSelectedPropertyId(null);
  };

  /* ========================= */
  /* FILTER LOGIC              */
  /* ========================= */

  let filteredProperties = properties;

  if (selectedCity) {
    filteredProperties = filteredProperties.filter(
      (property) => property.city === selectedCity
    );
  }

  if (sortOrder === "lowToHigh") {
    filteredProperties = [...filteredProperties].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOrder === "highToLow") {
    filteredProperties = [...filteredProperties].sort(
      (a, b) => b.price - a.price
    );
  }

  /* ========================= */
  /* UNIQUE CITY LIST          */
  /* ========================= */

  const cities = [...new Set(properties.map((p) => p.city))];

  /* ========================= */
  /* CLEAR FILTERS             */
  /* ========================= */

  const clearFilters = () => {
    setSelectedCity("");
    setSortOrder("");
  };

  return (
    <>
      <div className="rent-page">

        <h1 className="page-title">
          {selectedCity
            ? `Properties for Rent in ${selectedCity}`
            : "Properties for Rent"}
        </h1>

        {/* FILTER SECTION */}
        <div className="rent-filters">

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">All Cities</option>

            {cities.map((city, index) => (
              <option className="cities-filter" key={index} value={city}>
                {city}
              </option>
            ))}

          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort By Rent</option>
            <option className="cities-filter" value="lowToHigh">Low to High</option>
            <option className="cities-filter" value="highToLow">High to Low</option>
          </select>

          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

        {/* PROPERTY GRID */}
        <div className="property-grid">

          {filteredProperties.length === 0 && (
            <p>No properties found.</p>
          )}

          {filteredProperties.map((property) => (
            <div
              className="property-cards"
              key={property.id}
            >
              <div className="image-wrapper">

                <img
                  src={property.imageUrl}
                  alt={property.title}
                />

                <span className="offer-badge">OFFER</span>

                <span className="price-tag">
                  ${Number(property.price).toLocaleString()}
                </span>

              </div>

              <div className="property-content">

                <h3>{property.title} {property.city}, {property.zipcode}</h3>
                

                <p className="location">
                  {property.city}
                </p>

                <div className="property-info">

                  <span>
                    <FaBed size={22} /> {property.beds}
                  </span>

                  <span>
                    <FaBath size={22} /> {property.baths}
                  </span>

                  <span>
                    <BiArea size={22} /> {property.sqft} sqft
                  </span>

                </div>

                <div className="card-buttons">

                  <div className="top-row">

                    <ZillowButton
                    className="schedule-btn"
                      zillowLink={property.zillow_url}
                    />

                    <button
                      className="schedule-btn"
                      onClick={() => openTourModal(property.id)}
                    >
                      Schedule Tour
                    </button>

                  </div>

                  <button
                    className="details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(property.id);
                    }}
                  >
                    View Details
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

      {/* MODAL */}
      {showTourModal && (
        <ScheduleTourModal
          propertyId={selectedPropertyId}
          closeModal={closeTourModal}
        />
      )}

      <Footer />
    </>
  );
}