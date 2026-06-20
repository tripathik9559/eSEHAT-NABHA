from sqlalchemy.orm import Session
from app.models.models import Patient, HealthRecord
from app.schemas.schemas import PatientCreate, PatientUpdate, HealthRecordCreate
from typing import Optional, List
import uuid


def get_patient(db: Session, patient_id: int) -> Optional[Patient]:
    return db.query(Patient).filter(Patient.id == patient_id).first()


def get_patient_by_phone(db: Session, phone: str) -> Optional[Patient]:
    return db.query(Patient).filter(Patient.phone == phone).first()


def get_patient_by_qr(db: Session, qr_id: str) -> Optional[Patient]:
    return db.query(Patient).filter(Patient.qr_id == qr_id).first()


def list_patients(db: Session, skip: int = 0, limit: int = 100) -> List[Patient]:
    return db.query(Patient).offset(skip).limit(limit).all()


def create_patient(db: Session, data: PatientCreate) -> Patient:
    qr_id = f"QR-{uuid.uuid4().hex[:8].upper()}"
    patient = Patient(**data.model_dump(), qr_id=qr_id)
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


def update_patient(db: Session, patient_id: int, data: PatientUpdate) -> Optional[Patient]:
    patient = get_patient(db, patient_id)
    if not patient:
        return None
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(patient, key, value)
    db.commit()
    db.refresh(patient)
    return patient


def get_health_records(db: Session, patient_id: int) -> List[HealthRecord]:
    return (
        db.query(HealthRecord)
        .filter(HealthRecord.patient_id == patient_id)
        .order_by(HealthRecord.created_at.desc())
        .all()
    )


def add_health_record(db: Session, patient_id: int, data: HealthRecordCreate) -> HealthRecord:
    record = HealthRecord(patient_id=patient_id, **data.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record
