# eSEHAT Nabha 🏥

**AI-Powered, Multilingual, Offline-First Rural Healthcare Platform**  
Civil Hospital Nabha, Punjab — Serving 173 villages

---

## Overview

eSEHAT Nabha digitises rural healthcare delivery for Nabha, Punjab. It provides five role-based portals (Patient, Doctor, ASHA, Admin, Pharmacy) with features including AI symptom checking, telemedicine via Jitsi, QR health cards, PDF prescriptions, offline-first architecture, and full Punjabi/Hindi/English localisation.

---

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- pip

---

## Backend Setup

```bash
cd backend

# 1. Copy environment file
cp .env.example .env

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start server (SQLite used automatically when DATABASE_URL is blank)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

- API docs: http://localhost:8000/docs  
- Health check: http://localhost:8000/health  
- Demo data is seeded automatically on first startup.

---

## Frontend Setup

```bash
cd frontend

# 1. Copy environment file
cp .env.example .env
# Edit VITE_API_URL if backend runs on a different port

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Opens at http://localhost:5173

# 4. Production build
npm run build
```

---

## Demo Credentials

| Role     | Phone         | OTP  | Notes                       |
|----------|---------------|------|-----------------------------|
| Patient  | 9876500001    | 1234 | Gurpreet Singh (High risk)  |
| Doctor   | 9876501001    | 1234 | Dr. Rajesh Sharma           |
| ASHA     | 9876503001    | 1234 | ASHA Worker                 |
| Admin    | 9876503002    | 1234 | Civil Hospital Admin        |
| Pharmacy | 9876503003    | 1234 | Civil Hospital Pharmacy     |

Any 10-digit number + OTP **1234** works in demo mode.

---

## Features

### Patient Portal
- OTP login (demo: 1234)
- AI Symptom Checker with voice input (hi-IN / pa-IN / en-IN)
- Book/reschedule/cancel appointments with priority levels
- QR Health Card — print + download PNG
- Telemedicine via Jitsi (video + audio, low-bandwidth toggle)
- Health Records Vault (offline via IndexedDB)
- Medicine Finder across pharmacies

### Doctor Portal
- Priority Queue (High → Moderate → Mild)
- Appointment management with status updates
- PDF Prescription generator (jsPDF)
- Full patient history view

### ASHA Worker Portal
- Register new patients
- Schedule and manage health camps
- Assist patients with telemedicine

### Admin Portal
- System analytics (SVG charts, no recharts)
- Doctor availability real-time toggle
- Doctor workload and utilization
- Village demand statistics

### Pharmacy Portal
- Medicine inventory management
- Stock status updates (Available / Low / Out)
- Pharmacy locator with stock view

---

## Neon PostgreSQL Setup

1. Create a free project at https://neon.tech
2. Copy the connection string
3. Set in `backend/.env`:
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/nabha?sslmode=require
   ```
4. On first start, all tables are auto-created via SQLAlchemy

---

## Twilio SMS OTP (Optional — Production Only)

1. Create a Twilio account at https://twilio.com
2. Get Account SID, Auth Token, and a phone number
3. Set in `backend/.env`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
   ```
4. When set, real SMS OTPs are sent; otherwise demo OTP 1234 is used.

---

## Deploy to Netlify (Frontend)

```bash
cd frontend
npm run build

# Deploy dist/ folder to Netlify
# Or connect GitHub repo and set:
#   Build command: npm run build
#   Publish dir: dist
#   Environment variable: VITE_API_URL=https://your-backend.onrender.com
```

---

## Deploy to Render (Backend)

1. Push backend/ to GitHub
2. Create a new **Web Service** on Render
3. Settings:
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   - `DATABASE_URL` — Neon PostgreSQL URL
   - `SECRET_KEY` — random 32-char string
   - `CORS_ORIGINS` — your Netlify URL

---

## Architecture

```
Nabha/
├── backend/
│   ├── main.py                  # FastAPI app, startup seed
│   ├── requirements.txt
│   └── app/
│       ├── core/                # config, database, security (JWT)
│       ├── models/              # SQLAlchemy ORM models
│       ├── schemas/             # Pydantic request/response schemas
│       ├── repositories/        # DB queries only
│       ├── services/            # Business logic (AI risk engine, analytics)
│       ├── routers/             # HTTP endpoints
│       └── seed.py              # Demo data
│
└── frontend/
    ├── src/
    │   ├── App.jsx              # Routes + auth guards
    │   ├── contexts/            # Auth, Theme, Language contexts
    │   ├── services/api.js      # Axios API layer
    │   ├── i18n/translations.js # en / hi / pa strings
    │   ├── utils/               # helpers, pdfGenerator, indexedDB
    │   ├── components/
    │   │   ├── layout/          # TopBar, Sidebar, Layout
    │   │   ├── common/          # Shared UI components
    │   │   └── charts/          # Pure SVG BarChart, LineChart, DonutChart
    │   └── pages/               # One folder per role
    └── public/sw.js             # Service Worker (offline-first)
```

**Backend pattern:** Router → Service → Repository → Database  
**Frontend:** React + Vite + Tailwind CSS (darkMode: class)  
**Auth:** JWT (HS256), stored in localStorage  
**Offline:** IndexedDB + Service Worker + auto-sync queue  

---

## AI Risk Engine

Rule-based keyword matching — no ML model required, always works offline.

| Symptoms Detected | Risk Level | Action |
|-------------------|------------|--------|
| Chest pain, stroke, seizure, severe bleeding… | High | Immediate emergency visit |
| Fever, vomiting, abdominal pain, weakness… | Moderate | Book within 24–48 hours |
| Cold, runny nose, mild cough… | Mild | Routine visit |

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS        |
| Backend    | FastAPI, Uvicorn, SQLAlchemy        |
| Database   | SQLite (local) / Neon PostgreSQL    |
| Auth       | JWT (python-jose)                   |
| Video      | Jitsi Meet External API             |
| PDF        | jsPDF                               |
| QR Code    | qrcode.react                        |
| Voice      | Web Speech API                      |
| Offline    | IndexedDB + Service Worker          |
| Charts     | Pure SVG (no recharts)              |
| i18n       | Custom: English / Hindi / Punjabi   |
