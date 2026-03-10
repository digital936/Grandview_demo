import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/CityProperties.css";

export default function CityProperties() {

  const { cityName } = useParams();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, [cityName]);

  async function fetchProperties() {

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("city", cityName);

    if (error) {
      console.log(error);
    } else {
      setProperties(data);
    }
  }

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="city-page">

      <h1 className="city-title">
        Properties in {cityName}
      </h1>

      <div className="property-grid">

        {properties.map((property) => (

          <div key={property.id} className="property-card">

            <img
              src={property.imageUrl}
              alt={property.title}
            />

            <div className="property-info">

              <h3>{property.title}</h3>

              <p className="price">${property.price}</p>

              <span className="status">{property.status}</span>

              <button
                className="view-btn"
                onClick={() => handleViewDetails(property.id)}
              >
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}