import { useState } from "react";
import axios from "axios";

const API = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "patient",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await axios.post(`${API}/api/register`, form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", role: "patient", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="form-page">
      <h2>Patient & Volunteer Registration</h2>
      <p>Fill out the form below to request support or join as a volunteer.</p>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div className="form-group">
          <label>I am registering as *</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="patient">Patient / Support Seeker</option>
            <option value="volunteer">Volunteer</option>
            <option value="donor">Donor</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message / Health Concern</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            placeholder="Briefly describe how we can help you, or your volunteering interest..."
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Submit Registration"}
        </button>

        {status === "success" && (
          <p className="success-msg">
            ✅ Registration submitted! We'll contact you within 24 hours.
          </p>
        )}
        {status === "error" && (
          <p className="error-msg">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
