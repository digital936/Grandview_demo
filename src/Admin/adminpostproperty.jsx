import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/adminpostproperty.css";   // ✅ correct path


export default function AdminPostProperties() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {

    const { data, error } = await supabase
      .from("post_properties")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching properties:", error);
    } else {
      setProperties(data);
    }

    setLoading(false);
  };

  return (
    <div className="admin-properties">

      <h2>Posted Properties</h2>

      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <table className="property-table">

          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
              <th>Zip</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Price ($)</th>
              <th>Beds</th>
              <th>Baths</th>
              <th>Sqft</th>
            </tr>
          </thead>

          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="10">No properties submitted yet</td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.address}</td>
                  <td>{property.city}</td>
                  <td>{property.zip}</td>
                  <td>{property.name}</td>
                  <td>{property.email}</td>
                  <td>{property.phone}</td>
                  <td>${property.price}</td>
                  <td>{property.beds}</td>
                  <td>{property.baths}</td>
                  <td>{property.sqft}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      )}

    </div>
  );
}