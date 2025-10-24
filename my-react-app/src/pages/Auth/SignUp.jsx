<<<<<<< Updated upstream
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/onboarding'); // Redirect after successful signup
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

=======
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Auth.css";

export default function SignUp() {
>>>>>>> Stashed changes
  return (
    <section className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">
          Join EquiBull and get your personalized mortgage readiness plan.
        </p>

<<<<<<< Updated upstream
        <form className="auth-form" onSubmit={handleSubmit}>

          <label>
            Email
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
=======
        <form className="auth-form">
          <label>
            Full Name
            <input type="text" placeholder="John Doe" required />
          </label>

          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
>>>>>>> Stashed changes
          </label>

          <label>
            Password
<<<<<<< Updated upstream
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </label>

          <label>
            Confirm Password
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          </label>

          <button
            disabled={loading}
            type="submit"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
=======
            <input type="password" placeholder="Create a password" required />
          </label>

          <button type="submit" className="btn-primary full-width">
            Sign Up
>>>>>>> Stashed changes
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
