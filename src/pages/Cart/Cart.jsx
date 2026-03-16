// ============================================================
// src/pages/Cart/Cart.jsx
// ------------------------------------------------------------
// The Cart page — shows everything the user has added.
// Lets them change quantities, remove items, and see the total.
//
// This page is "dumb" about prices — it reads everything from
// CartContext, which is the single source of truth.
// ============================================================

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

export default function Cart() {
  // Pull everything we need from the cart context
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  // -----------------------------------------------------------
  // EMPTY CART STATE
  // If there are no items, show a friendly message instead of
  // an empty-looking table.
  // -----------------------------------------------------------
  if (items.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any flowers yet.</p>
          <Link to="/shop" className="cart-shop-btn">Browse flowers</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="cart-page">
        <h1 className="cart-title">Your Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})</h1>

        <div className="cart-layout">

          {/* ---- LEFT: List of cart items ---- */}
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">

                {/* Product thumbnail */}
                <img src={item.image} alt={item.name} className="cart-item-image" />

                {/* Product name and price */}
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{item.price}</p>
                </div>

                {/* Quantity controls: minus, number, plus */}
                <div className="cart-item-qty">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    // If quantity is 1, clicking minus will trigger
                    // REMOVE_ITEM in the reducer (quantity becomes 0)
                  >
                    −
                  </button>

                  <span className="qty-number">{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Line total: price × quantity */}
                <div className="cart-item-subtotal">
                  {/* Format the subtotal back to "P" currency style */}
                  P{(
                    parseFloat(item.price.replace("P", "").replace(",", "")) *
                    item.quantity
                  ).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </div>

                {/* Remove button — removes this item completely */}
                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>

              </div>
            ))}
          </div>

          {/* ---- RIGHT: Order summary ---- */}
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>
                P{totalPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="shipping-note">Calculated at checkout</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>
                P{totalPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/*
              For now this button just goes to a placeholder.
              Day 2 will build the actual checkout flow.
            */}
            <button className="checkout-btn">
              Proceed to Checkout
            </button>

            <Link to="/shop" className="continue-shopping">
              ← Continue shopping
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}