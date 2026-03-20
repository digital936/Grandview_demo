

import "../styles/AboutUs.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <div className="about">

        {/* HERO */}
     <section className="about-hero">
  <div className="hero-overlay"></div>

  <div className="hero-content">
    <h1>Redefining Luxury Living</h1>
    <p>
      At Grandview Realty, we don’t just sell properties — we create experiences.
    </p>
  </div>
</section>

        {/* ABOUT SPLIT */}
        <section className="about-split">
          <div className="about-image"></div>

        <div className="about-text">
  <h2>About Grandview Realty</h2>

  <p>
    Grandview Realty is a premium real estate firm focused on delivering
    exceptional property experiences with transparency, trust, and precision.
  </p>

  <p>
    Whether you're buying, selling, or investing, we ensure every step
    is seamless, data-driven, and tailored to your goals.
  </p>
</div>
        </section>

        {/* STATS */}
      <section className="about-stats">

  <div className="stat">
    <h3>500+</h3>
    <p>Properties Sold</p>
  </div>

  <div className="stat">
    <h3>10+</h3>
    <p>Years Experience</p>
  </div>

  <div className="stat">
    <h3>98%</h3>
    <p>Client Satisfaction</p>
  </div>

</section>

        {/* WHY US */}
        <section className="about-features">
<h2 className="section-title">Why Choose Us</h2>

      <div className="feature-grid">

  <div className="feature-card">
    <div className="icon">
      <svg viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 7L2 14l10 5 10-5-10-5z"/>
      </svg>
    </div>
    <h3>Expert Guidance</h3>
    <p>Deep local knowledge and professional advisory support.</p>
  </div>

  <div className="feature-card">
    <div className="icon">
      <svg viewBox="0 0 24 24">
        <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z"/>
      </svg>
    </div>
    <h3>Premium Listings</h3>
    <p>Curated high-quality properties tailored to your needs.</p>
  </div>

  <div className="feature-card">
    <div className="icon">
      <svg viewBox="0 0 24 24">
        <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm-1 16l-5-5 1.4-1.4L11 13.2l5.6-5.6L18 9z"/>
      </svg>
    </div>
    <h3>Trusted Process</h3>
    <p>Transparent communication and seamless transactions.</p>
  </div>

</div>
        </section>

        {/* OUR TEAM */}
        {/* <section className="about-team">
          <h2>Meet Our Team</h2>
          <p className="team-subtitle">
            Experienced professionals dedicated to your success.
          </p>

          <div className="team-grid">

            <div className="team-card">
              <img
                src="https://images.unsplash.com/photo-1603415526960-f7e0328f6a9b?auto=format&fit=crop&w=600&q=80"
                alt="CEO"
              />
              <h3>Michael Carter</h3>
              <span>Founder & CEO</span>
              <p>Visionary leader with 12+ years in residential and commercial real estate.</p>
            </div>

            <div className="team-card">
              <img
                src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80"
                alt="Director"
              />
              <h3>Sarah Mitchell</h3>
              <span>Sales Director</span>
              <p>Specializes in luxury listings and high-value client relationships.</p>
            </div>

            <div className="team-card">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80"
                alt="Consultant"
              />
              <h3>David Reynolds</h3>
              <span>Property Consultant</span>
              <p>Helps buyers find ideal properties with precision and care.</p>
            </div>

          </div>
        </section> */}

        

      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default AboutUs;