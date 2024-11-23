import React, { useState } from "react";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://res.cloudinary.com/dutdah0l9/image/upload/v1720058694/Swiggy_logo_bml6he.png"
          alt="logo"
        />
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="hamburger-icon">☰</span>
      </button>
      <div className={`nav-items ${menuOpen ? "show" : "hide"}`}>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>
            <span className="cart-icon">🛒</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
