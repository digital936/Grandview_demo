
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import agentsData from "../data/agentsData";
import ContactAgentModal from "../components/ContactAgentModal";
import ScheduleMeetingModal from "../buttons/ScheduleMeetingModal";
import "../styles/agentProfile.css";

export default function AgentProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [showContact, setShowContact] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const agent = agentsData.find((a) => a.id === parseInt(id));

  if (!agent) {
    return <h2>Agent not found</h2>;
  }

  return (
    <div className="agent-profile">

      <div className="profile-container">

        {/* ❌ CLOSE BUTTON */}
        <button 
          className="close-btn"
          onClick={() => navigate("/agents")}
        >
          ×
        </button>

        <img src={agent.photo} alt={agent.name} className="profile-image" />

        <div className="profile-info">

          <h1>{agent.name}</h1>

          <p className="profile-city">{agent.city}</p>

          <p className="profile-bio">{agent.bio}</p>

          <div className="profile-contact">

            <p><strong>Phone:</strong> {agent.phone}</p>
            <p><strong>Email:</strong> {agent.email}</p>

          </div>

        </div>

      </div>

      {showContact && (
        <ContactAgentModal
          agent={agent}
          closeModal={() => setShowContact(false)}
        />
      )}

      {showSchedule && (
        <ScheduleMeetingModal
          agent={agent}
          closeModal={() => setShowSchedule(false)}
        />
      )}

    </div>
  );
}