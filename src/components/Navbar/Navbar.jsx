import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar-wrapper">
      
      <nav className="navbar">
        {/* Left Section: Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/ourstory">Our Story</Link>
        </div>

        {/* Center Section: Logo */}
        <div className="nav-brand">
          <div className="logo-text">
            <span className="logo-bouquet">Bouquet</span>
            <span className="logo-shop">Shop</span>
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="nav-icons">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          
          {/* User Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          
          {/* Shopping Bag Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
      </nav>
    </header>
  );
}