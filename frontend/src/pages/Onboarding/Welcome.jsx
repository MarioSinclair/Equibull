import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <section style={{ display: "grid", gap: 14 }}>
      <h2>Welcome to Pathwise</h2>
      <p style={{ color: "#9fb0c3" }}>
        We’ll build your personalized roadmap in a few quick steps. You can save and come back anytime.
      </p>

      <ul style={{ color: "#9fb0c3", marginLeft: 18 }}>
        <li>Connect rent history (or enter it manually)</li>
        <li>Share a basic spending snapshot</li>
        <li>Give consent to view credit factors</li>
      </ul>

      <div>
        <Link to="/onboarding/connect-rent" style={btn}>Get started</Link>
      </div>
    </section>
  );
}

const btn = {
  display: "inline-block",
  background: "#3b82f6",
  color: "white",
  padding: "10px 16px",
  borderRadius: 10,
  fontWeight: 600,
  textDecoration: "none",
};
