import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../store/onboardingStore";
import "../../styles/connectRent.css"; // reuse same styles

export default function CreditConsent() {
  const navigate = useNavigate();
  const { data, setSection } = useOnboarding();
  const [consent, setConsent] = useState(Boolean(data?.credit?.consent));

  const submit = (e) => {
    e.preventDefault();
    setSection("credit", { ...(data?.credit || {}), consent });
    // change destination if you don't have /onboarding/review yet:
    navigate("/onboarding/review");
  };

  return (
    <div className="connect-rent-page">
      <div className="connect-rent-container">
        {/* Progress */}
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <div className="progress-label">Step 3 of 3</div>
        </div>

        {/* Card */}
        <div className="connect-rent-card">
          <header className="card-header">
            <div className="icon-wrapper">
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1l3 5 6 .9-4 4 1 6-6-3-6 3 1-6-4-4 6-.9z" />
              </svg>
            </div>
            <h1 className="card-title">Credit Consent</h1>
            <p className="card-description">
              To estimate mortgage readiness, we analyze credit factors like utilization and payment history.
              We’ll never perform a hard inquiry without your explicit permission.
            </p>
          </header>

          <form onSubmit={submit} className="connect-rent-form">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>I agree to securely share my credit data to calculate readiness.</span>
            </label>

            <div className="form-actions">
              <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
                Back
              </button>
              <button type="submit" className="btn-primary" disabled={!consent}>
                Continue
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
