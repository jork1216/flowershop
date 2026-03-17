// ============================================================
// src/pages/Checkout/Checkout.jsx
// ------------------------------------------------------------
// The checkout page. Requires login.
// Left side: form. Right side: order summary (read-only).
// On submit: saves order to Firestore, clears cart, redirects.
// ============================================================

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Checkout.css";

export default function Checkout() {
  const user = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const isCheckingOutRef = useRef(false);

  // -----------------------------------------------------------
  // REDIRECT GUARDS
  // Run as soon as the component mounts.
  // If not logged in → go to /login
  // If cart is empty → go to /cart
  // -----------------------------------------------------------
    useEffect(() => {
    // Skip if order checkout is in progress
    if (isCheckingOutRef.current) return;
    
    // Skip redirects while auth is still loading
    if (user === undefined) return;
    
    // Auth guard takes priority
    if (user === null) {
        navigate("/login");
    }
    // Cart guard only runs if user is logged in
    else if (items.length === 0) {
        navigate("/cart");
    }
    }, [user, items, navigate]);

  // -----------------------------------------------------------
  // FORM STATE
  // Pre-fill email from the logged-in user
  // -----------------------------------------------------------
  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    street: "",
    barangay: "",
    city: "",
    zip: "",
    deliveryDate: "",
    note: "",
  });

  // Update email field once user loads (in case it was undefined on first render)
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // -----------------------------------------------------------
  // ERRORS STATE
  // One error message per field that can fail validation
  // -----------------------------------------------------------
  const [errors, setErrors] = useState({});

  // -----------------------------------------------------------
  // SUBMITTING STATE
  // Disables the button while the Firestore save is in progress
  // -----------------------------------------------------------
  const [submitting, setSubmitting] = useState(false);

  // -----------------------------------------------------------
  // HANDLE INPUT CHANGE
  // Single handler for all fields
  // -----------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as the user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // -----------------------------------------------------------
  // VALIDATION
  // Returns an errors object. If it's empty, the form is valid.
  // -----------------------------------------------------------
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    }

    // Philippine mobile number: +639XXXXXXXXX (must be exactly 13 chars)
    const phoneRegex = /^\+639\d{9}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid PH number (e.g. +639171234567).";
    }

    if (!form.street.trim()) {
      newErrors.street = "Street address is required.";
    }

    if (!form.barangay.trim()) {
      newErrors.barangay = "Barangay is required.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!form.zip.trim()) {
      newErrors.zip = "ZIP code is required.";
    }

    return newErrors;
  };

  // -----------------------------------------------------------
  // HANDLE SUBMIT
  // Validate → build order object → save to Firestore →
  // clear cart → redirect to /order-success?orderId=xxx
  // -----------------------------------------------------------
  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to top so user sees the errors
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      // Build the order object
      const order = {
        uid: user.uid,
        email: form.email.trim(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: {
          street: form.street.trim(),
          barangay: form.barangay.trim(),
          city: form.city.trim(),
          zip: form.zip.trim(),
        },
        deliveryDate: form.deliveryDate || null,
        note: form.note.trim() || null,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal:
            parseFloat(item.price.replace("P", "").replace(",", "")) *
            item.quantity,
        })),
        total: totalPrice,
        paymentMethod: "COD",
        status: "pending",
        createdAt: serverTimestamp(),
      };

      // Save to Firestore — addDoc gives us back the document reference
      const docRef = await addDoc(collection(db, "orders"), order);

      // Set flag to prevent redirect guard from interfering (synchronous update)
      isCheckingOutRef.current = true;

      // Redirect to the thank you page, passing the order ID in the URL
      navigate(`/order-success?orderId=${docRef.id}`);

      // Clear the cart
      clearCart();

    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  // -----------------------------------------------------------
  // RENDER
  // Show a loading state while auth is still resolving
  // -----------------------------------------------------------
  if (user === undefined) {
    return null; // Auth still loading — render nothing briefly
  }

  return (
    <div>
      <Navbar />

      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">

          {/* ====== LEFT: FORM ====== */}
          <div className="checkout-form">

            {/* Contact Info */}
            <section className="form-section">
              <h2 className="form-section-title">Contact Information</h2>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Juan dela Cruz"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && <p className="error-msg">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="juan@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <p className="error-msg">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+639171234567"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "input-error" : ""}
                />
                {errors.phone && <p className="error-msg">{errors.phone}</p>}
              </div>
            </section>

            {/* Delivery Address */}
            <section className="form-section">
              <h2 className="form-section-title">Delivery Address</h2>

              <div className="form-group">
                <label htmlFor="street">Street Address</label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="123 Rizal St."
                  value={form.street}
                  onChange={handleChange}
                  className={errors.street ? "input-error" : ""}
                />
                {errors.street && <p className="error-msg">{errors.street}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="barangay">Barangay</label>
                <input
                  id="barangay"
                  name="barangay"
                  type="text"
                  placeholder="Brgy. San Isidro"
                  value={form.barangay}
                  onChange={handleChange}
                  className={errors.barangay ? "input-error" : ""}
                />
                {errors.barangay && <p className="error-msg">{errors.barangay}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Lipa City"
                    value={form.city}
                    onChange={handleChange}
                    className={errors.city ? "input-error" : ""}
                  />
                  {errors.city && <p className="error-msg">{errors.city}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="zip">ZIP Code</label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    placeholder="4217"
                    value={form.zip}
                    onChange={handleChange}
                    className={errors.zip ? "input-error" : ""}
                  />
                  {errors.zip && <p className="error-msg">{errors.zip}</p>}
                </div>
              </div>
            </section>

            {/* Optional Details */}
            <section className="form-section">
              <h2 className="form-section-title">Optional Details</h2>

              <div className="form-group">
                <label htmlFor="deliveryDate">Preferred Delivery Date</label>
                <input
                  id="deliveryDate"
                  name="deliveryDate"
                  type="date"
                  value={form.deliveryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="note">Note for the Florist</label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  placeholder="Any special requests or message for the arrangement..."
                  value={form.note}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Payment Method — hardcoded COD for now */}
            <section className="form-section">
              <h2 className="form-section-title">Payment Method</h2>
              <div className="cod-badge">💵 Cash on Delivery (COD)</div>
            </section>

            {/* Submit Button */}
            <button
              className="place-order-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>

          </div>

          {/* ====== RIGHT: ORDER SUMMARY ====== */}
          <div className="checkout-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-items">
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} className="summary-item-image" />
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="summary-item-subtotal">
                    P{(
                      parseFloat(item.price.replace("P", "").replace(",", "")) *
                      item.quantity
                    ).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>P{totalPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="shipping-note">To be confirmed</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>P{totalPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</span>
            </div>

            <p className="cod-note">You will pay upon delivery.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}