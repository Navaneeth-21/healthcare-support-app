import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm HealthBot. Ask me about our services, volunteering, or health camps!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/chat`, { message: userMsg });
      setMessages((prev) => [...prev, { from: "bot", text: res.data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen(!open)}
        title="Chat with HealthBot"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chat-header">
            <span>🏥 HealthBot</span>
            <small>AI-powered FAQ assistant</small>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.from}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-bubble bot">Typing...</div>}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question..."
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
