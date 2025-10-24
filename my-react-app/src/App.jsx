// src/App.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <header style={{ padding: 12, borderBottom: "1px solid #1e2630" }}>
        <Link to="/">Home</Link> · <Link to="/onboarding">Onboarding</Link>
      </header>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
