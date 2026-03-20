

import { Link } from "react-router-dom";
import agentsData from "../data/agentsData";
import "../styles/agents.css";
import Footer from "../components/Footer";

export default function Agents() {
  return (
    <>
    <div className="agents-page">

      {/* ===== HERO ===== */}
      <div className="agents-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>
            Meet Our <span>Elite Agents</span>
          </h1>

          <p>
            Discover trusted professionals delivering exceptional real estate
            experiences tailored to your lifestyle.
          </p>
        </div>
      </div>

      {/* ===== PREMIUM INTRO SECTION ===== */}
      <div className="agents-intro">

        <div className="intro-card">

          <h2>
            Our <span>Real Estate Experts</span>
          </h2>

          <p className="intro-text">
            At Grandview Properties, our agents are more than just property consultants —
            they are trusted advisors committed to helping you navigate the real estate
            market with confidence. With deep local expertise and a client-first approach,
            every experience is seamless and rewarding.
          </p>

          <p className="intro-text">
            Whether you're buying your dream home, selling a premium property, or investing,
            our professionals deliver excellence at every step of your journey.
          </p>

          {/* STATS */}
          <div className="intro-stats">
            <div>
              <h3>500+</h3>
              <p>Properties Sold</p>
            </div>

            <div>
              <h3>300+</h3>
              <p>Happy Clients</p>
            </div>

            <div>
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
          </div>

        </div>

      </div>

      {/* ===== AGENT CARDS ===== */}
      <div className="agent-list">
        {agentsData.map((agent) => (
          
          <div className="agent-card" key={agent.id}>

            <div className="agent-image">
              <img src={agent.photo} alt={agent.name} />
            </div>

            <div className="agent-info">
              <h3>{agent.name}</h3>
              <p className="city">{agent.city}</p>
              <p className="bio">{agent.bio}</p>
            </div>

            {/* <div className="agent-stats">
              <span>{agent.experience} yrs</span>
              <span>{agent.properties} listings</span>
            </div> */}

            <div className="agent-contact">
              <Link to={`/agents/${agent.id}`}>
                <button>View Profile</button>
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