

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TopCities.css";

const cities = [
  {
    name: "Bentonville",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Centerton",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Bella Vista",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Prairie Grove",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Siloam Springs",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80"
  }
];

const TopCities = () => {

  const navigate = useNavigate();

  const handleCityClick = (city) => {
    navigate(`/rent?city=${city}`);
  };

  return (
    <section className="top-cities">

      <p className="small-title">TOP CITIES</p>

      <h2 className="main-title">
        Explore Rental Properties in Popular Arkansas Cities
      </h2>

      <div className="cities-grid">

        {cities.map((city, index) => (
          <div
            className="city-item"
            key={index}
            onClick={() => handleCityClick(city.name)}
          >

            <img src={city.image} alt={city.name} />

            <div className="city-overlay">
              <h3>{city.name}</h3>
              <span>View Properties</span>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default TopCities;