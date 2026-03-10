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
  const [cardsPerView, setCardsPerView] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNewProperties();
    updateCardsPerView();

    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const updateCardsPerView = () => {
    const width = window.innerWidth;

    if (width < 600) {
      setCardsPerView(1);
    } else if (width < 1024) {
      setCardsPerView(2);
    } else {
      setCardsPerView(3);
    }
  };

  const fetchNewProperties = async () => {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    setProperties(data || []);
    setLoading(false);
  };

  const nextSlide = () => {
    if (currentIndex < properties.length - cardsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/property/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
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
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
              }}
            >

              {properties.map((item) => (

                <div className="nl-card" key={item.id}>

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

                    <div className="nl-specs">
                      <span><FaBed /> {item.beds}</span>
                      <span><FaBath /> {item.baths}</span>
                      <span><BiArea /> {item.sqft} sqft</span>
                    </div>

                    <div className="nl-buttons">

                      <div className="top-row">
                        <ZillowButton zillowLink={item.zillow_link} />
                        <ScheduleTourModal propertyId={item.id} />
                      </div>

                      <button
                        className="nl-details-btn"
                        onClick={() => handleNavigate(item.id)}
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
            disabled={currentIndex >= properties.length - cardsPerView}
          >
            {">"}
          </button>

        </div>
      </div>
    </section>
  );
};

export default NewlyLaunched;