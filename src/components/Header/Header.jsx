import roses from '../../assets/roses.jpg';

import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      {/* Left side: Text Content */}
      <div className="header-content">
        <h1 className="header-title">Flowers but better!</h1>
        <p className="header-subtitle">Valentine's collections are out now</p>
        
        <div className="header-buttons">
          <Link to="/shop" className="btn btn-red">SHOP NOW</Link>
          <Link to="/ourstory" className="btn btn-outline">ABOUT US</Link>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="header-image">
        <img src={roses} alt="Flower Bouquet" />
      </div>
    </header>
  );
}

export default Header;