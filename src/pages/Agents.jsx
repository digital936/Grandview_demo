import { Link } from "react-router-dom";
import agentsData from "../data/agentsData";
import "../styles/agents.css";

export default function Agents() {

  return (
    <div className="agents-page">

      <div className="agents-hero">
        <h1>Meet Our Real Estate Agents</h1>
        <p>
          Our experienced real estate professionals are dedicated to helping you
          buy, sell, and rent properties with confidence.
        </p>
      </div>

      <div className="agent-list">

        {agentsData.map((agent) => (

          <div className="agent-row" key={agent.id}>

            <img src={agent.photo} alt={agent.name} />

            <div className="agent-info">
              <h3>{agent.name}</h3>
              <p className="city">{agent.city}</p>
              <p className="bio">{agent.bio}</p>

              <div className="agent-stats">
                <span>{agent.experience} Years Experience</span>
                <span>{agent.properties} Listings</span>
              </div>
            </div>

            <div className="agent-contact">

              <p>{agent.phone}</p>
              <p>{agent.email}</p>

              <Link to={`/agents/${agent.id}`}>
                <button>View Profile</button>
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}