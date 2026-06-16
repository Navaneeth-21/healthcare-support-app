import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Chatbot from "./components/Chatbot";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">🏥 HealthBridge</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Chatbot />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="hero">
      <h1>Healthcare Support for Everyone</h1>
      <p>
        HealthBridge connects patients with volunteers and medical resources
        across communities.
      </p>
      <div className="hero-buttons">
        <Link to="/register" className="btn-primary">
          Get Support
        </Link>
        <Link to="/register" className="btn-secondary">
          Volunteer
        </Link>
      </div>
      <div className="stats">
        <div>
          <strong>2,400+</strong>
          <span>Patients Helped</span>
        </div>
        <div>
          <strong>180+</strong>
          <span>Volunteers</span>
        </div>
        <div>
          <strong>12</strong>
          <span>Health Camps</span>
        </div>
      </div>
    </div>
  );
}
