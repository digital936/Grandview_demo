import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/SearchResults.css";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []); // ✅ run only once

  async function fetchResults() {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams(location.search);
      const city = queryParams.get("city");
      const category = queryParams.get("category");
      const type = queryParams.get("type");

      let query = supabase.from("properties").select("*");

      if (city && city.trim() !== "") {
        query = query.ilike("city", `%${city}%`);
      }

      if (category && category.trim() !== "") {
        query = query.eq("category", category.toLowerCase());
      }

      if (type && type.trim() !== "") {
        query = query.eq("property_type", type);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase Error:", error);
        setProperties([]);
      } else {
        setProperties(data || []);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      setProperties([]);
    }

    setLoading(false);
  }

  return (
    <div className="search-page">
      <h2>Search Results</h2>

      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="search-grid">
          {properties.map((property) => (
            <div
              key={property.id}
              className="search-card"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <img
                src={property.imageUrl || "/no-image.png"}
                alt={property.title}
              />
              <div className="search-content">
                <h3>{property.title}</h3>
                <p>{property.city}</p>
                <p className="price">
                  ₹{Number(property.price).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}