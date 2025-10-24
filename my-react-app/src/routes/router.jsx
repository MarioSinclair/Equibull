// src/routes/router.jsx
import App from "../App.jsx";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Onboarding/Welcome.jsx";
import SignIn from "../pages/Auth/SignIn.jsx";
import SignUp from "../pages/Auth/SignUp.jsx";
import Landing from "../pages/Landing.jsx";

const router = createBrowserRouter([
  {path: "/", element: <Landing />},
  {path: "/signin", element: <SignIn />},
  {path: "/signup", element: <SignUp />},
  {path: "/onboarding", element: <Welcome />},
]);

export default router;
