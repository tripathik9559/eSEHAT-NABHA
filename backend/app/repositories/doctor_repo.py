from sqlalchemy.orm import Session
from app.models.models import Doctor, Appointment
from typing import Optional, List
from sqlalchemy import func


def list_doctors(db: Session, available_only: bool = False) -> List[Doctor]:
    q = db.query(Doctor)
    if available_only:
        q = q.filter(Doctor.available_status == True)
    return q.all()


def get_doctor(db: Session, doctor_id: int) -> Optional[Doctor]:
    return db.query(Doctor).filter(Doctor.id == doctor_id).first()


def update_availability(db: Session, doctor_id: int, status: bool) -> Optional[Doctor]:
    doctor = get_doctor(db, doctor_id)
    if not doctor:
        return None
    doctor.available_status = status
    db.commit()
    db.refresh(doctor)
    return doctor


def get_doctor_workload(db: Session) -> List[dict]:
    doctors = db.query(Doctor).all()
    result = []
    for doc in doctors:
        total = db.query(func.count(Appointment.id)).filter(
            Appointment.doctor_id == doc.id
        ).scalar()
        completed = db.query(func.count(Appointment.id)).filter(
            Appointment.doctor_id == doc.id,
            Appointment.status == "Completed"
        ).scalar()
        result.append({
            "doctor_id": doc.id,
            "name": doc.name,
            "specialization": doc.specialization,
            "department": doc.department,
            "available": doc.available_status,
            "total_appointments": total,
            "completed_appointments": completed,
            "utilization": round((completed / total * 100) if total > 0 else 0, 1),
        })
    return result
