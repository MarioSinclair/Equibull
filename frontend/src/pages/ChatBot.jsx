"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { GoogleGenerativeAI } from "@google/generative-ai"
import "../styles/ChatBot.css"


// Read the key from Vite env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY

// Helpful dev log if the key is missing
if (!apiKey) {
  // eslint-disable-next-line no-console
  console.error(
    "VITE_GEMINI_API_KEY is missing. Create .env.local with VITE_GEMINI_API_KEY=YOUR_KEY and restart the dev server.",
  )
}

// Correct SDK usage
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are Equibull, a friendly and knowledgeable mortgage readiness assistant. Help users understand mortgage requirements, credit scores, down payments, debt-to-income ratios, and the home buying process. Be conversational, supportive, and provide actionable advice. Keep responses concise (2–4 sentences) unless more detail is requested.",
})

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Equibull, your mortgage readiness assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const { currentUser } = useAuth()

  const [conversations, setConversations] = useState([
    { id: 1, title: "What credit score do I need?", date: "Today", time: "2:30 PM" },
    { id: 2, title: "How much down payment?", date: "Today", time: "11:45 AM" },
    { id: 3, title: "Calculate affordability", date: "Yesterday", time: "4:20 PM" },
    { id: 4, title: "Improve my credit score", date: "Yesterday", time: "9:15 AM" },
    { id: 5, title: "First-time buyer tips", date: "Previous 7 Days", time: "Mon" },
    { id: 6, title: "Debt-to-income ratio", date: "Previous 7 Days", time: "Sun" },
  ])
  const [activeConversation, setActiveConversation] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const groupedConversations = conversations.reduce((acc, conv) => {
    if (!acc[conv.date]) {
      acc[conv.date] = []
    }
    acc[conv.date].push(conv)
    return acc
  }, {})

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const messageText = inputMessage.trim()
    if (!messageText) return

    const userMessage = {
      id: crypto.randomUUID?.() ?? Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      // Simple, correct call pattern
      const result = await model.generateContent(messageText)
      const text = result.response?.text?.() ?? "Sorry, I couldn’t generate a reply."
      const botMessage = {
        id: crypto.randomUUID?.() ?? Date.now() + 1,
        text,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID?.() ?? Date.now() + 2,
          text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const quickActions = [
    "What credit score do I need?",
    "How much down payment?",
    "Calculate affordability",
    "Improve my credit",
  ]

  return (
    <div className="chatbot-page">
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <button className="new-chat-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Chat
          </button>
        </div>

        <div className="conversations-list">
          {Object.entries(groupedConversations).map(([date, convs]) => (
            <div key={date} className="conversation-group">
              <div className="group-label">{date}</div>
              {convs.map((conv) => (
                <button
                  key={conv.id}
                  className={`conversation-item ${activeConversation === conv.id ? "active" : ""}`}
                  onClick={() => setActiveConversation(conv.id)}
                >
                  <span className="conversation-title">{conv.title}</span>
                  <span className="conversation-time">{conv.time}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-action-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.076.076 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.077.077 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Join Discord
          </button>
          <button className="sidebar-action-btn secondary">Sign out</button>
          <div className="sidebar-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="chatbot-header">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <div className="header-title">
            <h1>Mortgage Readiness Assistant</h1>
          </div>
          <button className="feedback-btn">Submit Feedback →</button>
        </header>

        {/* Chat */}
        <div className="chat-container">
          <div className="messages-area">
            {messages.map((m) => (
              <div key={m.id} className={`message ${m.sender === "user" ? "user-message" : "bot-message"}`}>
                <div className="message-bubble">
                  <p>{m.text}</p>
                  <span className="message-time">
                    {m.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot-message">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
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
                  <button key={qa} className="quick-action-btn" onClick={() => setInputMessage(qa)}>
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
              <button type="submit" className="send-button" disabled={!inputMessage.trim() || isTyping}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
            <p className="input-disclaimer">
              EquiBull provides general guidance. For personalized advice, consult with our mortgage advisors.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
