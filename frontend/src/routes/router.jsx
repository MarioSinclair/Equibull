// src/routes/router.jsx
import App from "../App.jsx";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Onboarding/Welcome.jsx";
import SignIn from "../pages/Auth/SignIn.jsx";
import SignUp from "../pages/Auth/SignUp.jsx";
import Landing from "../pages/Landing.jsx";
import ConnectRent from "../pages/Onboarding/ConnectRent.jsx";
import ConnectBank from "../pages/Onboarding/ConnectBank.jsx";
import CreditConsent from "../pages/Onboarding/CreditConsent.jsx";

const router = createBrowserRouter([
  {path: "/", element: <Landing />},
  {path: "/signin", element: <SignIn />},
  {path: "/signup", element: <SignUp />},
  {path: "/onboarding", element: <Welcome />},
  {path: "onboarding/connect-rent", element: <ConnectRent />},
  {path: "/onboarding/connect-bank", element: <ConnectBank />},
  {path: "/onboarding/credit-consent", element: <CreditConsent />},

]);

export default router;
