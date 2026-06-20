from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.services.symptom_service import analyze_symptoms, get_symptom_history
from app.schemas.schemas import SymptomAnalyzeRequest, SymptomAnalyzeResponse
from typing import List

router = APIRouter(prefix="/api/symptom", tags=["symptom"])


@router.post("/analyze", response_model=SymptomAnalyzeResponse)
def analyze(
    request: SymptomAnalyzeRequest,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return analyze_symptoms(db, request)


@router.get("/history/{patient_id}")
def history(patient_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    logs = get_symptom_history(db, patient_id)
    return [
        {
            "id": l.id,
            "symptoms": l.symptoms,
            "risk_level": l.risk_level,
            "recommendation": l.recommendation,
            "suggested_specialization": l.suggested_specialization,
            "timestamp": l.timestamp,
        }
        for l in logs
    ]
