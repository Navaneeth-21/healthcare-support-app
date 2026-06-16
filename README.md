# HealthBridge — Healthcare Support Web App

A mini healthcare support platform built for NGO use-cases, featuring patient/volunteer registration, a contact form, and an **AI-powered FAQ chatbot**.

## Links

- **Live App:** https://health-care-support.netlify.app/
- **Backend API:** https://healthcare-support-app-b08f.onrender.com

## 🧰 Tech Stack

| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Frontend | React.js, React Router, Axios         |
| Backend  | Node.js, Express.js                   |
| Database | SQLite (dev)                          |
| AI       | Gemini API Key                        |
| Hosting  | Netlify (frontend) + Render (backend) |

## 🤖 AI Feature — HealthBot FAQ Chatbot

A context-aware chatbot powered by Claude claude-sonnet-4-6. It answers:

- Questions about patient support services
- Volunteer registration process
- Health camp schedules and locations
- General non-diagnostic health guidance

The chatbot is scoped with a system prompt to stay on healthcare topics, ensuring safe, relevant responses for NGO users.

## 💡 NGO Use Case

HealthBridge is designed for healthcare NGOs to:

- **Register** patients needing support and volunteers offering help
- **Collect** inquiries via the contact form (stored in SQL database)
- **Automate** FAQ responses 24/7 via AI chatbot (reducing staff workload)
- **Scale** community outreach without proportional staff increase

## 🚀 Run Locally

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm start
```

Add `GEMINI_API_KEY` to `backend/.env`.
