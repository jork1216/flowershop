import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-wrapper">
      
      {/* 1. Top Red Banner Section */}
      <div className="footer-top-banner">
        <h2>Flowers that last a lifetime.</h2>
        <p>Beautifully preserved. Artistically arranged. Delivered to your door.</p>
        <Link to="/shop" className="order-btn">ORDER NOW</Link>
      </div>

      {/* 2. Bottom Black Footer Section */}
      <div className="footer-main-black">
        
        {/* Navigation and Logo Row */}
        <div className="footer-columns">
          
          {/* Left Column: Navigation Links */}
          <div className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/custom">Customized Bouquet</Link>
          </div>

          {/* Right Column: Logo and Socials */}
          <div className="footer-brand">
            <div className="brand-logo">
              Bouquet<br />Shop
            </div>
            <div className="social-icons">
              {/* Facebook Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              {/* Instagram Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              {/* Email Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
          </div>
        </div>

        {/* Bottom Legal Links Row */}
        <div className="footer-legal">
          <p className="copyright">© 2026 Bouquet Shop PH</p>
          <div className="legal-links">
            <Link to="/refund">Refund policy</Link>
            <Link to="/privacy">Private policy</Link>
            <Link to="/terms">Terms of service</Link>
            <Link to="/shipping">Shipping policy</Link>
            <Link to="/contact">Contact Information</Link>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;