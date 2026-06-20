from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, SessionLocal
from app.models.models import Base
from app.routers import auth, patients, doctors, appointments, pharmacy, symptom, notifications, admin, prescriptions

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="eSEHAT Nabha API",
    description="AI-Powered Rural Healthcare Platform for Nabha, Punjab",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(doctors.router)
app.include_router(appointments.router)
app.include_router(pharmacy.router)
app.include_router(symptom.router)
app.include_router(notifications.router)
app.include_router(admin.router)
app.include_router(prescriptions.router)


@app.on_event("startup")
def seed_on_startup():
    from app.seed import run_seed
    db = SessionLocal()
    try:
        run_seed(db)
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "project": "eSEHAT Nabha",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "ok"}
