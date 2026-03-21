import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/FilteredProperties.css";

export default function FilteredProperties() {

  const { type } = useParams(); // available | rented
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, [type]);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("status", type);

    if (!error) setProperties(data);
  };

  return (
  <div className="filtered-container">

    <h2 className="filtered-header">
      {type} Properties
    </h2>

    {properties.length === 0 ? (
      <div className="no-data">Loading...</div>
    ) : (
      <div className="table-wrapper">

        <table className="styled-table">

          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.address}</td>
                <td>$ {p.price}</td>

                <td>
                  <span className={`status ${p.status}`}>
                    {p.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    )}
  </div>
  );
}