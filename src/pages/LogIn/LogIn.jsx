import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { sendLoginLink, completeSignIn } from "../../auth";
import "./LogIn.css";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // "email" | "sent" | "completing"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // When the page loads, check if this is a redirect back from the email link
  useEffect(() => {
    completeSignIn()
      .then((result) => {
        if (result) {
          navigate("/"); // redirect to home after successful login
        }
      })
      .catch((err) => {
        setError("Sign-in link is invalid or expired. Please try again.");
        setStep("email");
      });
  }, []);

  const handleContinue = async () => {
    if (!email.trim()) return;
    setError("");
    try {
      await sendLoginLink(email);
      setStep("sent");
    } catch (err) {
      setError("Failed to send link. Please check the email and try again.");
    }
  };

  return (
    <div>
      
      <div className="login-page">
        <div className="login-card">

          {/* Logo */}
          <div className="logo">
            <div className="logo__text">
              <span>Flower</span>
              <span>Shop</span>
            </div>
          </div>

          {step === "email" && (
            <>
              <div className="heading">
                <h1 className="heading__title">Sign in</h1>
                <p className="heading__subtitle">Sign in or create an account</p>
              </div>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                className="input"
              />

              {error && <p style={{ color: "red", fontSize: 13, marginBottom: 10 }}>{error}</p>}

              <button className="btn btn--continue" onClick={handleContinue}>
                Continue
              </button>
            </>
          )}

          {step === "sent" && (
            <>
              <div className="heading">
                <h1 className="heading__title">Check your email</h1>
                <p className="heading__subtitle">
                  We sent a sign-in link to <strong>{email}</strong>. Click the link to log in.
                </p>
              </div>
              <button
                onClick={() => { setStep("email"); setEmail(""); }}
                className="back-link-btn"
              >
                Use a different email
              </button>
            </>
          )}

          {step === "completing" && (
            <div className="heading">
              <p className="heading__subtitle">Signing you in…</p>
            </div>
          )}

        </div>

        <div className="footer">
          <a href="#" className="footer__link">Privacy policy</a>
          <a href="#" className="footer__link">Terms of service</a>
        </div>
      </div>
      
    </div>
  );
}