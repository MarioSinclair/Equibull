// src/routes/router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Welcome from "../pages/Onboarding/Welcome.jsx";
import ConnectRent from "../pages/Onboarding/ConnectRent.jsx";
import ConnectBank from "../pages/Onboarding/ConnectBank.jsx";
import CreditConsent from "../pages/Onboarding/CreditConsent.jsx";

function Landing() {
  return (
    <div style={{ padding: 20 }}>
      Pathwise — <a href="/onboarding">Start onboarding</a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App must render <Outlet />
    children: [
      { index: true, element: <Landing /> },
      {
        path: "onboarding",
        children: [
          { index: true, element: <Welcome /> },
          { path: "connect-rent", element: <ConnectRent /> },
          { path: "connect-bank", element: <ConnectBank /> },
          { path: "credit-consent", element: <CreditConsent /> },
        ],
      },
    ],
  },
]);

export default router; // <-- IMPORTANT
