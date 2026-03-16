import { FaPhone, FaEnvelope, FaStar, FaCalendar } from "react-icons/fa";

export default function AgentCard({agent}){

return(

<div className="agent-card">

<div className="agent-image">

<img src={agent.photo} alt={agent.name}/>

{/* ⭐ NEW BADGES */}

<div className="agent-badges">
<span>{agent.experience} yrs</span>
<span>{agent.properties} homes</span>
</div>

</div>

<div className="agent-body">

<h3>{agent.name}</h3>

<p className="agent-city">{agent.city}</p>

{/* ⭐ NEW DYNAMIC STARS */}

<div className="agent-rating">

{[...Array(5)].map((_,i)=>(
<FaStar key={i} className={i < Math.round(agent.rating) ? "star-active":"star"}/>
))}

<span>{agent.rating}</span>

</div>

<p className="agent-bio">{agent.bio}</p>

{/* ⭐ NEW ACTION BUTTONS */}

<div className="agent-actions">

<a href={`tel:${agent.phone}`} className="icon-btn">
<FaPhone/>
</a>

<a href={`mailto:${agent.email}`} className="icon-btn">
<FaEnvelope/>
</a>

<button className="schedule-btn">
<FaCalendar/> Schedule
</button>

</div>

</div>

</div>

)
}