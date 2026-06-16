import { useState } from "react";
import axios from "axios";

const API = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await axios.post(`${API}/api/contact`, form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="form-page">
      <h2>Contact Us</h2>
      <p>Have a question or need help? Reach out to the HealthBridge team.</p>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="What is this regarding?"
          />
        </div>
        <div className="form-group">
          <label>Message *</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            required
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="success-msg">
            ✅ Message sent! We'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="error-msg">❌ Failed to send. Please try again.</p>
        )}
      </form>
    </div>
  );
}
