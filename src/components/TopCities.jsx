

import React from "react";
import "../styles/TopCities.css";

const cities = [
  {
    name: "Bentonville",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
  },
  {
    name: "Centerton",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Bella Vista",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Twin Groves",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Siloam Springs",
    image:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=800&q=80"
  }
];

const TopCities = () => {
  return (
    <section className="top-cities">
      {/* <div className="container"> */}

        <p className="small-title">TOP CITIES</p>
        <h2 className="main-title">
          Explore Real Estate in Popular Arkansas Cities
        </h2>

        <div className="cities-grid">
          {cities.map((city, index) => (
            <div className="city-item" key={index}>
              <img src={city.image} alt={city.name} />
              <div className="city-info">
                <h3>{city.name}</h3>
                <p>{city.count}</p>
              </div>
            </div>
          ))}
        </div>

      {/* </div> */}
    </section>
  );
};

export default TopCities;
