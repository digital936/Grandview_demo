
import { useState, useEffect } from "react";
import logo from "../assets/grandview.png";
import { Link } from "react-router-dom";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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

  <Link to="/about" onClick={closeMenu}>About Us</Link>
  <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
  <Link to="/agents" onClick={closeMenu}>Agents</Link>


</nav>

      </div>

    </header>
  );
}

export default Navbar;
