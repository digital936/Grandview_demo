// import "../styles/Footer.css";
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">

//         {/* LEFT SIDE */}
//         <div className="footer-left">
//           <h2>Grandview Realty</h2>
//           <p>2711 SE I Street Suite 1</p>
//           <p>Bentonville Arkansas 72712</p>
//           <p>📞 +1 (800) 993-2262</p>
//           <p>✉️ pm@grandviewrealty.us</p>

          
//           <div className="footer-center">
//             <h3>Follow Us</h3>
//             <div className="social-links">

//     <a 
//       href="https://www.facebook.com/profile.php?id=61588482536100" 
//       target="_blank" 
//       rel="noopener noreferrer"
//     >
//       <FaFacebookF />
//     </a>

//     <a 
//       href="https://www.instagram.com/grandviewrealty.us" 
//       target="_blank" 
//       rel="noopener noreferrer"
//     >
//       <FaInstagram />
//     </a>

//     <a 
//       href="https://x.com/Grandview_01" 
//       target="_blank" 
//       rel="noopener noreferrer"
//     >
//       <FaTwitter />
//     </a>

//     <a 
//       href="https://www.youtube.com/" 
//       target="_blank" 
//       rel="noopener noreferrer"
//     >
//       <FaYoutube />
//     </a>

//   </div>
// </div>

//         </div>

//         {/* CENTER */}
        

//         {/* RIGHT SIDE */}
//         <div className="footer-right">
//           <h3>Contact Us</h3>
//           <form>
//             <input type="text" placeholder="Your Name" required />
//             <input type="email" placeholder="Your Email" required />
//             <textarea placeholder="Your Message" rows="3"></textarea>
//             <button type="submit">Send Message</button>
//           </form>
//         </div>

//       </div>

//       <div className="footer-bottom">
//         © 2026 Grandview Realty. All Rights Reserved.
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {

  const handleSubmit = (e) => {
    e.preventDefault(); // 🚫 stop page reload

    alert("Your query submitted successfully!"); // ✅ popup

    e.target.reset(); // 🔄 clear form
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT SIDE */}
        <div className="footer-left">
          <h2>Grandview Realty</h2>
          <p>2711 SE I Street Suite 1</p>
          <p>Bentonville Arkansas 72712</p>
          <p>📞 +1 (800) 993-2262</p>
          <p>✉️ pm@grandviewrealty.us</p>

          <div className="footer-center">
            <h3>Follow Us</h3>
            <div className="social-links">

              <a href="https://www.facebook.com/profile.php?id=61588482536100" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>

              <a href="https://www.instagram.com/grandviewrealty.us" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>

              <a href="https://x.com/Grandview_01" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>

              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="footer-right">
          <h3>Contact Us</h3>

          {/* ✅ FORM */}
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="3"></textarea>
            <button type="submit">Send Message</button>
          </form>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Grandview Realty. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
