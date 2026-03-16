// ============================================================
// src/pages/NotFound/NotFound.jsx
// ============================================================
// 404 Not Found page with a flower shop themed message
// Includes links back to Home and Shop with Navbar/Footer
// ============================================================

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div>
      <Navbar />
      
      <div className="notfound-container">
        <div className="notfound-content">
          {/* 404 with flower emoji */}
          <div className="notfound-header">
            <h1 className="notfound-code">404</h1>
            <p className="notfound-flower">🌹</p>
          </div>

          {/* Flower-themed message */}
          <h2 className="notfound-title">This flower bed doesn't exist</h2>
          <p className="notfound-message">
            Looks like this page has wilted away. Don't worry, we have plenty of fresh flowers waiting for you!
          </p>

          {/* Call-to-action buttons */}
          <div className="notfound-buttons">
            <Link to="/" className="notfound-btn notfound-btn-primary">
              Back to Home
            </Link>
            <Link to="/shop" className="notfound-btn notfound-btn-secondary">
              Browse Our Shop
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
