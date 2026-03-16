import "./BestSeller.css";
import { Link } from "react-router-dom";
import { bestSellerProducts } from "../../../data/products"; // adjust path as needed

function BestSeller() {
  return (
    <div className="best-seller-section">
      <div className="header">
        <h2 className="bs-title">Best Seller</h2>
        <button className="see-all-btn">SEE ALL COLLECTIONS</button>
      </div>

      <div className="product-list">

        {bestSellerProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card">
              <div className="image-box">
                <span className="sale-badge">Sale</span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <div className="price-row">
                <span className="current-price">{product.price}</span>
                <span className="old-price">{product.oldPrice}</span>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}

export default BestSeller;