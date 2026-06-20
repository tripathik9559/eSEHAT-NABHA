from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Enum
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class RoleEnum(str, enum.Enum):
    patient = "patient"
    doctor = "doctor"
    asha = "asha"
    admin = "admin"
    pharmacy = "pharmacy"


class AppointmentStatusEnum(str, enum.Enum):
    scheduled = "Scheduled"
    completed = "Completed"
    cancelled = "Cancelled"
    missed = "Missed"


class PriorityEnum(str, enum.Enum):
    high = "High"
    moderate = "Moderate"
    mild = "Mild"


class AppointmentModeEnum(str, enum.Enum):
    video = "video"
    audio = "audio"
    in_person = "in_person"


class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(15), unique=True, nullable=False)
    language_pref = Column(String(5), default="en")
    qr_id = Column(String(50), unique=True, nullable=False)
    blood_group = Column(String(5), default="")
    age = Column(Integer, default=0)
    address = Column(String(200), default="")
    village = Column(String(100), default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    appointments = relationship("Appointment", back_populates="patient")
    health_records = relationship("HealthRecord", back_populates="patient")
    symptom_logs = relationship("SymptomLog", back_populates="patient")
    prescriptions = relationship("Prescription", back_populates="patient")


class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    specialization = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    available_status = Column(Boolean, default=True)
    phone = Column(String(15), nullable=False)
    qualification = Column(String(200), default="")
    experience_years = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    appointments = relationship("Appointment", back_populates="doctor")
    prescriptions = relationship("Prescription", back_populates="doctor")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(15), unique=True, nullable=False)
    role = Column(String(20), nullable=False)
    ref_id = Column(Integer, nullable=True)  # FK to patient/doctor/asha etc
    name = Column(String(100), nullable=False)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class OtpLog(Base):
    __tablename__ = "otp_logs"
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(15), nullable=False)
    otp = Column(String(10), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    used = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    datetime = Column(DateTime(timezone=True), nullable=False)
    mode = Column(String(20), default="in_person")
    status = Column(String(20), default="Scheduled")
    priority_level = Column(String(20), default="Mild")
    notes = Column(Text, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")


class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"), nullable=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    content = Column(Text, nullable=False)
    pdf_url = Column(String(300), default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    doctor = relationship("Doctor", back_populates="prescriptions")
    patient = relationship("Patient", back_populates="prescriptions")


class HealthRecord(Base):
    __tablename__ = "health_records"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    type = Column(String(50), nullable=False)  # vitals, diagnosis, allergy, etc
    data = Column(Text, nullable=False)  # JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    patient = relationship("Patient", back_populates="health_records")


class Pharmacy(Base):
    __tablename__ = "pharmacies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    location_lat = Column(Float, default=0.0)
    location_lng = Column(Float, default=0.0)
    contact = Column(String(15), nullable=False)
    address = Column(String(200), nullable=False)

    medicines = relationship("Medicine", back_populates="pharmacy")


class Medicine(Base):
    __tablename__ = "medicines"
    id = Column(Integer, primary_key=True, index=True)
    pharmacy_id = Column(Integer, ForeignKey("pharmacies.id"), nullable=False)
    name = Column(String(100), nullable=False)
    stock_status = Column(String(20), default="available")  # available, low, out
    quantity = Column(Integer, default=0)
    category = Column(String(50), default="")
    price = Column(Float, default=0.0)
    last_updated = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    pharmacy = relationship("Pharmacy", back_populates="medicines")


class SymptomLog(Base):
    __tablename__ = "symptom_logs"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    symptoms = Column(Text, nullable=False)
    risk_level = Column(String(20), nullable=False)
    recommendation = Column(Text, default="")
    suggested_specialization = Column(String(100), default="")
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    patient = relationship("Patient", back_populates="symptom_logs")


class HealthCamp(Base):
    __tablename__ = "health_camps"
    id = Column(Integer, primary_key=True, index=True)
    village = Column(String(100), nullable=False)
    scheduled_date = Column(DateTime(timezone=True), nullable=False)
    asha_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String(30), default="Scheduled")
    attendees = Column(Integer, default=0)
    notes = Column(Text, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
