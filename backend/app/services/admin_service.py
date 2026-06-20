from sqlalchemy.orm import Session
from sqlalchemy import func, text
from app.models.models import Patient, Appointment, SymptomLog, Doctor
from app.repositories.doctor_repo import get_doctor_workload
from datetime import date, timedelta
from typing import List


def get_analytics(db: Session) -> dict:
    total_patients = db.query(func.count(Patient.id)).scalar()
    total_appointments = db.query(func.count(Appointment.id)).scalar()
    today = date.today()
    appointments_today = db.query(func.count(Appointment.id)).filter(
        func.date(Appointment.datetime) == today
    ).scalar()

    high_risk = db.query(func.count(SymptomLog.id)).filter(
        SymptomLog.risk_level == "High"
    ).scalar()

    doctor_utilization = get_doctor_workload(db)

    # Disease trend: top symptoms from last 30 days
    thirty_ago = date.today() - timedelta(days=30)
    symptom_logs = (
        db.query(SymptomLog)
        .filter(func.date(SymptomLog.timestamp) >= thirty_ago)
        .all()
    )

    # Count risk levels for trend
    risk_counts = {"High": 0, "Moderate": 0, "Mild": 0}
    for log in symptom_logs:
        risk_counts[log.risk_level] = risk_counts.get(log.risk_level, 0) + 1

    disease_trends = [
        {"label": k, "count": v} for k, v in risk_counts.items()
    ]

    # Village demand stats from patients
    village_stats_raw = (
        db.query(Patient.village, func.count(Patient.id).label("count"))
        .filter(Patient.village != "")
        .group_by(Patient.village)
        .order_by(func.count(Patient.id).desc())
        .limit(10)
        .all()
    )
    village_stats = [{"village": r.village, "count": r.count} for r in village_stats_raw]

    # Weekly appointment trend (last 7 days)
    weekly = []
    for i in range(6, -1, -1):
        d = date.today() - timedelta(days=i)
        cnt = db.query(func.count(Appointment.id)).filter(
            func.date(Appointment.datetime) == d
        ).scalar()
        weekly.append({"date": d.strftime("%a"), "count": cnt})

    return {
        "total_patients": total_patients,
        "total_appointments": total_appointments,
        "appointments_today": appointments_today,
        "high_risk_patients": high_risk,
        "doctor_utilization": doctor_utilization,
        "disease_trends": disease_trends,
        "village_stats": village_stats,
        "weekly_trend": weekly,
    }
