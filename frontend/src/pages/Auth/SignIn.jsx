// src/pages/auth/SignIn.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/onboarding");
    } catch (err) {
      setError("Failed to sign in: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setError("");
      setLoading(true);
      await googleSignIn();
      navigate("/onboarding");
    } catch (err) {
      setError("Google sign-in failed: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  // Motion variants
  const container = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const card = {
    initial: { opacity: 0, y: 16, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
  };

  const formStagger = {
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };

  const field = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        className="auth-container"
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div className="auth-card" variants={card}>
          <motion.h1 className="auth-title" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            Welcome Back
          </motion.h1>
          <motion.p className="auth-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Log in to continue your journey toward homeownership.
          </motion.p>

          {/* Animated error block */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="auth-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.form className="auth-form" onSubmit={handleSubmit} variants={formStagger} initial="initial" animate="animate">
            <motion.label variants={field}>
              Email
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.35)" }}
              />
            </motion.label>

            <motion.label variants={field}>
              Password
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.35)" }}
              />
            </motion.label>

            <motion.button
              type="submit"
              disabled={loading}
              variants={field}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="auth-submit"
            >
              {loading ? (
                <motion.span
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <motion.span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: "2px solid currentColor",
                      borderRightColor: "transparent",
                      display: "inline-block"
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                  Signing in...
                </motion.span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div className="auth-divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span>or</span>
          </motion.div>

          {/* Google Sign-In Button */}
          <motion.button
            className="google-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
            type="button"
            whileHover={{ y: -1, scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
            />
            Continue with Google
          </motion.button>

          <motion.p className="auth-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Don’t have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </motion.p>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
