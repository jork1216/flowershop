import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { allProducts } from "../../data/products";
import "./Shop.css";


function Shop() {
  return (
    <div>
      <Navbar />

      <div className="shop-wrapper">
        {/* Page Title */}
        <h1 className="shop-title">All flowers</h1>

        {/* Filter Bar */}
        <div className="shop-filter-bar">
          <div className="shop-filters">
            <button className="filter-btn">
              Availability
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button className="filter-btn">
              Price
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <span className="shop-item-count">{allProducts.length} items</span>
        </div>

        {/* Product Grid */}
        <div className="shop-product-grid">
          {allProducts.map((product) => (

            <Link to={`/product/${product.id}`} className="shop-product-card">
              <div className="shop-image-box">
                {product.soldOut ? (
                  <span className="badge badge-soldout">Sold out</span>
                ) : (
                  <span className="badge badge-sale">Sale</span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="shop-product-image"
                />
              </div>
              <span className="shop-product-name">{product.name}</span>
              <div className="shop-price-row">
                <span className="shop-current-price">{product.price}</span>
                <span className="shop-old-price">{product.oldPrice}</span>
              </div>
              
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;