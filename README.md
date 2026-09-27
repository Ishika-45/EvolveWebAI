
<!-- ===================== BANNER ===================== -->

<p align="center">
  <img width="1672" height="941" alt="EvolveWeb AI Banner" src="https://github.com/user-attachments/assets/6610a1cd-a225-475f-8f19-501ac273a0af" />
</p>

<h1 align="center">🚀 EvolveWeb AI</h1>

<h3 align="center">
  From Startup Idea to AI-Generated Website
</h3>

<p align="center">
  An AI-powered SaaS platform for startup idea analysis, product planning, website architecture, and landing page generation.
</p>

<p align="center">
  <a href="https://github.com/Ishika-45/EvolveWebAI">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
  <a href="https://ishika-portfolio-weld.vercel.app/">
    <img src="https://img.shields.io/badge/Developer-Portfolio-38BDF8?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/OpenRouter-AI-7C3AED" alt="OpenRouter" />
  <img src="https://img.shields.io/badge/Authentication-JWT%20%7C%20OAuth-orange" alt="Authentication" />
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Key Features](#-key-features)
- [AI Workflow](#-ai-workflow)
- [Screenshots](#-screenshots)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Database Models](#-database-models)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Roadmap](#-roadmap)
- [What I Learned](#-what-i-learned)
- [Author](#-author)

---

## 🌐 Overview

**EvolveWeb AI** is an AI-powered SaaS platform designed to help entrepreneurs, founders, and product builders transform early-stage startup ideas into structured product concepts and generated landing pages.

Instead of starting with a blank page, users can move through an AI-assisted workflow that takes an initial idea and develops it into a business concept, product blueprint, website structure, and website content.

The platform combines AI integration, full-stack web development, authentication, database-backed project management, and dynamic website generation in one application.

### The Problem

Turning a startup idea into a usable digital product often involves multiple disconnected steps:

- Understanding and refining the initial idea
- Defining the target audience and value proposition
- Planning product features and monetization
- Structuring a landing page
- Writing marketing content
- Building and previewing the website

EvolveWeb AI brings these steps together in a unified workflow to help users move from an initial concept toward a website they can preview and export.

---

## ✨ Key Features

### 🤖 1. AI Startup Analysis

Analyze an initial startup idea and generate structured feedback, including:

- Idea score and evaluation
- Strengths and weaknesses
- Growth opportunities
- Market-related insights

The analysis helps users explore the potential and limitations of their initial concept.

### 🚀 2. Idea Evolution Engine

Refine startup concepts using AI-generated suggestions for:

- Improved business models
- Product positioning
- Competitive differentiation
- Alternative product directions
- Unique value propositions

### 📊 3. Product Blueprint Generation

Turn an evolved idea into a structured product blueprint containing:

| Section | Description |
|---|---|
| Problem Statement | The problem the product aims to address |
| Target Audience | Intended users and customer segments |
| Core Features | Proposed product functionality |
| Unique Selling Proposition | Key value proposition |
| Monetization Strategy | Potential revenue models |
| Future Growth Scope | Possible expansion opportunities |

### 🌐 4. Website Structure Generator

Generate a landing page structure tailored to the startup concept.

Supported sections include:

- Hero
- Problem statement
- Solution overview
- Features
- Pricing
- Testimonials
- FAQ
- Call to action
- Footer

The generated structure provides a starting point for creating a product-specific landing page.

### ✍️ 5. AI Content Generation

Generate marketing and website content for individual sections, including:

- Headlines and descriptions
- Feature content
- Marketing copy
- Call-to-action text

Section-level generation allows users to work on individual content elements without regenerating the entire website.

### 🏗️ 6. AI Website Builder

Generate landing pages using AI-generated content and website structures.

The generated output uses:

- HTML
- Tailwind CSS
- Responsive layout patterns
- Startup-specific content

### 👀 7. Live Website Preview

Preview generated websites inside the platform before exporting them.

This provides a way to inspect the generated result and review the website before using the exported files.

### 📦 8. Website Export

Export generated websites as ZIP packages.

The documented export structure is:

```text
project-name.zip
├── index.html
└── README.md
```

The exported package provides the generated website files for further customization and use.

### 🔐 9. Authentication & Project Management

#### Local Authentication

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

#### Social Authentication

- Google OAuth
- GitHub OAuth

#### User-Specific Projects

Authenticated users can manage their own projects through the application, including creating, retrieving, updating, and deleting project records.

---

## 🧠 AI Workflow

EvolveWeb AI organizes the startup-to-website process into a sequence of AI-assisted steps.

```text
          User Startup Idea
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
          AI Website Builder
                  │
                  ▼
          Live Website Preview
                  │
                  ▼
             ZIP Export
```

The workflow combines multiple AI operations with backend APIs and project persistence to organize generated outputs.

---

## 📸 Screenshots

### Landing Page

<img width="1167" height="802" alt="EvolveWeb AI Landing Page" src="https://github.com/user-attachments/assets/d96b1b10-524d-4902-acbf-67ce445d5017" />

### Dashboard

<img width="1177" height="805" alt="EvolveWeb AI Dashboard" src="https://github.com/user-attachments/assets/fc97a757-4a46-453e-b870-ef17a799f3fe" />

### Startup Analysis

<img width="735" height="813" alt="Startup Analysis" src="https://github.com/user-attachments/assets/de8debe4-594d-4c2b-8b8d-88a63b26f7ec" />

### Product Blueprint

<img width="959" height="501" alt="Product Blueprint" src="https://github.com/user-attachments/assets/f421b242-e119-44b2-929c-70d11139d7c9" />

### Website Builder

<img width="956" height="593" alt="AI Website Builder" src="https://github.com/user-attachments/assets/ed2b2b0f-e4c9-4325-a76f-fc933ca3ec80" />

---

## 🏛️ System Architecture

The application follows a client-server architecture with an Express API connecting the frontend to persistent storage, AI services, and authentication providers.

```text
┌─────────────────────────────────┐
│       React + Vite Frontend     │
│                                 │
│  UI · Dashboard · Website       │
│  Builder · Preview              │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│        Express.js API           │
│                                 │
│  Routes · Middleware · Services │
└───────┬─────────────┬───────────┘
        │             │
        ▼             ▼
┌──────────────┐  ┌────────────────┐
│   MongoDB    │  │  OpenRouter    │
│              │  │  AI Models     │
│ User &       │  │                │
│ Project Data │  │ Generation     │
└──────────────┘  └────────────────┘
        │
        ▼
┌─────────────────────────────────┐
│     Authentication Providers    │
│                                 │
│       Google OAuth              │
│       GitHub OAuth              │
└─────────────────────────────────┘
```

### Architecture Overview

| Component | Responsibility |
|---|---|
| React frontend | User interface, dashboards, forms, and website previews |
| Express backend | API routing, application logic, and request handling |
| MongoDB | Persistent storage for user and project data |
| OpenRouter | Access to AI models for idea analysis and content generation |
| Passport.js | Social authentication integration |
| JWT | Authentication and protected API access |

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| Vite | Frontend development and build tooling |
| Tailwind CSS | Styling and responsive layouts |
| Framer Motion | UI animations |
| Axios | HTTP requests |
| React Router DOM | Client-side routing |
| React Hot Toast | User notifications |
| Hello Pangea DnD | Drag-and-drop interactions |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend API framework |
| Passport.js | OAuth authentication |
| bcryptjs | Password hashing |
| JWT | Token-based authentication |
| Archiver | ZIP package generation |

### Database

- MongoDB
- Mongoose

### AI Integration

- OpenRouter API
- Gemini Flash model
- Llama 3 fallback model

### Authentication

- JSON Web Tokens
- Google OAuth
- GitHub OAuth

---

## 🗄️ Database Models

The following examples illustrate the core fields documented for the application's data models. Actual schemas may include additional fields, validation rules, and timestamps.

### User

```javascript
{
  name,
  email,
  password,
  provider
}
```

### Project

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

The project model stores the startup idea and the generated outputs associated with the website-building workflow.

---

## 🔌 API Endpoints

The following endpoints represent the documented API surface. Confirm the route prefixes and request methods against the current backend implementation.

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |

### Social Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/auth/google` | Initiate Google OAuth |
| GET | `/auth/github` | Initiate GitHub OAuth |

### Projects

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/projects` | Create a project |
| GET | `/api/projects` | Retrieve projects |
| GET | `/api/projects/:id` | Retrieve a project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### AI Features

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/ai/analyze-idea` | Analyze a startup idea |
| POST | `/api/ai/evolve-idea` | Refine a startup idea |
| POST | `/api/ai/generate-blueprint` | Generate a product blueprint |
| POST | `/api/ai/generate-website` | Generate website content |
| POST | `/api/ai/generate-stream` | Streaming generation |
| POST | `/api/ai/generate-section` | Generate individual sections |
| POST | `/api/ai/build-website` | Build a website |

---

## 📁 Project Structure

The following is a high-level overview of the repository organization.

```text
EvolveWebAI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── vercel.json
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

Follow these steps to run EvolveWeb AI locally.

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Git
- MongoDB database or MongoDB Atlas account
- OpenRouter API key

For Google and GitHub login, configure OAuth applications with the appropriate callback URLs.

### 1. Clone the Repository

```bash
git clone https://github.com/Ishika-45/EvolveWebAI.git

cd EvolveWebAI
```

### 2. Configure the Backend

```bash
cd backend

npm install
```

Create a `.env` file in the backend directory and configure the required environment variables.

Start the backend:

```bash
node server.js
```

If the backend's `package.json` defines a development script, you can use that script instead.

### 3. Configure the Frontend

Open a new terminal:

```bash
cd EvolveWebAI/frontend

npm install

npm run dev
```

Vite typically serves the frontend at:

```text
http://localhost:5173
```

Make sure the backend is running and the frontend API configuration points to the correct backend URL.

---

## 🔐 Environment Variables

Configure the following variables in the backend environment.

Never commit real API keys, passwords, OAuth secrets, or production credentials to GitHub.

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

### Environment Variable Reference

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used for signing JWTs |
| `SESSION_SECRET` | Secret used for session configuration |
| `OPENROUTER_API_KEY` | API key for OpenRouter |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret |
| `CLIENT_URL` | Frontend URL used for application and authentication configuration |

Use strong, unique secrets and configure production credentials separately from local development.

---

## 🗺️ Roadmap

The following are planned enhancements and potential future directions, not necessarily features available in the current implementation.

- [ ] React project export
- [ ] Multi-page website generation
- [ ] Drag-and-drop website editor
- [ ] Team collaboration workspaces
- [ ] Real-time collaboration
- [ ] Advanced AI design customization
- [ ] Template marketplace
- [ ] One-click deployment
- [ ] Version history

---

## 📚 What I Learned

Building EvolveWeb AI has provided practical experience in:

- Full-stack application development with React and Node.js
- Integrating external AI APIs into application workflows
- Designing REST APIs and handling backend requests
- Implementing JWT authentication and OAuth
- Modeling application data with MongoDB and Mongoose
- Generating dynamic website content and exportable files
- Organizing a SaaS-style application into frontend, backend, and service layers
- Turning a product idea into an end-to-end software project

---

## 👩‍💻 Author

### Ishika Bansal

Full-Stack Developer | AI-Powered Applications & SaaS

- **GitHub:** [Ishika-45](https://github.com/Ishika-45)
- **LinkedIn:** [Connect with me](https://www.linkedin.com/in/ishika-bansal-3443a4250)
- **Portfolio:** [View my portfolio](https://ishika-portfolio-weld.vercel.app/)

---

## ⭐ Support

If you find EvolveWeb AI interesting, consider giving the repository a star.

EvolveWeb AI explores how AI-assisted workflows can help transform early-stage startup ideas into structured product concepts and generated landing pages.

<p align="center">
  <b>From idea to blueprint. From blueprint to website. 🚀</b>
</p>
