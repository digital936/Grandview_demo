import { useState } from "react";
// import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Grandview Realty" />
            <span>Grandview Realty</span>
          </Link>
        </div>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <a href="/">Home</a>
          {/* <a href="/buy">Sale</a> */}
          <a href="/rent">Rent</a>
          <a href="/agents">Agents</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          {/* <a href="/admin">Admin</a> */}
          <a href="/Login">Login</a>
          
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
