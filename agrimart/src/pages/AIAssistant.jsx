import React, { useState, useRef, useEffect } from "react";
import { askAssistant } from "../api/supportApi";
import styles from "./AIAssistant.module.css";
import { FaRobot, FaUserCircle, FaPaperPlane } from "react-icons/fa";

const initialMessage = {
  role: "assistant",
  text: "Hi, I'm AgriBot! Ask me anything about orders, payments, delivery, or our products.",
};

const AIAssistant = () => {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const question = input.trim();
    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");
    setInfo("");

    try {
      const data = await askAssistant(question);
      const assistantMessage = {
        role: "assistant",
        text: data.reply,
        suggestions: data.suggestions || [],
      };
      setMessages((prev) => [...prev, assistantMessage]);
      if (data.source === "faq") {
        setInfo("Answer powered by our FAQ knowledge base.");
      } else {
        setInfo("No direct FAQ found. Consider raising a ticket for more help.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "Sorry, I couldn't reach our knowledge base right now. Please try again or raise a support ticket.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.chatContainer}>
        <header className={styles.header}>
          <div>
            <h1>AI Assistant</h1>
            <p>Chat with AgriBot for quick help before contacting support.</p>
          </div>
          <span className={styles.badge}>{loading ? "Thinking..." : "Online"}</span>
        </header>

        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={`${msg.role}-${index}-${msg.text.slice(0, 5)}`}
              className={`${styles.message} ${
                msg.role === "user" ? styles.userMessage : styles.botMessage
              }`}
            >
              <div className={styles.avatar}>
                {msg.role === "user" ? <FaUserCircle /> : <FaRobot />}
              </div>
              <div className={styles.bubble}>
                <p>{msg.text}</p>
                {msg.suggestions?.length > 0 && (
                  <div className={styles.suggestions}>
                    {msg.suggestions.map((s) => (
                      <button key={s.id} onClick={() => handleSuggestion(s.question)}>
                        {s.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className={`${styles.message} ${styles.botMessage}`}>
              <div className={styles.avatar}>
                <FaRobot />
              </div>
              <div className={styles.bubble}>
                <p>Let me think...</p>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className={styles.inputRow} onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Ask about refunds, shipping, payments..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            <FaPaperPlane />
          </button>
        </form>

        {(error || info) && (
          <div className={styles.status}>
            {error && <p className={styles.error}>{error}</p>}
            {info && <p className={styles.info}>{info}</p>}
          </div>
        )}
      </section>
    </div>
  );
};

export default AIAssistant;

