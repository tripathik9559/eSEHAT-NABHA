from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Any
from datetime import datetime


# ── Auth ──────────────────────────────────────────────────────────────────────
class SendOtpRequest(BaseModel):
    phone: str
    role: str = "patient"


class VerifyOtpRequest(BaseModel):
    phone: str
    otp: str
    role: str = "patient"
    name: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: int
    name: str
    ref_id: Optional[int] = None


# ── Patient ───────────────────────────────────────────────────────────────────
class PatientBase(BaseModel):
    name: str
    phone: str
    language_pref: Optional[str] = "en"
    blood_group: Optional[str] = ""
    age: Optional[int] = 0
    address: Optional[str] = ""
    village: Optional[str] = ""


class PatientCreate(PatientBase):
    pass


class PatientUpdate(BaseModel):
    name: Optional[str] = None
    language_pref: Optional[str] = None
    blood_group: Optional[str] = None
    age: Optional[int] = None
    address: Optional[str] = None
    village: Optional[str] = None


class PatientOut(PatientBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    qr_id: str
    created_at: Optional[datetime] = None


# ── Doctor ────────────────────────────────────────────────────────────────────
class DoctorBase(BaseModel):
    name: str
    specialization: str
    department: str
    phone: str
    qualification: Optional[str] = ""
    experience_years: Optional[int] = 0


class DoctorOut(DoctorBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    available_status: bool
    created_at: Optional[datetime] = None


class DoctorAvailabilityUpdate(BaseModel):
    available_status: bool


# ── Appointment ───────────────────────────────────────────────────────────────
class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    datetime: datetime
    mode: Optional[str] = "in_person"
    priority_level: Optional[str] = "Mild"
    notes: Optional[str] = ""


class AppointmentUpdate(BaseModel):
    datetime: Optional[datetime] = None
    mode: Optional[str] = None
    notes: Optional[str] = None


class AppointmentStatusUpdate(BaseModel):
    status: str


class AppointmentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    patient_id: int
    doctor_id: int
    datetime: datetime
    mode: str
    status: str
    priority_level: str
    notes: Optional[str] = ""
    created_at: Optional[datetime] = None
    patient: Optional[PatientOut] = None
    doctor: Optional[DoctorOut] = None


# ── Prescription ──────────────────────────────────────────────────────────────
class PrescriptionCreate(BaseModel):
    appointment_id: Optional[int] = None
    doctor_id: int
    patient_id: int
    content: str


class PrescriptionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    appointment_id: Optional[int] = None
    doctor_id: int
    patient_id: int
    content: str
    pdf_url: Optional[str] = ""
    created_at: Optional[datetime] = None
    patient: Optional[PatientOut] = None
    doctor: Optional[DoctorOut] = None


# ── Health Record ─────────────────────────────────────────────────────────────
class HealthRecordCreate(BaseModel):
    type: str
    data: str


class HealthRecordOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    patient_id: int
    type: str
    data: str
    created_at: Optional[datetime] = None


# ── Pharmacy ──────────────────────────────────────────────────────────────────
class PharmacyOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    location_lat: float
    location_lng: float
    contact: str
    address: str


class MedicineOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    pharmacy_id: int
    name: str
    stock_status: str
    quantity: int
    category: str
    price: float
    last_updated: Optional[datetime] = None
    pharmacy: Optional[PharmacyOut] = None


class MedicineStockUpdate(BaseModel):
    stock_status: str
    quantity: int


# ── Symptom ───────────────────────────────────────────────────────────────────
class SymptomAnalyzeRequest(BaseModel):
    patient_id: int
    symptoms: str


class SymptomAnalyzeResponse(BaseModel):
    risk_level: str
    recommendation: str
    suggested_specialization: str
    symptoms_detected: List[str]


# ── Notification ──────────────────────────────────────────────────────────────
class NotificationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    type: str
    message: str
    is_read: bool
    created_at: Optional[datetime] = None


class SendNotificationRequest(BaseModel):
    user_id: int
    type: str
    message: str


# ── Health Camp ───────────────────────────────────────────────────────────────
class HealthCampCreate(BaseModel):
    village: str
    scheduled_date: datetime
    asha_id: int
    notes: Optional[str] = ""


class HealthCampOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    village: str
    scheduled_date: datetime
    asha_id: int
    status: str
    attendees: int
    notes: Optional[str] = ""
    created_at: Optional[datetime] = None


# ── Admin Analytics ───────────────────────────────────────────────────────────
class AnalyticsOut(BaseModel):
    total_patients: int
    total_appointments: int
    appointments_today: int
    high_risk_patients: int
    doctor_utilization: List[dict]
    disease_trends: List[dict]
    village_stats: List[dict]


# ── Generic ───────────────────────────────────────────────────────────────────
class MessageResponse(BaseModel):
    message: str
    success: bool = True
