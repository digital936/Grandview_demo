

import { Link } from "react-router-dom";
import agentsData from "../data/agentsData";
import "../styles/agents.css";
import "../styles/animations.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Footer from "../components/Footer";

export default function Agents() {
  useScrollAnimation();
  return (
    <>
    <div className="agents-page">

      {/* ===== HERO ===== */}
      <div className="agents-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 data-animate className="fade-up">
            Meet Our <span>Elite Agents</span>
          </h1>

          <p data-animate className="fade-up fade-up-delay-1">
            Discover trusted professionals delivering exceptional real estate
            experiences tailored to your lifestyle.
          </p>
        </div>
      </div>

      {/* ===== PREMIUM INTRO SECTION ===== */}
      <div className="agents-intro">

        <div className="intro-card" data-animate>

          <h2 data-animate className="fade-up">
            Our <span>Real Estate Experts</span>
          </h2>

          <p className="intro-text" data-animate>
            At Grandview Properties, our agents are more than just property consultants —
            they are trusted advisors committed to helping you navigate the real estate
            market with confidence. With deep local expertise and a client-first approach,
            every experience is seamless and rewarding.
          </p>

          <p className="intro-text" data-animate>
            Whether you're buying your dream home, selling a premium property, or investing,
            our professionals deliver excellence at every step of your journey.
          </p>

          {/* STATS */}
          <div className="intro-stats" data-animate>
            <div className="fade-up fade-up-delay-1">
              <h3>500+</h3>
              <p>Properties Sold</p>
            </div>

            <div className="fade-up fade-up-delay-2">
              <h3>300+</h3>
              <p>Happy Clients</p>
            </div>

            <div className="fade-up fade-up-delay-3">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
          </div>

        </div>

      </div>

      {/* ===== AGENT CARDS ===== */}
      <div className="agent-list">
        {agentsData.map((agent) => (
          
          <div className="agent-card fade-right" data-animate key={agent.id}>

            <div className="agent-image">
              <img src={agent.photo} alt={agent.name} />
            </div>

            <div className="agent-info">
              <h3 data-animate className="fade-up">{agent.name}</h3>
              <p className="city" data-animate>{agent.city}</p>
              <p className="bio" data-animate>{agent.bio}</p>
            </div>

            {/* <div className="agent-stats">
              <span>{agent.experience} yrs</span>
              <span>{agent.properties} listings</span>
            </div> */}

            <div className="agent-contact">
              <Link to={`/agents/${agent.id}`}>
                <button data-animate className="fade-up fade-up-delay-1">View Profile</button>
              </Link>
            </div>

          </div>

        ))}
      </div>

    </div>
    <Footer />
    </>
  );
}