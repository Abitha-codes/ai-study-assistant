# AI Study Assistant

> Upload your notes. Learn smarter with AI.

A MERN-stack study assistant that turns uploaded notes into AI-generated summaries, flashcards, quizzes, and gives students a chat interface to ask questions about their own material.

This project is being built **feature by feature**, with each phase fully working end-to-end before moving to the next, as requested. See [Build Status](#build-status) below for what's live right now.

---

## Tech Stack

**Frontend:** React 19 (Vite), React Router DOM, Axios, Tailwind CSS v4, Framer Motion, React Icons, React Hook Form, React Hot Toast, Recharts, Context API

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Auth, bcrypt, Multer, pdf-parse, dotenv, cors

**AI:** Grok API (xAI)

---

## Build Status

| Phase | Feature | Status |
|---|---|---|
| 1 | Landing page (hero, features, how it works, stats, testimonials, FAQ, footer) | ✅ Done |
| 1 | Auth (register, login, JWT, protected routes, password update) | ✅ Done |
| 1 | Dashboard shell (sidebar, top navbar, dark mode, dashboard home w/ live zero-state stats) | ✅ Done |
| 2 | Subject Management (create/edit/delete/search, color tags) | ✅ Done |
| 3 | Upload Notes (PDF/DOCX/TXT, drag & drop, text extraction) | ⏳ Next |
| 4 | AI Processing pipeline (Grok API → summary, flashcards, quiz, key concepts) | ⏳ Planned |
| 5 | AI Summary page | ⏳ Planned |
| 6 | Flashcards module (flip animation, progress, favorites) | ⏳ Planned |
| 7 | Quiz module (timer, scoring, review mode, history) | ⏳ Planned |
| 8 | AI Chat (ChatGPT-style, markdown, history) | ⏳ Planned |
| 9 | Study Planner (goals, deadlines, calendar view) | ⏳ Planned |
| 10 | Global Search + History | ⏳ Planned |
| 11 | Profile + Settings | ⏳ Planned |
| 12 | Admin Panel | ⏳ Planned |

Pages for not-yet-built features render an explicit "coming soon" state in the UI (visible via the sidebar) rather than fake data — nothing in the shipped code pretends to work when it doesn't.

---

## Project Structure

```
ai-study-assistant/
├── backend/
│   ├── config/          # DB connection, app config
│   ├── controllers/     # Route handler logic
│   ├── middleware/      # Auth, error handling, validation
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── services/        # (AI service, file parsing — added per phase)
│   ├── utils/           # Helpers (JWT, etc.)
│   ├── uploads/          # Uploaded file storage
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── layout/   # Navbar, Sidebar, Footer, Auth illustration
        │   ├── ui/       # Reusable UI (cards, modals, stat cards)
        │   └── common/   # ProtectedRoute, ComingSoon
        ├── pages/
        │   ├── auth/     # Login, Register
        │   └── dashboard/# Dashboard feature pages
        ├── layouts/      # DashboardLayout
        ├── context/      # AuthContext, ThemeContext
        ├── services/     # Axios API service modules
        └── App.jsx
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string
- A Grok (xAI) API key (only needed once Phase 4 — AI Processing — is built)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set at minimum:
```
MONGO_URI=mongodb://127.0.0.1:27017/ai-study-assistant
JWT_SECRET=some_long_random_string
CLIENT_URL=http://localhost:5173
```

Run it:
```bash
npm run dev
```
The API starts on `http://localhost:5000`. Health check: `GET /api/health`.

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` should contain:
```
VITE_API_URL=http://localhost:5000/api
```

Run it:
```bash
npm run dev
```
The app starts on `http://localhost:5173`.

---

## API Endpoints (implemented so far)

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Create account (fullName, email, password) |
| POST | `/login` | Public | Login, returns JWT + user, updates study streak |
| GET | `/me` | Private | Get current logged-in user |
| POST | `/logout` | Private | Logout (client also clears token) |
| PUT | `/update-password` | Private | Change password |

### Subjects — `/api/subjects`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/?search=` | Private | List subjects (optional name search) |
| GET | `/:id` | Private | Get one subject |
| POST | `/` | Private | Create subject (name, description, color, icon) |
| PUT | `/:id` | Private | Update subject |
| DELETE | `/:id` | Private | Delete subject (cascades to its notes) |

All private routes require `Authorization: Bearer <token>`.

---

## Environment Variables Reference

**Backend (`backend/.env`)**
| Variable | Description |
|---|---|
| `PORT` | API server port (default 5000) |
| `NODE_ENV` | `development` \| `production` |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (default `7d`) |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `GROK_API_KEY` | xAI Grok API key (Phase 4+) |
| `GROK_API_URL` | Grok chat completions endpoint |
| `GROK_MODEL` | Grok model name |
| `MAX_FILE_SIZE_MB` | Upload size limit (Phase 3) |

**Frontend (`frontend/.env`)**
| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

---

## Deployment Guide (high level)

- **Backend:** Deploy to Render / Railway / Fly.io / EC2. Set all env vars from the table above. Point `MONGO_URI` at MongoDB Atlas for production.
- **Frontend:** Deploy to Vercel / Netlify. Set `VITE_API_URL` to your deployed backend URL. Run `npm run build`, deploy the `dist/` folder.
- Update backend `CLIENT_URL` to your deployed frontend origin so CORS allows it.

---

## Future Improvements
- Google OAuth (UI is already in place on Login/Register)
- Real-time notifications via WebSockets
- Offline flashcard review (PWA)
- Export summaries/flashcards to PDF
- Team/classroom sharing of subjects

---

## Next Step

Reply to continue and Phase 3 (**Upload Notes** — drag & drop, PDF/DOCX/TXT parsing with `pdf-parse` and `mammoth`, stored extracted text) will be built next, followed by the Grok AI processing pipeline that powers summaries, flashcards, and quizzes.
