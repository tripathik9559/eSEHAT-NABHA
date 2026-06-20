from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.repositories import doctor_repo
from app.schemas.schemas import DoctorOut, DoctorAvailabilityUpdate
from typing import List, Optional

router = APIRouter(prefix="/api/doctors", tags=["doctors"])


@router.get("", response_model=List[DoctorOut])
def list_doctors(
    available_only: bool = False,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return doctor_repo.list_doctors(db, available_only=available_only)


@router.get("/{doctor_id}", response_model=DoctorOut)
def get_doctor(doctor_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    d = doctor_repo.get_doctor(db, doctor_id)
    if not d:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return d


@router.put("/{doctor_id}/availability", response_model=DoctorOut)
def update_availability(
    doctor_id: int,
    data: DoctorAvailabilityUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    d = doctor_repo.update_availability(db, doctor_id, data.available_status)
    if not d:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return d


@router.get("/workload/all")
def workload(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return doctor_repo.get_doctor_workload(db)
