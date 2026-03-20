// import { useState } from "react";
// // import "./Navbar.css";
// import logo from "../assets/logo.png";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="navbar">
//       <div className="nav-container">
//         <div className="logo">
//           <Link to="/">
//             <img src={logo} alt="Grandview Realty" />
//             <span>Grandview Realty</span>
//           </Link>
//         </div>

//         <div
//           className="hamburger"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
//           <a href="/">Home</a>
//           {/* <a href="/buy">Sale</a> */}
//           <a href="/rent">Rent</a>
//           <a href="/agents">Agents</a>
//           <a href="/about">About Us</a>
//           <a href="/contact">Contact Us</a>
//           {/* <a href="/admin">Admin</a> */}
//           <a href="/Login">Login</a>
          
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>

      <div className="nav-container">

        <Link to="/" className="logo">

          <img src={logo} alt="Grandview Realty"/>

        </Link>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>

          <Link to="/">Home</Link>
          <Link to="/rent">Rent</Link>
          {/* <Link to="/contact">Contact</Link> */}
          <Link to="/about">About</Link>

          {/* <Link to="/login" className="nav-cta">
            Login
          </Link> */}

        </nav>

      </div>

    </header>
  );
}

export default Navbar;
