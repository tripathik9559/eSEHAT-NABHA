from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, and_
from app.models.models import Appointment, Patient, Doctor, Notification, User
from app.schemas.schemas import AppointmentCreate, AppointmentUpdate
from typing import Optional, List
from datetime import datetime, date


PRIORITY_ORDER = {"High": 0, "Moderate": 1, "Mild": 2}


def list_appointments(
    db: Session,
    patient_id: Optional[int] = None,
    doctor_id: Optional[int] = None,
    status: Optional[str] = None,
) -> List[Appointment]:
    q = db.query(Appointment).options(
        joinedload(Appointment.patient),
        joinedload(Appointment.doctor),
    )
    if patient_id:
        q = q.filter(Appointment.patient_id == patient_id)
    if doctor_id:
        q = q.filter(Appointment.doctor_id == doctor_id)
    if status:
        q = q.filter(Appointment.status == status)
    return q.order_by(Appointment.datetime.desc()).all()


def get_appointment(db: Session, appt_id: int) -> Optional[Appointment]:
    return db.query(Appointment).options(
        joinedload(Appointment.patient),
        joinedload(Appointment.doctor),
    ).filter(Appointment.id == appt_id).first()


def create_appointment(db: Session, data: AppointmentCreate) -> Appointment:
    appt = Appointment(**data.model_dump())
    db.add(appt)
    db.commit()
    db.refresh(appt)
    return get_appointment(db, appt.id)


def update_appointment(db: Session, appt_id: int, data: AppointmentUpdate) -> Optional[Appointment]:
    appt = get_appointment(db, appt_id)
    if not appt:
        return None
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(appt, key, value)
    db.commit()
    db.refresh(appt)
    return get_appointment(db, appt_id)


def update_status(db: Session, appt_id: int, status: str) -> Optional[Appointment]:
    appt = db.query(Appointment).filter(Appointment.id == appt_id).first()
    if not appt:
        return None
    appt.status = status
    db.commit()

    # Fire notification to patient
    patient_user = db.query(User).filter(
        User.ref_id == appt.patient_id, User.role == "patient"
    ).first()
    if patient_user:
        msg = f"Your appointment #{appt_id} status has been updated to: {status}"
        notif = Notification(user_id=patient_user.id, type="appointment_update", message=msg)
        db.add(notif)
        db.commit()

    return get_appointment(db, appt_id)


def delete_appointment(db: Session, appt_id: int) -> bool:
    appt = db.query(Appointment).filter(Appointment.id == appt_id).first()
    if not appt:
        return False
    appt.status = "Cancelled"
    db.commit()
    return True


def get_priority_queue(db: Session, doctor_id: Optional[int] = None) -> List[Appointment]:
    q = db.query(Appointment).options(
        joinedload(Appointment.patient),
        joinedload(Appointment.doctor),
    ).filter(Appointment.status == "Scheduled")
    if doctor_id:
        q = q.filter(Appointment.doctor_id == doctor_id)
    appointments = q.all()
    return sorted(appointments, key=lambda a: (PRIORITY_ORDER.get(a.priority_level, 2), a.datetime))


def count_today(db: Session) -> int:
    today = date.today()
    return db.query(func.count(Appointment.id)).filter(
        func.date(Appointment.datetime) == today
    ).scalar()
