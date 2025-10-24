import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../store/onboardingStore";

export default function ConnectRent() {
  const navigate = useNavigate();
  const { data, setSection } = useOnboarding();
  const [form, setForm] = useState(data.rent);

  const submit = (e) => {
    e.preventDefault();
    setSection("rent", form);
    navigate("/onboarding/connect-bank");
  };

  return (
    <form onSubmit={submit} style={box}>
      <h3>Connect Rent History</h3>
      <p style={{ color: "#9fb0c3" }}>
        You can connect a provider later—enter what you know for now.
      </p>

      <div style={grid3}>
        <L label="Provider (e.g., Zillow, RentPlus)">
          <input
            placeholder="Manual"
            value={form.provider}
            onChange={(e) => setForm({ ...form, provider: e.target.value })}
          />
        </L>

        <L label="Months of history">
          <input
            type="number"
            min="1"
            value={form.months}
            onChange={(e) => setForm({ ...form, months: +e.target.value })}
          />
        </L>

        <L label="On-time % (0–1)">
          <input
            type="number"
            min="0" max="1" step="0.01"
            value={form.onTimePct}
            onChange={(e) => setForm({ ...form, onTimePct: +e.target.value })}
          />
        </L>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => navigate(-1)} style={btnGhost}>Back</button>
        <button type="submit" style={btn}>Continue</button>
      </div>
    </form>
  );
}

function L({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
      <span style={{ color: "#9fb0c3" }}>{label}</span>
      {React.cloneElement(children, { style: input })}
    </label>
  );
}

const box   = { display: "grid", gap: 16, background: "#0f1720", padding: 20, borderRadius: 12, border: "1px solid #1e2630" };
const grid3 = { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 };
const input = { background: "#0b111a", color: "#e6edf6", border: "1px solid #1e2630", borderRadius: 8, padding: "10px 12px" };
const btn   = { background: "#3b82f6", color: "white", padding: "10px 16px", borderRadius: 10, border: 0 };
const btnGhost = { background: "#111827", color: "#e6edf6", padding: "10px 16px", borderRadius: 10, border: "1px solid #1e2630" };
