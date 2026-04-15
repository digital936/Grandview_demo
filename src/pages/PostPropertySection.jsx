
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostPropertySection.css";


const PostPropertySection = () => {

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (

    <section className="post-property">

      <div className="post-wrapper">

        <div className="post-glass">

          <div className="post-grid">

            {/* IMAGE */}
            <div className="post-image">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Sell Property"
              />
            </div>

            {/* CONTENT */}
            <div className="post-content">

              <p className="post-tag">For Property Owners</p>

              <h2>
                Sell or Lease Your Property <span>Faster</span>
              </h2>

              <p className="post-desc">
                List your property with Grandview Realty and connect with
                serious buyers and tenants. Our platform ensures maximum
                visibility and professional support.
              </p>

              <button
                className="post-btn"
                // onClick={() => navigate("/post-property")}
                onClick={() => setShowPopup(true)}
              >
                Post Your Property
              </button>

            </div>

          </div>

        </div>

        {showPopup && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h3>What would you like to do?</h3>
      <p>Select an option to continue</p>

      <div className="popup-buttons">
        <button
          className="popup-btn"
          onClick={() => navigate("/rent-lead")}
        >
          Rent Your Property
        </button>

        <button
          className="popup-btn"
          onClick={() => navigate("/seller-lead")}
        >
          Sell Your Property
        </button>
      </div>

      <button
        className="postproperty-popup-close"
        onClick={() => setShowPopup(false)}
      >
        ✕
      </button>
    </div>
  </div>
)}

      </div>

    </section>

  );
};

export default PostPropertySection;