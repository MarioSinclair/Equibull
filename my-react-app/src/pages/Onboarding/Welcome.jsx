import { Link } from "react-router-dom"
import "../../styles/Welcome.css"

export default function Welcome() {
  return (
    <div className="welcome-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Your Homeownership Journey</h1>
            <p className="hero-subtitle">
              We'll build your personalized roadmap to homeownership in just a few quick steps. Save your progress and
              come back anytime.
            </p>
            <Link to="/onboarding/connect-rent" className="cta-button primary">
              Get Started
              <svg className="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hello-MNgTItECP1btGD0x6IG5YgTqHPclfd.jpg"
              alt="Welcome to your new home"
            />
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="process-section">
        <h2>Your Path to Homeownership</h2>
        <p className="section-subtitle">Three simple steps to get your personalized roadmap</p>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-image">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blackguykey-zN1B5mzdr3EedXa5jQ3WxLLcz2wj8F.jpg"
                alt="Connect your rent history"
              />
            </div>
            <div className="step-content">
              <div className="step-number">01</div>
              <h3>Connect Rent History</h3>
              <p>
                Link your rent payment history or enter it manually. We'll use this to show lenders your reliability.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-image">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/box-pIEfKMXDUJ5dBBGyJ5bBR8qcB3X21V.jpg"
                alt="Share spending snapshot"
              />
            </div>
            <div className="step-content">
              <div className="step-number">02</div>
              <h3>Share Spending Snapshot</h3>
              <p>Give us a quick overview of your monthly spending to help us create your personalized plan.</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-image">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/family-jpS7fSYZwlJpH8Sz1jGnWvq2ZEUxJK.jpg"
                alt="Review credit factors"
              />
            </div>
            <div className="step-content">
              <div className="step-number">03</div>
              <h3>Review Credit Factors</h3>
              <p>Consent to view your credit factors so we can provide accurate recommendations for your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of renters who are on their path to homeownership</p>
          <Link to="/onboarding/connect-rent" className="cta-button secondary">
            Begin Your Roadmap
          </Link>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="trust-grid">
          <div className="trust-item">
            <div className="trust-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4>Secure & Private</h4>
            <p>Your data is encrypted and never shared without permission</p>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            <h4>Save Anytime</h4>
            <p>Complete at your own pace and return whenever you're ready</p>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M7 18L7 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h4>Personalized Plan</h4>
            <p>Get a custom roadmap tailored to your unique situation</p>
          </div>
        </div>
      </section>
    </div>
  )
}
