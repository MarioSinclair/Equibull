import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../styles/ChatBot.css";

// Read the key from Vite env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Helpful dev log if the key is missing
if (!apiKey) {
  // eslint-disable-next-line no-console
  console.error(
    "VITE_GEMINI_API_KEY is missing. Create .env.local with VITE_GEMINI_API_KEY=YOUR_KEY and restart the dev server."
  );
}

// Correct SDK usage
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are Equibull, a friendly and knowledgeable mortgage readiness assistant. Help users understand mortgage requirements, credit scores, down payments, debt-to-income ratios, and the home buying process. Be conversational, supportive, and provide actionable advice. Keep responses concise (2–4 sentences) unless more detail is requested."
});

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text:
        "Hi! I'm Equibull, your mortgage readiness assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser } = useAuth();

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = inputMessage.trim();
    if (!messageText) return;

    const userMessage = {
      id: crypto.randomUUID?.() ?? Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Simple, correct call pattern
      const result = await model.generateContent(messageText);
      const text = result.response?.text?.() ?? "Sorry, I couldn’t generate a reply.";
      const botMessage = {
        id: crypto.randomUUID?.() ?? Date.now() + 1,
        text,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID?.() ?? Date.now() + 2,
          text:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    "What credit score do I need?",
    "How much down payment?",
    "Calculate affordability",
    "Improve my credit"
  ];

  return (
    <div className="chatbot-page">
      {/* Header */}
      <header className="chatbot-header">
        <div className="header-content">
          <Link to="/" className="back-button">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <div className="header-title">
            <h1>Equibull Chat</h1>
            <span className="status-indicator">
              <span className="status-dot"></span>
              Online
            </span>
          </div>
          {currentUser && (
            <div className="user-info">
              <span>{currentUser.email}</span>
            </div>
          )}
        </div>
      </header>

      {/* Chat */}
      <div className="chat-container">
        <div className="messages-area">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`message ${m.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <div className="message-bubble">
                <p>{m.text}</p>
                <span className="message-time">
                  {m.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot-message">
              <div className="message-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="quick-actions">
            <p className="quick-actions-label">Quick questions:</p>
            <div className="quick-actions-buttons">
              {quickActions.map((qa) => (
                <button
                  key={qa}
                  className="quick-action-btn"
                  onClick={() => setInputMessage(qa)}
                >
                  {qa}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="input-area">
          <form onSubmit={handleSendMessage} className="input-form">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about mortgages, credit, down payments..."
              className="message-input"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputMessage.trim() || isTyping}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
          <p className="input-disclaimer">
            EquiBulls provides general guidance. For personalized advice, consult with our mortgage advisors.
          </p>
        </div>
      </div>
    </div>
  );
}
