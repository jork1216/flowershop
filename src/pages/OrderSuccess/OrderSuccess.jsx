// ============================================================
// src/pages/OrderSuccess/OrderSuccess.jsx
// ------------------------------------------------------------
// Thank you page. Reads orderId from the URL query param,
// fetches the order from Firestore, and displays it.
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // -----------------------------------------------------------
  // Fetch the order from Firestore using the orderId in the URL
  // -----------------------------------------------------------
  useEffect(() => {
    // If there's no orderId in the URL at all, send them to the shop
    if (!orderId) {
      navigate("/shop");
      return;
    }

    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  // -----------------------------------------------------------
  // LOADING STATE
  // -----------------------------------------------------------
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="order-success-loading">
          <p>Loading your order...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // -----------------------------------------------------------
  // ERROR STATE — order not found
  // -----------------------------------------------------------
  if (error || !order) {
    return (
      <div>
        <Navbar />
        <div className="order-success-error">
          <h2>Order not found</h2>
          <p>We couldn't find this order. It may have been removed.</p>
          <Link to="/shop" className="back-to-shop-btn">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // -----------------------------------------------------------
  // SUCCESS STATE
  // -----------------------------------------------------------
  return (
    <div>
      <Navbar />

      <div className="order-success-page">

        {/* ---- HEADER ---- */}
        <div className="success-header">
          <div className="success-icon">🌸</div>
          <h1 className="success-title">Order Placed!</h1>
          <p className="success-subtitle">
            Thank you, {order.name}! Your flowers are on their way.
          </p>
          <p className="order-id-label">
            Order ID: <span className="order-id">{order.id}</span>
          </p>
        </div>

        <div className="success-layout">

          {/* ---- LEFT: ITEMS ORDERED ---- */}
          <div className="success-items-box">
            <h2 className="success-box-title">Items Ordered</h2>

            <div className="success-items">
              {order.items.map((item) => (
                <div key={item.id} className="success-item">
                  <div className="success-item-info">
                    <p className="success-item-name">{item.name}</p>
                    <p className="success-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="success-item-subtotal">
                    P{item.subtotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>

            <div className="success-divider" />

            <div className="success-total-row">
              <span>Total</span>
              <span>P{order.total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="success-payment-row">
              <span>Payment</span>
              <span className="cod-tag">💵 Cash on Delivery</span>
            </div>
          </div>

          {/* ---- RIGHT: DELIVERY DETAILS ---- */}
          <div className="success-details-box">
            <h2 className="success-box-title">Delivery Details</h2>

            <div className="detail-row">
              <span className="detail-label">Name</span>
              <span className="detail-value">{order.name}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Email</span>
              <span className="detail-value">{order.email}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{order.phone}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Address</span>
              <span className="detail-value">
                {order.address.street}, {order.address.barangay},{" "}
                {order.address.city}, {order.address.zip}
              </span>
            </div>

            {order.deliveryDate && (
              <div className="detail-row">
                <span className="detail-label">Delivery Date</span>
                <span className="detail-value">{order.deliveryDate}</span>
              </div>
            )}

            {order.note && (
              <div className="detail-row">
                <span className="detail-label">Note</span>
                <span className="detail-value">{order.note}</span>
              </div>
            )}
          </div>

        </div>

        {/* ---- BACK TO SHOP ---- */}
        <div className="success-actions">
          <Link to="/shop" className="back-to-shop-btn">
            ← Back to Shop
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}