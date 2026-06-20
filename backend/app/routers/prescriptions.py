from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.models import Prescription
from app.schemas.schemas import PrescriptionCreate, PrescriptionOut, MessageResponse
from typing import List, Optional

router = APIRouter(prefix="/api/prescriptions", tags=["prescriptions"])


@router.get("", response_model=List[PrescriptionOut])
def list_prescriptions(
    patient_id: Optional[int] = None,
    doctor_id: Optional[int] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    q = db.query(Prescription).options(
        joinedload(Prescription.patient),
        joinedload(Prescription.doctor),
    )
    if patient_id:
        q = q.filter(Prescription.patient_id == patient_id)
    if doctor_id:
        q = q.filter(Prescription.doctor_id == doctor_id)
    return q.order_by(Prescription.created_at.desc()).all()


@router.get("/{presc_id}", response_model=PrescriptionOut)
def get_prescription(presc_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    p = db.query(Prescription).options(
        joinedload(Prescription.patient),
        joinedload(Prescription.doctor),
    ).filter(Prescription.id == presc_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Prescription not found")
    return p


@router.post("", response_model=PrescriptionOut)
def create_prescription(
    data: PrescriptionCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    presc = Prescription(**data.model_dump())
    db.add(presc)
    db.commit()
    db.refresh(presc)
    return db.query(Prescription).options(
        joinedload(Prescription.patient),
        joinedload(Prescription.doctor),
    ).filter(Prescription.id == presc.id).first()
