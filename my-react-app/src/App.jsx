// src/App.jsx
import React from "react";
<<<<<<< Updated upstream

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Equibull</h1>
=======
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#1e293b",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Main content area */}
      <main style={{ width: "100%", margin: 0, padding: 0 }}>
        <Outlet />
      </main>
>>>>>>> Stashed changes
    </div>
  );
}
