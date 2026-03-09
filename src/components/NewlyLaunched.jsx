

import { FaBed, FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/NewlyLaunched.css";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import ZillowButton from "../buttons/ZillowButton";

const NewlyLaunched = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 3;
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewProperties();
  }, []);

  const fetchNewProperties = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Error fetching properties:", error);
    } else {
      setProperties(data);
    }

    setLoading(false);
  };

  const nextSlide = () => {
    if (currentIndex + visibleCards < properties.length) {
      setCurrentIndex(currentIndex + visibleCards);
    }
  };

  const prevSlide = () => {
    if (currentIndex - visibleCards >= 0) {
      setCurrentIndex(currentIndex - visibleCards);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/property/${id}`);
  };

  if (loading) {
    return (
      <section className="newly-launched-section">
        <div className="nl-container">
          <div className="nl-header">
            <h2>Newly Launched Properties</h2>
            <p>Loading latest properties...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="newly-launched-section">
      <div className="nl-container">
        <div className="nl-header">
          <h2>Newly Available Properties</h2>
          <p>Explore Grandview’s latest exclusive offers</p>
        </div>

        <div className="nl-carousel-wrapper">
          <button
            className="nl-arrow left"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            {"<"}
          </button>

          <div className="nl-carousel">
            <div
              className="nl-grid"
              style={{
                transform: `translateX(-${(currentIndex / visibleCards) * 100}%)`,
              }}
            >
              {properties.map((item) => (
                <div
                  className="nl-card"
                  key={item.id}
                  // onClick={() => handleNavigate(item.id)}
                >
                  <div className="nl-img">
                    <img src={item.imageUrl} alt={item.title} />

                    <span className="nl-offer-badge">OFFER</span>

                    <span className="nl-price-tag">
                      ${Number(item.price).toLocaleString()}
                    </span>
                  </div>

                  <div className="nl-content">
                    <h3 className="nl-title">{item.title}</h3>
                    <p className="nl-location">{item.city}</p>

                    {/* <div className="nl-specs">
                      <span>🛏 {item.beds}</span>
                      <span>🛁 {item.baths}</span>
                      <span>📐 {item.sqft} sqft</span>
                    </div> */}

                    <div className="nl-specs">
  <span><FaBed size={22} /> {item.beds}</span>
  <span><FaBath size={22} /> {item.baths}</span>
  <span><BiArea size={22} /> {item.sqft} sqft</span>
</div>

                    

                    <div className="nl-buttons">
                      
                      <div className="top-row">
                      {/* <button
                        className="nl-zillow-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.zillow_link) {
                            window.open(item.zillow_link, "_blank");
                          }
                        }}
                      >
                        Zillow
                      </button> */}

                      <ZillowButton zillowLink={item.zillow_link} />

                      <ScheduleTourModal propertyId={item.id} />

                      {/* <button
                        className="nl-tour-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/schedule-tour/${item.id}`);
                        }}
                      >
                        Schedule Tour
                      </button> */}
                      </div>

                      <button
                        className="nl-details-btn"
                        onClick={() => {
                          // e.stopPropagation();
                          handleNavigate(item.id);
                        }}
                      >
                        View Details
                      </button>

                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="nl-arrow right"
            onClick={nextSlide}
            disabled={currentIndex + visibleCards >= properties.length}
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewlyLaunched;