from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.repositories import appointment_repo
from app.schemas.schemas import (
    AppointmentCreate, AppointmentUpdate, AppointmentStatusUpdate, AppointmentOut, MessageResponse
)
from typing import List, Optional

router = APIRouter(prefix="/api/appointments", tags=["appointments"])


@router.get("", response_model=List[AppointmentOut])
def list_appointments(
    patient_id: Optional[int] = None,
    doctor_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return appointment_repo.list_appointments(db, patient_id, doctor_id, status)


@router.get("/queue", response_model=List[AppointmentOut])
def priority_queue(
    doctor_id: Optional[int] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return appointment_repo.get_priority_queue(db, doctor_id)


@router.get("/{appt_id}", response_model=AppointmentOut)
def get_appointment(appt_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    appt = appointment_repo.get_appointment(db, appt_id)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appt


@router.post("", response_model=AppointmentOut)
def create_appointment(
    data: AppointmentCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return appointment_repo.create_appointment(db, data)


@router.put("/{appt_id}", response_model=AppointmentOut)
def update_appointment(
    appt_id: int,
    data: AppointmentUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    appt = appointment_repo.update_appointment(db, appt_id, data)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appt


@router.put("/{appt_id}/status", response_model=AppointmentOut)
def update_status(
    appt_id: int,
    data: AppointmentStatusUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    valid_statuses = ["Scheduled", "Completed", "Cancelled", "Missed"]
    if data.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of {valid_statuses}")
    appt = appointment_repo.update_status(db, appt_id, data.status)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appt


@router.delete("/{appt_id}", response_model=MessageResponse)
def cancel_appointment(
    appt_id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    ok = appointment_repo.delete_appointment(db, appt_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return MessageResponse(message="Appointment cancelled")
