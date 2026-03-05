import { useEffect, useState } from "react";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/properties")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProperties(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Available Properties</h2>

      {properties.map((property) => (
        <div key={property.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{property.title}</h3>
          <p>{property.city}</p>
          <p>₹ {property.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;