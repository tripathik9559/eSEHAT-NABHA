from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.repositories import patient_repo
from app.schemas.schemas import PatientOut, PatientUpdate, HealthRecordCreate, HealthRecordOut
from typing import List

router = APIRouter(prefix="/api/patients", tags=["patients"])


@router.get("", response_model=List[PatientOut])
def list_patients(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return patient_repo.list_patients(db)


@router.get("/{patient_id}", response_model=PatientOut)
def get_patient(patient_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    p = patient_repo.get_patient(db, patient_id)
    if not p:
        raise HTTPException(status_code=404, detail="Patient not found")
    return p


@router.put("/{patient_id}", response_model=PatientOut)
def update_patient(
    patient_id: int,
    data: PatientUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    p = patient_repo.update_patient(db, patient_id, data)
    if not p:
        raise HTTPException(status_code=404, detail="Patient not found")
    return p


@router.get("/{patient_id}/records", response_model=List[HealthRecordOut])
def get_records(patient_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return patient_repo.get_health_records(db, patient_id)


@router.post("/{patient_id}/records", response_model=HealthRecordOut)
def add_record(
    patient_id: int,
    data: HealthRecordCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    p = patient_repo.get_patient(db, patient_id)
    if not p:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient_repo.add_health_record(db, patient_id, data)
