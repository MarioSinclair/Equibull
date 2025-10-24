import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Auth.css"; // we'll style both login/signup here

export default function Login() {
  return (
    <section className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">
          Log in to continue your journey toward homeownership.
        </p>

        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
          </label>

          <label>
            Password
            <input type="password" placeholder="••••••••" required />
          </label>

          <button type="submit" className="btn-primary full-width">
            Log In
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
