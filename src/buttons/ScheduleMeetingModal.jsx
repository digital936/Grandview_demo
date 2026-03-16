import { useState } from "react";
import { supabase } from "../lib/supabase";
import "./scheduleMeeting.css";

export default function ScheduleMeetingModal({ agent, closeModal }) {

const [formData,setFormData] = useState({
name:"",
email:"",
phone:"",
date:"",
time:""
})

const [loading,setLoading] = useState(false)


function handleChange(e){
setFormData({...formData,[e.target.name]:e.target.value})
}

async function handleSubmit(e){

e.preventDefault()
setLoading(true)

const { error } = await supabase
.from("agent_appointments")
.insert([
{
agent_id:agent.id,
agent_name:agent.name,
name:formData.name,
email:formData.email,
phone:formData.phone,
date:formData.date,
time:formData.time
}
])

setLoading(false)

if(error){
alert("Something went wrong")
return
}

alert("Meeting scheduled successfully!")

closeModal()
}

return(

<div className="modal-overlay">

<div className="schedule-modal">

<h2>Schedule Meeting with {agent.name}</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Your Name"
required
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Your Email"
required
onChange={handleChange}
/>

<input
type="text"
name="phone"
placeholder="Phone Number"
onChange={handleChange}
/>

<label>Select Date</label>
<input
type="date"
name="date"
required
onChange={handleChange}
/>

<label>Select Time</label>
<select name="time" required onChange={handleChange}>

<option value="">Choose Time</option>
<option>09:00 AM</option>
<option>10:00 AM</option>
<option>11:00 AM</option>
<option>01:00 PM</option>
<option>02:00 PM</option>
<option>03:00 PM</option>

</select>

<div className="schedule-buttons">

<button type="submit" className="book-btn">
{loading ? "Booking..." : "Schedule Meeting"}
</button>

<button type="button" onClick={closeModal} className="cancel-btn">
Cancel
</button>

</div>

</form>

</div>

</div>

)
}