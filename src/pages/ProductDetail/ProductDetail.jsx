import { useState } from "react";            
import { useParams, Link } from 'react-router-dom';
import "./ProductDetail.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useCart } from "../../context/CartContext";

const ProductDetail = ({ allProducts }) => {
  const { id } = useParams();
  const product = allProducts.find((p) => String(p.id) === id);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();

  // Clamps quantity to minimum of 1
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);

    // Show "Added! ✓" feedback for 1.5 seconds
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // If the product ID in the URL doesn't match any product, show an error
  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <Link to="/">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="product-detail-page">
        <Link className="back-link" to="/">← Back to products</Link>

        <div className="product-detail-content">
          <div className="product-detail-image">
            {product.soldOut && <span className="badge badge-soldout">Sold out</span>}
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h1 className="product-name">{product.name}</h1>

            <div className="price-container">
              <span className="current-price">{product.price}</span>
              {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
            </div>

            <p className="product-description">
              {product.description || "Beautiful hand-picked flowers perfect for any occasion."}
            </p>

            <div className="product-actions">
              {/* Read-only quantity selector — users change value with +/- buttons only */}
              <div className="quantity-selector">
                <button
                  className="qty-btn qty-btn-minus"
                  onClick={decrementQuantity}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="qty-input"
                />
                <button
                  className="qty-btn qty-btn-plus"
                  onClick={incrementQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Button text changes based on soldOut and added states */}
              <button
                className={`add-to-cart-btn ${added ? "added" : ""}`}
                onClick={handleAddToCart}
                disabled={product.soldOut}
              >
                {product.soldOut ? "Out of Stock" : added ? "Added! ✓" : "Add to Cart"}
              </button>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;