import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [category, setCategory] = useState("buy");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    let url = `/search?city=${city}&category=${category}`;

    if (propertyType && propertyType.trim() !== "") {
      url += `&type=${propertyType}`;
    }

    navigate(url);
  };

  return (
    <section className="hero">
      <div className="overlay">
        <h1>Find Your Dream Home with Grandview Realty</h1>
        <p>Premium properties. Trusted guidance. Exceptional service.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search city or locality"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Town Home">Town Home</option>
            <option value="Single Family House">
              Single Family House
            </option>
          </select>

          <button onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;