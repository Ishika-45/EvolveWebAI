# 🚀 EvolveWeb AI

> Transform startup ideas into validated business concepts, product blueprints, website architectures, and AI-generated landing pages.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-purple)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Google OAuth](https://img.shields.io/badge/Google-OAuth-red)
![GitHub OAuth](https://img.shields.io/badge/GitHub-OAuth-black)

---

# 🌐 Overview

EvolveWeb AI is an AI-powered SaaS platform that helps entrepreneurs, founders, and product builders transform raw startup ideas into structured business plans, product blueprints, website architectures, marketing content, and fully generated landing pages.

The platform acts as an AI startup co-founder by automating startup validation, product planning, website generation, and content creation workflows.

---

# ✨ Key Features

## 🤖 AI Startup Analysis

Analyze startup ideas and receive:

- Idea Score
- Strengths Analysis
- Weakness Analysis
- Growth Opportunities
- Market Insights

## 🚀 Idea Evolution Engine

Enhance startup concepts through AI-generated:

- Improved Business Models
- Better Positioning
- Competitive Advantages
- Unique Product Angles

## 📊 Product Blueprint Generation

Generate complete startup blueprints including:

- Problem Statement
- Target Audience
- Core Features
- Unique Selling Proposition
- Monetization Strategy
- Future Growth Scope

## 🌐 Website Structure Generator

Automatically create website architecture with:

- Hero Section
- Problem Statement
- Solution Overview
- Features
- Pricing
- Testimonials
- FAQ
- Call-To-Action
- Footer

## ✍️ AI Content Generation

Generate content for individual website sections:

- Headlines
- Descriptions
- Marketing Copy
- Feature Content
- CTA Text

## 🏗️ AI Website Builder

Generate complete responsive landing pages using:

- HTML
- Tailwind CSS
- Modern SaaS Design Patterns
- Startup-Specific Content

## 👀 Live Website Preview

Preview generated websites directly inside the platform before exporting.

## 📦 Website Export System

Export generated websites as ZIP packages containing:

```bash
project-name.zip
│
├── index.html
└── README.md
```

## 🔐 Authentication System

### Local Authentication

- User Registration
- User Login
- JWT Authentication

### Social Authentication

- Google OAuth
- GitHub OAuth

### Security

- Password Hashing (bcrypt)
- JWT Token Verification
- Protected Routes
- User-Specific Projects

---

# 🧠 AI Workflow

```text
User Idea
    │
    ▼
AI Startup Analysis
    │
    ▼
Idea Evolution
    │
    ▼
Product Blueprint
    │
    ▼
Website Structure
    │
    ▼
Section Content Generation
    │
    ▼
AI Website Generation
    │
    ▼
Preview & Export
```

---

# 📸 Screenshots

## Landing Page

![Landing Page](./screenshots/landing-page.png)

## Dashboard

![Dashboard](./screenshots/dashboard.png)

## Startup Analysis

![Startup Analysis](./screenshots/startup-analysis.png)

## Product Blueprint

![Blueprint](./screenshots/blueprint.png)

## Website Builder

![Website Builder](./screenshots/website-builder.png)

---

# 🏛️ System Architecture

```text
Frontend (React + Tailwind)
            │
            ▼
      Express API
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
MongoDB   OpenRouter   OAuth
Database     AI      Providers
```

---

# 🗄️ Database Models

## User

```javascript
{
  name,
  email,
  password,
  provider
}
```

## Project

```javascript
{
  title,
  idea,
  analysis,
  evolvedIdea,
  blueprint,
  websiteStructure,
  generatedCode,
  generatedWebsite
}
```

---

# 🔌 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## Social Authentication

```http
GET /auth/google
GET /auth/github
```

## Projects

```http
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

## AI Features

```http
POST /api/ai/analyze-idea
POST /api/ai/evolve-idea
POST /api/ai/generate-blueprint
POST /api/ai/generate-website
POST /api/ai/generate-stream
POST /api/ai/generate-section
POST /api/ai/build-website
```

---

# 🛠️ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM
- React Hot Toast
- Hello Pangea DnD

## Backend

- Node.js
- Express.js
- Passport.js
- JWT Authentication
- bcryptjs
- Archiver

## Database

- MongoDB
- Mongoose

## AI

- OpenRouter API
- Gemini Flash
- Llama 3 Fallback Model

## Authentication

- JWT
- Google OAuth
- GitHub OAuth

---

# 📁 Project Structure

```bash
evolveweb-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   └── server.js
│
├── vercel.json
├── .env
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Ishika-45/EvolveWebAI.git
cd EvolveWebAI
```

## Backend Setup

```bash
cd backend
npm install
node server.js
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Environment Variables

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

SESSION_SECRET=your_session_secret

OPENROUTER_API_KEY=your_openrouter_api_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

CLIENT_URL=http://localhost:5173
```

---

# 🚀 Future Enhancements

- Next.js Code Generation
- React Project Export
- Multi-Page Website Generation
- Drag-and-Drop Website Editor
- Team Collaboration Workspaces
- Real-Time Collaboration
- AI Design Customization
- Template Marketplace
- One-Click Deployment
- Version History

---

# 💼 What This Project Demonstrates

- Full-Stack Development
- AI Integration
- SaaS Product Development
- Authentication & Authorization
- OAuth Implementation
- REST API Design
- MongoDB Data Modeling
- Prompt Engineering
- Dynamic Content Generation
- AI Website Generation
- Product-Oriented Development

---

# 👩‍💻 Author

### Ishika Bansal

- GitHub: https://github.com/Ishika-45
- LinkedIn: https://linkedin.com/in/ishika-bansal-3443a4250
- Portfolio: https://talentcanvas.netlify.app

---

## ⭐ Support

If you found this project interesting, consider giving it a star.

**EvolveWeb AI demonstrates how AI can accelerate startup validation, product planning, and website creation by transforming ideas into actionable digital products through intelligent automation.**
