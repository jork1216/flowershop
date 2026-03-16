// ============================================================
// src/pages/ProductDetail/ProductDetail.jsx
// ------------------------------------------------------------
// CHANGES FROM ORIGINAL:
//  1. Added useState to track the quantity the user picks
//  2. Imported useCart so we can call addItem()
//  3. Wired the "Add to Cart" button to actually add the item
//  4. Added a brief "Added!" feedback so the user knows it worked
// ============================================================

import { useState } from "react";            
import { useParams, Link } from 'react-router-dom';
import "./ProductDetail.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useCart } from "../../context/CartContext";

const ProductDetail = ({ allProducts }) => {
  const { id } = useParams();
  const product = allProducts.find((p) => String(p.id) === id);

  // -----------------------------------------------------------
  // NEW STATE
  // quantity: how many the user wants to add (starts at 1)
  // added:    briefly true after clicking "Add to Cart" to show
  //           a "Added!" confirmation message
  // -----------------------------------------------------------
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Get the addItem function from our CartContext
  const { addItem } = useCart();

  // -----------------------------------------------------------
  // Quantity handlers with min/max clamping
  // -----------------------------------------------------------
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // -----------------------------------------------------------
  // handleAddToCart — runs when the button is clicked
  // -----------------------------------------------------------
  const handleAddToCart = () => {
    // Pass the product object and the selected quantity
    addItem(product, quantity);

    // Show the "Added!" feedback for 1.5 seconds, then reset
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
          {/* ---- Left side: Product image ---- */}
          <div className="product-detail-image">
            {product.soldOut && <span className="badge badge-soldout">Sold out</span>}
            <img src={product.image} alt={product.name} />
          </div>

          {/* ---- Right side: Product info ---- */}
          <div className="product-detail-info">
            <h1 className="product-name">{product.name}</h1>

            <div className="price-container">
              <span className="current-price">{product.price}</span>
              {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
            </div>

            <p className="product-description">
              {product.description || "Beautiful hand-picked flowers perfect for any occasion."}
            </p>

            {/* ---- Quantity input + Add to Cart button ---- */}
            <div className="product-actions">

              {/* Quantity selector with +/- buttons */}
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

              {/*
                CHANGED: onClick now calls handleAddToCart()
                The button text also changes briefly to "Added! ✓"
                to give the user a satisfying confirmation.
              */}
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