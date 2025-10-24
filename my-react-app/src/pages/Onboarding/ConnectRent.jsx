"use client"

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useOnboarding } from "../../store/onboardingStore"
import "../../styles/connectRent.css"

export default function ConnectRent() {
  const navigate = useNavigate()
  const { data, setSection } = useOnboarding()
  const [form, setForm] = useState({
    provider: "",
    months: 12,
    onTimePct: 0.9,
    ...(data?.rent || {}),
  })
  const [touched, setTouched] = useState({})

  const errors = useMemo(() => {
    const e = {}
    if (!form.provider?.trim()) e.provider = "Provider is required (or enter 'Manual')."
    if (!Number.isFinite(form.months) || form.months < 1) e.months = "Enter months ≥ 1."
    if (!Number.isFinite(form.onTimePct) || form.onTimePct < 0 || form.onTimePct > 1) {
      e.onTimePct = "Enter a value between 0 and 1 (e.g. 0.95)."
    }
    return e
  }, [form])

  const isValid = Object.keys(errors).length === 0

  const submit = (e) => {
    e.preventDefault()
    if (!isValid) return
    setSection("rent", form)
    navigate("/onboarding/connect-bank")
  }

  const onBlur = (key) => setTouched((t) => ({ ...t, [key]: true }))

  return (
    <div className="connect-rent-page">
      <div className="connect-rent-container">
        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "33%" }}></div>
          </div>
          <div className="progress-label">Step 1 of 3</div>
        </div>

        {/* Main Card */}
        <div className="connect-rent-card">
          <header className="card-header">
            <div className="icon-wrapper">
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h1 className="card-title">Connect Your Rent History</h1>
            <p className="card-description">
              This helps us confirm positive payment behavior. You can connect a provider later—enter what you know for
              now.
            </p>
          </header>

          <form onSubmit={submit} className="connect-rent-form">
            <div className="form-grid">
              {/* Provider Field */}
              <div className="form-field full-width">
                <label className="field-label">
                  Rent Payment Provider
                  <span className="field-hint">e.g., Zillow, RentPlus, or Manual</span>
                </label>
                <input
                  type="text"
                  className={`field-input ${touched.provider && errors.provider ? "input-error" : ""}`}
                  placeholder="Enter provider name or 'Manual'"
                  value={form.provider}
                  onChange={(e) => setForm({ ...form, provider: e.target.value })}
                  onBlur={() => onBlur("provider")}
                  aria-invalid={touched.provider && errors.provider ? "true" : "false"}
                />
                {touched.provider && errors.provider && <span className="field-error">{errors.provider}</span>}
              </div>

              {/* Months Field */}
              <div className="form-field">
                <label className="field-label">
                  Months of History
                  <span className="field-hint">Typical: 12–24 months</span>
                </label>
                <input
                  type="number"
                  min="1"
                  className={`field-input ${touched.months && errors.months ? "input-error" : ""}`}
                  value={form.months}
                  onChange={(e) => setForm({ ...form, months: +e.target.value })}
                  onBlur={() => onBlur("months")}
                  aria-invalid={touched.months && errors.months ? "true" : "false"}
                />
                {touched.months && errors.months && <span className="field-error">{errors.months}</span>}
              </div>

              {/* On-Time Rate Field */}
              <div className="form-field">
                <label className="field-label">
                  On-Time Payment Rate
                  <span className="field-hint">0.97 = 97% on-time</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  className={`field-input ${touched.onTimePct && errors.onTimePct ? "input-error" : ""}`}
                  value={form.onTimePct}
                  onChange={(e) => setForm({ ...form, onTimePct: +e.target.value })}
                  onBlur={() => onBlur("onTimePct")}
                  aria-invalid={touched.onTimePct && errors.onTimePct ? "true" : "false"}
                />
                {touched.onTimePct && errors.onTimePct && <span className="field-error">{errors.onTimePct}</span>}
              </div>
            </div>

            {/* Info Tip */}
            <div className="info-tip">
              <svg className="tip-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <p className="tip-text">
                If you're unsure of your exact on-time rate, start with <strong>0.9</strong> and we'll refine it later.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
                Back
              </button>
              <button type="submit" className="btn-primary" disabled={!isValid}>
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
  )
}
