import { useState } from "react";


import "./LogIn.css";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("email"); // "email" | "code"

  const handleContinue = () => {
    if (email.trim()) {
      setStep("code");
    }
  };

  const handleSubmit = () => {
    // Handle code verification here
    console.log("Submitted code:", code);
  };

  const handleBack = () => {
    setStep("email");
    setCode("");
  };

  return (
    <div>
   

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

          {step === "email" ? (
            <>
              {/* Heading */}
              <div className="heading">
                <h1 className="heading__title">Sign in</h1>
                <p className="heading__subtitle">Sign in or create an account</p>
              </div>

              {/* Email input */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                className="input"
              />

              {/* Continue button */}
              <button className="btn btn--continue" onClick={handleContinue}>
                Continue
              </button>
            </>
          ) : (
            <>
              {/* Heading */}
              <div className="heading">
                <h1 className="heading__title">Enter code</h1>
                <p className="heading__subtitle">Sent to {email}</p>
              </div>

              {/* 6-digit code input */}
              <input
                type="text"
                placeholder="6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/, "").slice(0, 6))}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="input"
                maxLength={6}
                inputMode="numeric"
              />

              {/* Submit button */}
              <button className="btn btn--continue" onClick={handleSubmit}>
                Submit
              </button>

              {/* Back link */}
              <div style={{ marginTop: "16px" }}>
                <button onClick={handleBack} className="back-link-btn">
                  Sign in with a different email
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <a href="#" className="footer__link">Privacy policy</a>
          <a href="#" className="footer__link">Terms of service</a>
        </div>
      </div>
     
    </div>
  );
}