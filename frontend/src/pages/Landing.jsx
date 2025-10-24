// src/pages/Landing.jsx — Framer Motion + typing headline + cursor glow (no CSS-in-JS)
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/Landing.css";

/* ---------- Typing effect hook ---------- */
function useTypingEffect(text, speed = 35, startDelay = 200) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return out;
}

function Landing() {
  /* ---------- Scroll parallax for hero ---------- */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  /* ---------- Variants ---------- */
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
  };
  const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.5 } } };
  const stagger = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
  const card = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
    whileHover: { y: -4, transition: { duration: 0.15 } }
  };
  const popNumber = {
    initial: { opacity: 0, scale: 0.7, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  /* ---------- Typing headline ---------- */
  const typedTitle = useTypingEffect("Your Path to Homeownership Starts Here.");

  /* ---------- Cursor glow handlers (updates CSS vars) ---------- */
  function handleHeroMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
    e.currentTarget.style.setProperty("--glow-o", `1`);
  }
  function handleHeroLeave(e) {
    e.currentTarget.style.setProperty("--glow-o", `0`);
  }

  return (
    <div className="landingPage">
      {/* Header */}
      <header className="header">
        <motion.nav className="nav-container" variants={stagger} initial="initial" animate="animate">
          <motion.div variants={fadeUp}>
            <Link to="/" className="logo">EquiBull</Link>
          </motion.div>

          <ul className="nav-links">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "About", href: "#about" },
              { label: "Chat", to: "/chatbot", type: "link" }
            ].map((item, i) => (
              <motion.li key={i} variants={fadeUp} whileHover={{ y: -2 }}>
                {item.type === "link" ? <Link to={item.to}>{item.label}</Link> : <a href={item.href}>{item.label}</a>}
              </motion.li>
            ))}
            <motion.li variants={fadeUp}>
              <Link
                to="/SignIn"
                className="btn-primary"
                onMouseDown={(e)=>e.currentTarget.classList.add("btn-press")}
                onMouseUp={(e)=>e.currentTarget.classList.remove("btn-press")}
              >
                Get Started
              </Link>
            </motion.li>
          </ul>
        </motion.nav>
      </header>

      {/* Hero (with typing + cursor glow) */}
      <section
        className="hero"
        ref={heroRef}
        onMouseMove={handleHeroMove}
        onMouseLeave={handleHeroLeave}
      >
        <div className="hero-content">
          <motion.h1 variants={fadeUp} initial="initial" animate="animate" className="typing-text">
            {typedTitle}
            <motion.span
              className="typing-caret"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="initial" animate="animate">
            EquiBull helps you understand your mortgage readiness and guides you through every step of the home buying
            journey with personalized insights and expert advice.
          </motion.p>

          <motion.div className="hero-buttons" variants={stagger} initial="initial" animate="animate">
            <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/signup" className="btn-primary btn-large">Start Your Journey</Link>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ x: 4 }}>
              <a href="#how-it-works" className="btn-secondary btn-large btn-white">Learn More</a>
            </motion.div>
          </motion.div>
        </div>

        {/* Parallax hook (tie to bg/image if you add one) */}
        <motion.div className="hero-parallax-proxy" style={{ y: heroY, opacity: heroOpacity }} />
      </section>

      {/* Stats */}
      <section className="stats-section">
        <motion.div className="stats-container" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-120px" }}>
          {[
            { n: "50K+", l: "Homeowners Helped" },
            { n: "$2B+", l: "Mortgages Secured" },
            { n: "4.9/5", l: "User Rating" }
          ].map((s, i) => (
            <motion.div key={i} className="stat-card" variants={card} whileHover="whileHover">
              <div className="stat-number">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-header">
          <motion.h2 variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            Everything You Need to Buy Your Home
          </motion.h2>
          <motion.p variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            Comprehensive tools and insights to make your home buying journey smooth and successful
          </motion.p>
        </div>

        <motion.div className="features-grid" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }}>
          {[
            {
              title: "Mortgage Readiness Score",
              desc: "Get an instant assessment of your mortgage readiness based on your financial profile and credit history.",
              icon: (<svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
            },
            {
              title: "Personalized Timeline",
              desc: "Receive a customized roadmap with actionable steps to improve your mortgage eligibility.",
              icon: (<svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
            },
            {
              title: "Financial Insights",
              desc: "Track your progress with detailed analytics and recommendations to strengthen your application.",
              icon: (<svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>)
            },
            {
              title: "Budget Calculator",
              desc: "Calculate what you can afford with our comprehensive mortgage and budget planning tools.",
              icon: (<svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
            },
            {
              title: "Quick Pre-Approval",
              desc: "Connect with trusted lenders and get pre-approved faster with our streamlined process.",
              icon: (<svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>)
            },
            {
              title: "Expert Support",
              desc: "Access mortgage advisors and financial experts who can answer your questions anytime.",
              icon: (<svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
            }
          ].map((f, i) => (
            <motion.div key={i} className="feature-card" variants={card} whileHover="whileHover">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <motion.h2 variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            How EquiBull Works
          </motion.h2>
          <motion.p variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            Your journey to homeownership in three simple steps
          </motion.p>
        </div>
        <motion.div className="steps-container" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
          {[
            { n: 1, title: "Create Your Profile", desc: "Tell us about your financial situation, goals, and timeline. Our secure platform keeps your information safe and confidential." },
            { n: 2, title: "Get Your Readiness Score", desc: "Receive an instant mortgage readiness assessment with personalized recommendations to improve your eligibility." },
            { n: 3, title: "Take Action & Track Progress", desc: "Follow your customized roadmap, track improvements, and connect with lenders when you're ready to buy." }
          ].map((step, i) => (
            <motion.div key={i} className="step" variants={fadeIn}>
              <motion.div className="step-number" variants={popNumber}>{step.n}</motion.div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div className="cta-content" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of successful homeowners who trusted EquiBull to guide them home.</p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/signup" className="btn-white btn-large">Get Started Free</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <motion.div className="footer-content" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <motion.div className="footer-section" variants={fadeUp}>
            <h4>EquiBull</h4>
            <p>Your trusted partner in achieving homeownership dreams.</p>
          </motion.div>
          <motion.div className="footer-section" variants={fadeUp}>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </motion.div>
          <motion.div className="footer-section" variants={fadeUp}>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </motion.div>
          <motion.div className="footer-section" variants={fadeUp}>
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </motion.div>
        </motion.div>
        <motion.div className="footer-bottom" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <p>&copy; {new Date().getFullYear()} EquiBull. All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  );
}

export default Landing;
