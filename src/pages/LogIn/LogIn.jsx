import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer"
import "./LogIn.css";

export default function LogIn() {
  const [email, setEmail] = useState("");

  return (
    <div>
        <Navbar />

        <div className="login-page">

        {/* Card */}
        <div className="login-card">
            {/* Logo */}
            <div className="logo">
            <div className="logo__text">
                <span>Flower</span>
                <span>Shop</span>
            </div>
            </div>

            {/* Heading */}
            <div className="heading">
            <h1 className="heading__title">Sign in</h1>
            <p className="heading__subtitle">Sign in or create an account</p>
            </div>

            {/* Divider */}
            <div className="divider">
            <div className="divider__line" />
            <span className="divider__text">or</span>
            <div className="divider__line" />
            </div>

            {/* Email input */}
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            />

            {/* Continue button */}
            <button className="btn btn--continue">
            Continue
            </button>
        </div>

        {/* Footer */}
        <div className="footer">
            <a href="#" className="footer__link">Privacy policy</a>
            <a href="#" className="footer__link">Terms of service</a>
        </div>
        </div>
        <Footer />
    </div>

  );
}