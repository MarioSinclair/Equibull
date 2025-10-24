// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";


function Landing() {
  return (
    <div className="landingPage">
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <Link to="/" className="logo">
            EquiBull
          </Link>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#about">About</a></li>
            <li>
              <Link to="/login" className="btn-primary">Get Started</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Path to Homeownership Starts Here</h1>
          <p>
            EquiBull helps you understand your mortgage readiness and guides you through every step of the home buying
            journey with personalized insights and expert advice.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary btn-large">
              Start Your Journey
            </Link>
            <a href="#how-it-works" className="btn-secondary btn-large btn-white">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Homeowners Helped</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">$2B+</div>
            <div className="stat-label">Mortgages Secured</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">User Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-header">
          <h2>Everything You Need to Buy Your Home</h2>
          <p>Comprehensive tools and insights to make your home buying journey smooth and successful</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Mortgage Readiness Score</h3>
            <p>Get an instant assessment of your mortgage readiness based on your financial profile and credit history.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Personalized Timeline</h3>
            <p>Receive a customized roadmap with actionable steps to improve your mortgage eligibility.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3>Financial Insights</h3>
            <p>Track your progress with detailed analytics and recommendations to strengthen your application.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Budget Calculator</h3>
            <p>Calculate what you can afford with our comprehensive mortgage and budget planning tools.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Quick Pre-Approval</h3>
            <p>Connect with trusted lenders and get pre-approved faster with our streamlined process.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3>Expert Support</h3>
            <p>Access mortgage advisors and financial experts who can answer your questions anytime.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2>How EquiBull Works</h2>
          <p>Your journey to homeownership in three simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Create Your Profile</h3>
              <p>
                Tell us about your financial situation, goals, and timeline. Our secure platform keeps your information safe and confidential.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Get Your Readiness Score</h3>
              <p>
                Receive an instant mortgage readiness assessment with personalized recommendations to improve your eligibility.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Take Action & Track Progress</h3>
              <p>
                Follow your customized roadmap, track improvements, and connect with lenders when you're ready to buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of successful homeowners who trusted EquiBull to guide them home.</p>
          <Link to="/signup" className="btn-white btn-large">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>EquiBull</h4>
            <p>Your trusted partner in achieving homeownership dreams.</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EquiBull. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
