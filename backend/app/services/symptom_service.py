"""
AI Risk Engine — Rule-based symptom classification.
Keyword matching → risk level + recommendation + specialization.
No ML model dependency — always works offline.
"""

from sqlalchemy.orm import Session
from app.models.models import SymptomLog
from app.schemas.schemas import SymptomAnalyzeRequest, SymptomAnalyzeResponse
from typing import List, Tuple

# ── Symptom → Risk Rules ──────────────────────────────────────────────────────

HIGH_RISK_KEYWORDS = [
    "chest pain", "severe headache", "difficulty breathing", "shortness of breath",
    "loss of consciousness", "unconscious", "heart attack", "stroke", "severe bleeding",
    "very high fever", "convulsion", "seizure", "paralysis", "cannot breathe",
    "blood in urine", "blood in stool", "severe chest", "pressure in chest",
    "arm pain", "jaw pain", "extreme fatigue", "sudden numbness", "slurred speech",
    "vision loss", "severe abdominal pain", "fainting", "collapse",
]

MODERATE_RISK_KEYWORDS = [
    "fever", "headache", "vomiting", "dizziness", "abdominal pain", "stomach pain",
    "cough", "fatigue", "weakness", "nausea", "joint pain", "back pain",
    "throat pain", "ear pain", "skin rash", "swelling", "high temperature",
    "loose motion", "diarrhea", "body ache", "chest tightness", "breathlessness",
    "painful urination", "burning urination", "irregular heartbeat", "palpitation",
    "dehydration", "pale", "yellowish skin", "jaundice", "infection",
]

MILD_RISK_KEYWORDS = [
    "cold", "runny nose", "slight fever", "sore throat", "mild cough", "sneezing",
    "mild headache", "mild fatigue", "indigestion", "constipation", "mild diarrhea",
    "eye irritation", "mild rash", "dry skin", "dandruff", "mild allergy",
    "mild pain", "stiffness", "bloating", "acidity", "gas", "flatulence",
    "minor cut", "bruise", "insomnia", "anxiety", "stress",
]

# ── Symptom → Specialization ──────────────────────────────────────────────────

SPECIALIZATION_MAP = {
    "chest": "Cardiologist",
    "heart": "Cardiologist",
    "breathing": "Pulmonologist",
    "lungs": "Pulmonologist",
    "cough": "Pulmonologist",
    "headache": "Neurologist",
    "seizure": "Neurologist",
    "paralysis": "Neurologist",
    "stroke": "Neurologist",
    "skin": "Dermatologist",
    "rash": "Dermatologist",
    "eye": "Ophthalmologist",
    "ear": "ENT Specialist",
    "throat": "ENT Specialist",
    "nose": "ENT Specialist",
    "stomach": "Gastroenterologist",
    "abdominal": "Gastroenterologist",
    "diarrhea": "Gastroenterologist",
    "vomiting": "Gastroenterologist",
    "joint": "Orthopedist",
    "bone": "Orthopedist",
    "back pain": "Orthopedist",
    "urine": "Urologist",
    "kidney": "Nephrologist",
    "sugar": "Endocrinologist",
    "diabetes": "Endocrinologist",
    "thyroid": "Endocrinologist",
    "child": "Pediatrician",
    "baby": "Pediatrician",
    "pregnancy": "Gynecologist",
    "period": "Gynecologist",
    "mental": "Psychiatrist",
    "depression": "Psychiatrist",
    "anxiety": "Psychiatrist",
}


def _extract_matched_symptoms(text: str, keywords: List[str]) -> List[str]:
    text_lower = text.lower()
    return [kw for kw in keywords if kw in text_lower]


def _determine_specialization(text: str) -> str:
    text_lower = text.lower()
    for keyword, spec in SPECIALIZATION_MAP.items():
        if keyword in text_lower:
            return spec
    return "General Medicine"


def _build_recommendation(risk_level: str, specialization: str) -> str:
    if risk_level == "High":
        return (
            f"⚠️ Urgent: Seek immediate medical attention at Civil Hospital Nabha. "
            f"Visit Emergency or {specialization} department without delay. "
            "Call 108 if you cannot travel."
        )
    elif risk_level == "Moderate":
        return (
            f"Book an appointment with a {specialization} within 24–48 hours. "
            "Monitor your symptoms closely. If symptoms worsen, visit emergency immediately."
        )
    else:
        return (
            f"Schedule a routine visit to {specialization} at your convenience. "
            "Rest, stay hydrated, and take OTC medication as appropriate. "
            "Return if symptoms persist beyond 3 days."
        )


def analyze_symptoms(db: Session, request: SymptomAnalyzeRequest) -> SymptomAnalyzeResponse:
    text = request.symptoms

    high_matched = _extract_matched_symptoms(text, HIGH_RISK_KEYWORDS)
    moderate_matched = _extract_matched_symptoms(text, MODERATE_RISK_KEYWORDS)
    mild_matched = _extract_matched_symptoms(text, MILD_RISK_KEYWORDS)

    if high_matched:
        risk_level = "High"
        symptoms_detected = high_matched
    elif moderate_matched:
        risk_level = "Moderate"
        symptoms_detected = moderate_matched
    elif mild_matched:
        risk_level = "Mild"
        symptoms_detected = mild_matched
    else:
        risk_level = "Mild"
        symptoms_detected = []

    specialization = _determine_specialization(text)
    recommendation = _build_recommendation(risk_level, specialization)

    # Persist to DB
    log = SymptomLog(
        patient_id=request.patient_id,
        symptoms=text,
        risk_level=risk_level,
        recommendation=recommendation,
        suggested_specialization=specialization,
    )
    db.add(log)
    db.commit()

    return SymptomAnalyzeResponse(
        risk_level=risk_level,
        recommendation=recommendation,
        suggested_specialization=specialization,
        symptoms_detected=symptoms_detected,
    )


def get_symptom_history(db: Session, patient_id: int):
    return (
        db.query(SymptomLog)
        .filter(SymptomLog.patient_id == patient_id)
        .order_by(SymptomLog.timestamp.desc())
        .limit(10)
        .all()
    )
