// src/routes/router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Onboarding/Welcome.jsx";
import ConnectRent from "../pages/Onboarding/ConnectRent.jsx";
import ConnectBank from "../pages/Onboarding/ConnectBank.jsx";
import CreditConsent from "../pages/Onboarding/CreditConsent.jsx";
import SignIn from "../pages/Auth/SignIn.jsx";
import SignUp from "../pages/Auth/SignUp.jsx";

function Landing() {
  return (
    <div style={{ padding: 20 }}>
      <h1>EquiCoach</h1>
      <p>AI Credit Readiness Assistant</p>
      <div style={{ marginTop: 20 }}>
        <a href="/signin" style={{ marginRight: 15 }}>Sign In</a>
        <a href="/signup" style={{ marginRight: 15 }}>Sign Up</a>
        <a href="/onboarding">Start Onboarding</a>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/onboarding", element: <Welcome /> },
  { path: "/onboarding/connect-rent", element: <ConnectRent /> },
  { path: "/onboarding/connect-bank", element: <ConnectBank /> },
  { path: "/onboarding/credit-consent", element: <CreditConsent /> },
]);

export default router;
