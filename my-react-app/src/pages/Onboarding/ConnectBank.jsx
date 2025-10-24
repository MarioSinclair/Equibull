import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../store/onboardingStore";

export default function ConnectBank() {
  const navigate = useNavigate();
  const { data, setSection } = useOnboarding();
  const [form, setForm] = useState(data.bank);

  const submit = (e) => {
    e.preventDefault();
    setSection("bank", form);
    navigate("/onboarding/credit-consent");
  };

  return (
    <form onSubmit={submit} style={box}>
      <h3>Spending Snapshot</h3>
      <div style={grid3}>
        <L label="Connected via Plaid?">
          <select
            value={String(form.connected)}
            onChange={(e) => setForm({ ...form, connected: e.target.value === "true" })}
          >
            <option value="false">Not yet</option>
            <option value="true">Yes</option>
          </select>
        </L>

        <L label="Monthly savings ($)">
          <input
            type="number"
            value={form.monthlySavings}
            onChange={(e) => setForm({ ...form, monthlySavings: +e.target.value })}
          />
        </L>

        <L label="Monthly debt payments ($)">
          <input
            type="number"
            value={form.monthlyDebt}
            onChange={(e) => setForm({ ...form, monthlyDebt: +e.target.value })}
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
const grid3 = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 };
const input = { background: "#0b111a", color: "#e6edf6", border: "1px solid #1e2630", borderRadius: 8, padding: "10px 12px" };
const btn   = { background: "#3b82f6", color: "white", padding: "10px 16px", borderRadius: 10, border: 0 };
const btnGhost = { background: "#111827", color: "#e6edf6", padding: "10px 16px", borderRadius: 10, border: "1px solid #1e2630" };
