const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// --- Registration Route ---
app.post("/api/register", (req, res) => {
  const { name, email, phone, role, message } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      error: "Name, email, and role are required.",
    });
  }

  const stmt = db.prepare(
    "INSERT INTO registrations (name, email, phone, role, message) VALUES (?, ?, ?, ?, ?)",
  );

  const result = stmt.run(name, email, phone || "", role, message || "");

  res.json({
    success: true,
    id: result.lastInsertRowid,
  });
});

// --- Contact Form Route ---
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required.",
    });
  }

  const stmt = db.prepare(
    "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
  );

  const result = stmt.run(name, email, subject || "", message);

  res.json({
    success: true,
    id: result.lastInsertRowid,
  });
});

// --- FAQ Chatbot Route (AI-powered via Gemini) ---
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message required.",
    });
  }

  try {
    const prompt = `
You are a helpful FAQ assistant for HealthBridge NGO, a non-profit healthcare support organization.

Only answer questions related to:
- Patient registration and support services
- Volunteer opportunities
- Health camps and outreach programs
- General health advice (non-diagnostic)
- Contact and location information.

If asked anything unrelated, politely redirect the conversation back to healthcare topics and HealthBridge services.

Be warm, concise, and supportive.

Always recommend consulting a qualified doctor or healthcare professional for medical decisions.

User Question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply =
      response.text || "I'm sorry, I couldn't process that. Please try again.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err);

    res.status(500).json({
      error: "AI service unavailable.",
    });
  }
});

// --- Admin: View all registrations ---
app.get("/api/registrations", (req, res) => {
  const rows = db
    .prepare("SELECT * FROM registrations ORDER BY created_at DESC")
    .all();

  res.json(rows);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
