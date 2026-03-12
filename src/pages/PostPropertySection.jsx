import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostPropertySection.css";

const PostPropertySection = () => {
  const navigate = useNavigate();

  return (
    <section className="post-property">
      <div className="container">

        {/* Property Image */}
        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="Sell Property"
          />
        </div>

        {/* Text Content */}
        <div className="content">
          <h2>Sell or Rent Your Property with Grandview</h2>

          <p>
            Reach serious buyers and tenants faster. List your property
            with Grandview Realty and get the right price with maximum visibility.
          </p>

          {/* Button */}
          <div className="buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/post-property")}
            >
              Post Property
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PostPropertySection;