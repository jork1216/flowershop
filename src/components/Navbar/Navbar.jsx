// ============================================================
// src/components/Navbar/Navbar.jsx
// ------------------------------------------------------------
// CHANGES FROM ORIGINAL:
//  1. Imported useCart to read the total item count
//  2. Wrapped the cart SVG icon in a Link to /cart
//  3. Added a red badge bubble showing the number of items
//     (only visible when there's something in the cart)
// ============================================================

import { NavLink, Link } from "react-router-dom"; 
import UserMenu from "./UserMenu";
import { useCart } from "../../context/CartContext";
import './Navbar.css';

export default function Navbar() {
  // totalItems is the sum of all quantities in the cart
  // e.g. 2 roses + 1 tulip = totalItems of 3
  const { totalItems } = useCart();

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        <div className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/ourstory" className="nav-link">Our Story</NavLink>
        </div>

        <div className="nav-brand">
          <div className="logo-text">
            <span className="logo-flower">Flower</span>
            <span className="logo-shop">Shop</span>
          </div>
        </div>

        <div className="nav-icons">
          {/* Search icon — still decorative for now (Day 4 will fix this) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <UserMenu />

          {/*
            CHANGED: Wrapped the cart icon in a relative-positioned
            div so we can position the badge on top of it.
            The whole thing is also now a Link to /cart.
          */}
          <Link to="/cart" className="cart-icon-wrapper">
            {/* Cart bag icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>

            {/*
              Only show the badge when there's at least 1 item.
              The && operator means: "only render this if the
              left side is truthy (i.e. totalItems > 0)"
            */}
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>

      </nav>
    </header>
  );
}