import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/buy.css";

export default function Buy() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("category", "sale")   // 👈 IMPORTANT
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setProperties(data);
    }

    setLoading(false);
  }

  return (
    <div className="buy-page">
      <div className="buy-header">
        <h1>Properties for Sale</h1>
        <p>Find your dream home with Grandview Realty</p>
      </div>

      {loading ? (
        <p className="loading">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="no-data">No properties available for sale yet.</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <div className="buy-property-card" key={property.id}>
              <div className="image-wrapper">
                <img src={property.imageUrl} alt={property.title} />
                {property.featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>

              <div className="property-content">
                <h3>{property.title}</h3>
                <p className="price">${property.price}</p>

                <p className="details">
                  {property.beds} Beds • {property.baths} Baths • {property.sqft} sqft
                </p>

                <p className="city">{property.city}</p>

                <button className="view-btn">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
