import { useParams } from "react-router-dom";
import { useState } from "react";
import agentsData from "../data/agentsData";
import ContactAgentModal from "../components/ContactAgentModal";
import ScheduleMeetingModal from "../buttons/ScheduleMeetingModal";
import "../styles/agentProfile.css";

export default function AgentProfile() {

  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);
  const [showSchedule,setShowSchedule] = useState(false)

  const agent = agentsData.find((a) => a.id === parseInt(id));

  if (!agent) {
    return <h2>Agent not found</h2>;
  }

  return (
    <div className="agent-profile">

      <div className="profile-container">

        <img src={agent.photo} alt={agent.name} className="profile-image" />

        <div className="profile-info">

          <h1>{agent.name}</h1>

          <p className="profile-city">{agent.city}</p>

          <p className="profile-bio">{agent.bio}</p>

          <div className="profile-stats">

            <div>
              <h3>{agent.experience}</h3>
              <p>Years Experience</p>
            </div>

            <div>
              <h3>{agent.properties}</h3>
              <p>Listings</p>
            </div>

          </div>

          <div className="profile-contact">

            <p><strong>Phone:</strong> {agent.phone}</p>
            <p><strong>Email:</strong> {agent.email}</p>

            <button
              className="contact-btn"
              onClick={() => setShowContact(true)}
            >
              Contact Agent
            </button>

            <button
className="contact-btn"
onClick={() => setShowSchedule(true)}
>
Schedule Meeting
</button>

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