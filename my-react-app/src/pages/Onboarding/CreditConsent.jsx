import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../store/onboardingStore";

export default function CreditConsent() {
  const navigate = useNavigate();
  const { data, setSection } = useOnboarding();
  const [consent, setConsent] = useState(Boolean(data?.credit?.consent));

  const submit = (e) => {
    e.preventDefault();
    setSection("credit", { ...data.credit, consent });
    // If you have a Review page, go there. Otherwise send home or dashboard.
    navigate("/onboarding/review"); // change to "/" if you haven't created Review yet
  };

  return (
    <form onSubmit={submit} style={box}>
      <h3>Credit Consent</h3>
      <p style={{ color: "#9fb0c3" }}>
        To estimate mortgage readiness, Pathwise analyzes credit factors such as utilization and payment history. 
        We’ll never perform a hard inquiry without your explicit permission.
      </p>

      <label style={{ display: "flex", gap: 10, alignItems: "center", margin: "12px 0" }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>I agree to securely share my credit data to calculate readiness.</span>
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => navigate(-1)} style={btnGhost}>Back</button>
        <button type="submit" style={btn} disabled={!consent}>Continue</button>
      </div>
    </form>
  );
}

const box   = { display: "grid", gap: 16, background: "#0f1720", padding: 20, borderRadius: 12, border: "1px solid #1e2630" };
const btn   = { background: "#22c55e", color: "#06240f", padding: "10px 16px", borderRadius: 10, border: 0, fontWeight: 700 };
const btnGhost = { background: "#111827", color: "#e6edf6", padding: "10px 16px", borderRadius: 10, border: "1px solid #1e2630" };
