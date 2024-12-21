import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // selector to get the cart items
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cart items", cartItems);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-orange-500">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img
            className="w-40 h-auto"
            src="https://res.cloudinary.com/dutdah0l9/image/upload/v1720058694/Swiggy_logo_bml6he.png"
            alt="logo"
          />
        </Link>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button
        className="block lg:hidden text-white text-2xl focus:outline-none"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Navigation Items */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute lg:static lg:flex top-16 right-6 lg:top-auto lg:right-auto flex-col lg:flex-row bg-orange-500 lg:bg-transparent w-full lg:w-auto p-4 lg:p-0 lg:items-center rounded-lg lg:rounded-none shadow-lg lg:shadow-none`}
      >
        <ul className="flex flex-col lg:flex-row items-center gap-4">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-medium hover:text-orange-200 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white text-lg font-medium hover:text-orange-200 transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white text-lg font-medium hover:text-orange-200 transition"
            >
              Contact
            </Link>
          </li>
          <li>
            <span className="text-white text-2xl cursor-pointer relative">🛒 <span className="absolute bottom-3 right-1">{cartItems.length || 0}</span></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
