import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../store/onboardingStore";
import "../../styles/connectRent.css"; // reuse same styles

export default function ConnectBank() {
  const navigate = useNavigate();
  const { data, setSection } = useOnboarding();
  const [form, setForm] = useState({
    connected: false,
    monthlySavings: 0,
    monthlyDebt: 0,
    ...(data?.bank || {}),
  });

  const submit = (e) => {
    e.preventDefault();
    setSection("bank", form);
    navigate("/onboarding/credit-consent");
  };

  return (
    <div className="connect-rent-page">
      <div className="connect-rent-container">
        {/* Progress */}
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "66%" }}></div>
          </div>
          <div className="progress-label">Step 2 of 3</div>
        </div>

        {/* Card */}
        <div className="connect-rent-card">
          <header className="card-header">
            <div className="icon-wrapper">
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </div>
            <h1 className="card-title">Spending Snapshot</h1>
            <p className="card-description">
              Connect your accounts or enter estimates so we can understand your monthly savings and debt payments.
            </p>
          </header>

          <form onSubmit={submit} className="connect-rent-form">
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">
                  Connected via Plaid?
                  <span className="field-hint">You can connect later</span>
                </label>
                <select
                  className="field-input"
                  value={String(form.connected)}
                  onChange={(e) => setForm({ ...form, connected: e.target.value === "true" })}
                >
                  <option value="false">Not yet</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="form-field">
                <label className="field-label">
                  Monthly savings ($)
                  <span className="field-hint">Average last 3 months</span>
                </label>
                <input
                  type="number"
                  min="0"
                  className="field-input"
                  value={form.monthlySavings}
                  onChange={(e) => setForm({ ...form, monthlySavings: +e.target.value })}
                />
              </div>

              <div className="form-field">
                <label className="field-label">
                  Monthly debt payments ($)
                  <span className="field-hint">Loans, cards, etc.</span>
                </label>
                <input
                  type="number"
                  min="0"
                  className="field-input"
                  value={form.monthlyDebt}
                  onChange={(e) => setForm({ ...form, monthlyDebt: +e.target.value })}
                />
              </div>
            </div>

            <div className="info-tip">
              <svg className="tip-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <p className="tip-text">Exact numbers are best, but estimates are fine—you can refine later.</p>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
                Back
              </button>
              <button type="submit" className="btn-primary">
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
