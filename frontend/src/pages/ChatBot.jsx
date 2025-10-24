import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleGenAI } from "@google/genai";
import '../styles/ChatBot.css';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: apiKey});



export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Equibull, your mortgage readiness assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser } = useAuth();

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Save the message before clearing input
    const messageText = inputMessage;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call backend API
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: messageText,
        config: {
          systemInstruction: "You are Equibull, a friendly and knowledgeable mortgage readiness assistant. Help users understand mortgage requirements, credit scores, down payments, debt-to-income ratios, and the home buying process. Be conversational, supportive, and provide actionable advice. Keep responses concise (2-4 sentences) unless more detail is requested.",
        },
      });
      
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: response.text,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback error message
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      }]);
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

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

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

      {/* Chat Container */}
      <div className="chat-container">
        <div className="messages-area">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
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
            EquiBot provides general guidance. For personalized advice, consult with our mortgage advisors.
          </p>
        </div>
      </div>
    </div>
  );
}

