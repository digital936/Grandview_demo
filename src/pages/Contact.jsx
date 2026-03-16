// import React, { useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../styles/Contact.css";
// import Feedback from "./Feedback";
// import Footer from "../components/Footer";


// const Contact = () => {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { error } = await supabase
//       .from("contacts")
//       .insert([formData]);

//     if (error) {
//       alert("Error sending message");
//       console.log(error);
//     } else {
//       alert("Message sent successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         message: ""
//       });
//     }

//     setLoading(false);
//   };

//   return (
//   <>
//     <section className="contact-page">

//       {/* HERO */}
//       <div className="contact-hero">
//         <div className="hero-content">
//           <h1>Let’s Find Your Perfect Property</h1>
//           <p>
//             Connect with Grandview Realty and take the first step toward your dream home.
//           </p>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="contact-container">

//         {/* LEFT SIDE INFO */}
//         <div className="contact-info">
//           <h2>Get In Touch</h2>
//           <p>
//             Whether you're buying, selling, or exploring options, our team is
//             here to guide you with expertise and integrity.
//           </p>

//           <div className="info-item">
//             <h4>📍 Office Location</h4>
//             <p>2711 SE I Street Suite 1 Bentonville Arkansas 72712</p>
//           </div>

//           <div className="info-item">
//             <h4>📞 Phone</h4>
//             <p>+1(479) 995-9165</p>
//           </div>

//           <div className="info-item">
//             <h4>✉ Email</h4>
//             <p>pm@grandviewrealty.us</p>
//           </div>

//           <div className="info-item">
//             <h4>🕒 Working Hours</h4>
//             <p>Mon – Sat : 6:00 AM – 4:00 PM</p>
//           </div>
//         </div>

//         {/* RIGHT SIDE FORM */}
//         <div className="contact-form-wrapper">
//           <div className="footer-right">
//             <h3>Contact Us</h3>

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//               <textarea
//                 name="message"
//                 placeholder="Your Message"
//                 rows="3"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//               ></textarea>

//               <button type="submit" disabled={loading}>
//                 {loading ? "Sending..." : "Send Message"}
//               </button>
//             </form>

//           </div>
//         </div>

//       </div>

//       <Feedback />

//     </section>

//     {/* Footer */}
//     <Footer />

//   </>
// );
// };

// export default Contact;

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/Contact.css";
import Feedback from "./Feedback";
import Footer from "../components/Footer";

const Contact = () => {

const [formData, setFormData] = useState({
name: "",
email: "",
message: ""
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setFormData((prev) => ({
...prev,
[e.target.name]: e.target.value
}));
};

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);


try {
  const { data, error } = await supabase
    .from("contacts")
    .insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message
      }
    ])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    alert("Error sending message. Please try again.");
  } else {
    console.log("Inserted data:", data);
    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  }
} catch (err) {
  console.error("Unexpected error:", err);
  alert("Something went wrong.");
}

setLoading(false);


};

return ( 
  <>
<section className="contact-page">


  <div className="contact-hero">
    <div className="hero-content">
      <h1>Let’s Find Your Perfect Property</h1>
      <p>
        Connect with Grandview Realty and take the first step toward your dream home.
      </p>
    </div>
  </div>

  <div className="contact-container">

    <div className="contact-info">
      <h2>Get In Touch</h2>
      <p>
        Whether you're buying, selling, or exploring options, our team is
        here to guide you with expertise and integrity.
      </p>

      <div className="info-item">
        <h4>📍 Office Location</h4>
        <p>2711 SE I Street Suite 1 Bentonville Arkansas 72712</p>
      </div>

      <div className="info-item">
        <h4>📞 Phone</h4>
        <p>+1 (800) 993-2262</p>
      </div>

      <div className="info-item">
        <h4>✉ Email</h4>
        <p>pm@grandviewrealty.us</p>
      </div>

      <div className="info-item">
        <h4>🕒 Working Hours</h4>
        <p>Mon – Sat : 6:00 AM – 4:00 PM</p>
      </div>
    </div>

    <div className="contact-form-wrapper">
      <div className="footer-right">
        <h3>Contact Us</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>
      </div>
    </div>

  </div>

  <Feedback />

</section>
<Footer />

</>

);
};

export default Contact;