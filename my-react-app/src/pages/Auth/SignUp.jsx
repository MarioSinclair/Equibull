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

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h2>Sign Up</h2>
      {error && (
        <div style={{ 
          padding: 10, 
          background: '#fee', 
          color: '#c00', 
          borderRadius: 5, 
          marginBottom: 15 
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 5,
              border: '1px solid #ccc'
            }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 5,
              border: '1px solid #ccc'
            }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 5,
              border: '1px solid #ccc'
            }}
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          style={{
            width: '100%',
            padding: 10,
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      <div style={{ marginTop: 15, textAlign: 'center' }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

