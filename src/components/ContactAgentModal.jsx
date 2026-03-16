import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/contactAgent.css";

export default function ContactAgentModal({ agent, closeModal }) {

const [formData,setFormData] = useState({
name:"",
email:"",
phone:"",
message:""
})

const [loading,setLoading] = useState(false)

function handleChange(e){
setFormData({...formData,[e.target.name]:e.target.value})
}

async function handleSubmit(e){

e.preventDefault()
setLoading(true)

const { error } = await supabase
.from("agent_inquiries")
.insert([
{
agent_id:agent.id,
agent_name:agent.name,
name:formData.name,
email:formData.email,
phone:formData.phone,
message:formData.message
}
])

setLoading(false)

if(error){
alert("Something went wrong")
console.log(error)
return
}

alert("Message sent successfully!")

closeModal()
}

return(

<div className="modal-overlay">

<div className="contact-modal">

<h2>Contact {agent.name}</h2>

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

<textarea
name="message"
placeholder="Write your message..."
rows="4"
onChange={handleChange}
/>

<div className="modal-buttons">

<button type="submit" className="send-btn">

{loading ? "Sending..." : "Send Message"}

</button>

<button
type="button"
className="cancel-btn"
onClick={closeModal}
>
Cancel
</button>

</div>

</form>

</div>

</div>

)
}