import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img
            className="logo"
            src="https://res.cloudinary.com/dutdah0l9/image/upload/v1720058694/Swiggy_logo_bml6he.png"
            alt="logo"
          />
        </Link>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="hamburger-icon">☰</span>
      </button>
      <div className={`nav-items ${menuOpen ? "show" : "hide"}`}>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
          <li>About</li> 
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <li>
            <span className="cart-icon">🛒</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
