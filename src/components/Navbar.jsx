
import { useState, useEffect } from "react";
import logo from "../assets/grandview.png";
import { Link } from "react-router-dom";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);  
  const closeMenu = () => setMenuOpen(false);

  // useEffect(() => {

  //   const handleScroll = () => {
  //     if (window.scrollY > 60) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);

  // }, []);

  useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Existing background change
    if (currentScrollY > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // NEW: hide/show logic (only for mobile)
    if (window.innerWidth <= 900) {
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling DOWN
        setShowNavbar(false);
      } else {
        // scrolling UP
        setShowNavbar(true);
      }
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);

  return (

    <header className={`navbar ${scrolled ? "scrolled" : ""} ${showNavbar ? "show" : "hide"}`}>

      <div className="nav-container">

        <Link to="/" className="logo">

          <img src={logo} alt="Grandview Logo" />

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

  <Link to="/" onClick={closeMenu}>Home</Link>
  <Link to="/rent" onClick={closeMenu}>Lease</Link>
  <div className="navbar-item dropdown">
  <span>Services ▾</span>

  <div className="dropdown-menu">
    <a href="/rent-lead">Rent Your Property</a>
    <a href="/seller-lead">Sell Your Property</a>
  </div>
</div>
  <Link to="/agents" onClick={closeMenu}>Agents</Link>
  <Link to="/commission-plan" onClick={closeMenu}>Join Us</Link>
  
  <Link to="/about" onClick={closeMenu}>About Us</Link>
  <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
  


</nav>

      </div>

    </header>
  );
}

export default Navbar;
