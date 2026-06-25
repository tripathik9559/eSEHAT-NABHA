# 🏥 eSEHAT NABHA

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Offline%20First-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

<br/>

> **An AI-powered, multilingual, offline-first rural healthcare platform**  
> Connecting Patients, Doctors, ASHA Workers, Pharmacies & Health Administrators

</div>

---

> [!WARNING]
> ## 🚧 ACTIVELY UNDER UPGRADE — NOT PRODUCTION READY 🚧
>
> **This project is being rebuilt and significantly upgraded from its original version. Several modules listed below are in active development.**
>
> Originally submitted to **Smart India Hackathon (SIH) 2025** — was not selected as the initial build was basic. Rather than abandoning it, I'm  rebuilding it into a more complete, production-grade system with my team.
>
> ⚠️ Do not deploy for real healthcare use. Educational / portfolio project only.

---

## 📌 The Problem

**Nabha, Punjab** and its surrounding **173 villages** face severe healthcare accessibility challenges:

- Civil Hospital Nabha runs with only **11 doctors against 23 sanctioned posts**
- Patients travel long distances only to find specialists unavailable or medicines out of stock
- Poor road infrastructure adds delays; daily-wage workers and farmers lose income on repeat visits
- No digital health records — only **31% of rural Punjab households** have internet access
- Result: treatment delays, rising costs, worsening patient outcomes

---

## 💡 The Solution

eSEHAT Nabha is a **multilingual, AI-powered, offline-first** healthcare ecosystem connecting Patients, Doctors, ASHA Workers, Pharmacies, and Health Administrators on one platform.

### Core Patient Module
- 📱 Mobile + OTP login, rural-friendly onboarding
- 🌐 Punjabi / Hindi / English — real-time language switching
- 🎤 Voice-based symptom input (low-literacy friendly)
- 🩺 AI Symptom Checker + **AI Risk Engine** (🟢 Mild / 🟡 Moderate / 🔴 High Risk)
- 📋 Digital Health Record Vault
- 🆔 QR-based Health Card — instant history lookup by doctors
- 🎥 Telemedicine — video/audio consultation with **audio auto-fallback** in low bandwidth
- ⚡ **Smart Priority Queue** — high-risk patients get immediate slots, directly addressing doctor shortage
- 📴 Offline-first — IndexedDB + Service Workers, auto-sync when online

### Medicine & Pharmacy
- Medicine availability tracker across pharmacies
- Pharmacy locator + owner dashboard for stock management

### Doctor Module
- Daily appointments & active case dashboard
- Digital prescription generator (PDF, auto-saved)
- Full patient history viewer

### ASHA Worker Module
- Patient registration & health info updates
- Village health camp scheduling & tracking

### Admin / Health Department
- Doctor availability & workload dashboards
- Rural health analytics — demand patterns, village-wise insights, resource planning

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│   FRONTEND (React + TS + Tailwind)   │  → Netlify
│   Patient / Doctor / ASHA / Admin    │
│   Portals + PWA + Offline Layer      │
└──────────────┬────────────────────────┘
               │ REST APIs
┌──────────────▼────────────────────────┐
│   BACKEND (Node.js / Express)         │  → Render
│   Auth · Appointments · Pharmacy      │
│   AI Symptom/Risk Engine · Priority Q │
└──────────────┬────────────────────────┘
               │
┌──────────────▼────────────────────────┐
│   DATABASE (PostgreSQL via Supabase)  │
│   Patients · Doctors · Appointments   │
│   Prescriptions · HealthRecords       │
│   Pharmacies · Medicines · SymptomLogs│
└─────────────────────────────────────┘

      + OFFLINE LAYER (Client-side)
      IndexedDB + Service Worker
      (queues writes, syncs when online)
```

### Database Schema (PostgreSQL / Supabase)
```
patients        (id, name, phone, language_pref, qr_id, created_at)
doctors         (id, name, specialization, department, available_status)
appointments    (id, patient_id, doctor_id, datetime, mode, status, priority_level)
prescriptions   (id, appointment_id, content, pdf_url, created_at)
health_records  (id, patient_id, type, data, created_at)
pharmacies      (id, name, location_lat, location_lng, contact)
medicines       (id, pharmacy_id, name, stock_status, last_updated)
symptom_logs    (id, patient_id, symptoms, risk_level, timestamp)
health_camps    (id, village, date, status)
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript, Tailwind CSS, React Router, React Query |
| Charts | Recharts |
| Backend | Node.js + Express |
| Database | PostgreSQL (Supabase) |
| Offline | IndexedDB + Service Workers (PWA) |
| Video Call | Jitsi Meet SDK / Daily.co |
| Frontend Hosting | Netlify |
| Backend Hosting | Render |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm / yarn
- Supabase account (PostgreSQL)

### Frontend
```bash
git clone https://github.com/tripathik9559/eSEHAT-NABHA.git
cd eSEHAT-NABHA
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add SUPABASE_URL, SUPABASE_KEY, JWT_SECRET
npm run dev
```

### Environment Variables (`.env`)
```env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
JWT_SECRET=your-jwt-secret
PORT=5000
```

---

## 🗺️ Roadmap (MVP Build Phases)

<<<<<<< HEAD
- [x] Phase 1 — Auth (OTP), Patient Portal UI, rule-based Symptom Checker, Priority Queue logic
- [ ] Phase 2 — Backend API + PostgreSQL integration, connect symptom checker to real data
- [ ] Phase 3 — Doctor Portal, priority-sorted appointment booking, video consultation (Jitsi/Daily.co)
- [ ] Phase 4 — Offline sync (IndexedDB + Service Worker, conflict resolution)
- [ ] Phase 5 — Pharmacy + Admin dashboards (Workload + Analytics)
- [ ] Phase 6 — ASHA portal, Health Camps, QR Health Card
=======
## 🗺️ Roadmap (MVP Build Phases)

- [x] Phase 1 — Auth (OTP), Patient Portal UI, rule-based Symptom Checker, Priority Queue logic
- [x] Phase 2 — Backend API + PostgreSQL integration, connect symptom checker to real data
- [x] Phase 3 — Doctor Portal, priority-sorted appointment booking, video consultation (Jitsi/Daily.co)
- [x] Phase 4 — Offline sync (IndexedDB + Service Worker, conflict resolution)
- [x] Phase 5 — Pharmacy + Admin dashboards (Workload + Analytics)
- [x] Phase 6 — ASHA portal, Health Camps, QR Health Card
- [ ] Phase 7 — Testing & Debugging: end-to-end QA across all portals, fixing edge cases, performance tuning before final release
>>>>>>> 6e170210f74bc5f586188663a71acccb2ac30db4

---

## 🌍 Impact

| Beneficiary | Impact |
|-------------|--------|
| Rural Patients & Farmers | Reduced travel, faster access to care |
| Doctors | Better workload distribution via priority queue |
| ASHA Workers | Streamlined registration & camp management |
| Pharmacies | Real-time stock visibility, reduced stockouts |
| Health Department | Data-driven resource planning |

---

## 🏆 Origin — Smart India Hackathon 2025

This project was submitted to **SIH 2025** as a basic prototype, which was **not selected** due to limited scope at the time. Rather than letting it sit, we're rebuilding it into a fuller, production-grade platform — covering offline-first architecture, AI risk classification, and a complete multi-role portal system.

---

## 👨‍💻 Author

**Kartikey Kumar Tripathi**  
B.Tech CSE — BBDNIIT, Lucknow (2026 Batch)

---

## 📝 License

For educational and portfolio purposes only.
