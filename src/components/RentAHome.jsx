

import { Link } from "react-router-dom";
import "../styles/RentAHome.css";

const RentAHome = () => {
  return (
    <section className="promotion-section">

      <div className="promotion-wrapper">

        <div className="promotion-glass">

          <div className="promotion-grid">

            {/* LEFT CONTENT */}
            <div className="promotion-content">

              <p className="promotion-tag">Rent a Home</p>

              <h2 className="promotion-title">
                Rental Homes for Everyone
              </h2>

              <p className="promotion-description">
                Explore apartments, builder floors, villas and luxury homes
                with professional property management and transparent pricing.
              </p>

              <div className="promotion-button-wrapper">
                <Link to="/rent">
                  <button className="promotion-button">
                    Explore Rentals
                  </button>
                </Link>
              </div>

            </div>

            {/* IMAGE */}
            <div className="promotion-image-card">

              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                alt="Luxury Rental Home"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default RentAHome;