"""
Seed demo data into the database.
Run once on first startup if tables are empty.
"""
from sqlalchemy.orm import Session
from app.models.models import Doctor, Patient, User, Pharmacy, Medicine, Appointment, Notification, SymptomLog
from datetime import datetime, timedelta
import uuid, random


DOCTORS = [
    {"name": "Dr. Rajesh Sharma", "specialization": "Cardiologist", "department": "Cardiology", "phone": "9876501001", "qualification": "MD, DM Cardiology", "experience_years": 14, "available_status": True},
    {"name": "Dr. Priya Patel",   "specialization": "Pediatrician", "department": "Pediatrics", "phone": "9876501002", "qualification": "MD Pediatrics",      "experience_years": 9,  "available_status": True},
    {"name": "Dr. Amit Singh",    "specialization": "General Physician", "department": "General Medicine", "phone": "9876501003", "qualification": "MBBS, MD", "experience_years": 11, "available_status": True},
    {"name": "Dr. Sunita Verma",  "specialization": "Gynecologist", "department": "Gynecology", "phone": "9876501004", "qualification": "MS Gynecology",       "experience_years": 13, "available_status": False},
    {"name": "Dr. Mohan Kumar",   "specialization": "Orthopedist",  "department": "Orthopedics","phone": "9876501005", "qualification": "MS Orthopedics",       "experience_years": 8,  "available_status": True},
    {"name": "Dr. Kavita Rao",    "specialization": "Dermatologist","department": "Dermatology","phone": "9876501006", "qualification": "MD Dermatology",       "experience_years": 6,  "available_status": True},
]

PATIENTS = [
    {"name": "Gurpreet Singh",  "phone": "9876500001", "blood_group": "B+", "age": 52, "village": "Nabha", "address": "Village Nabha, Punjab"},
    {"name": "Manpreet Kaur",   "phone": "9876500002", "blood_group": "O+", "age": 34, "village": "Sanaur","address": "Sanaur, Patiala"},
    {"name": "Jaspreet Singh",  "phone": "9876500003", "blood_group": "A+", "age": 28, "village": "Bhadson","address": "Bhadson, Punjab"},
    {"name": "Harpreet Kaur",   "phone": "9876500004", "blood_group": "AB+","age": 45, "village": "Lohat Badi","address": "Lohat Badi, Punjab"},
    {"name": "Paramjit Singh",  "phone": "9876500005", "blood_group": "A-", "age": 19, "village": "Nabha", "address": "Civil Lines, Nabha"},
]

PHARMACIES = [
    {"name": "Civil Hospital Pharmacy",  "location_lat": 30.3752, "location_lng": 76.1544, "contact": "9876502001", "address": "Civil Hospital, Nabha"},
    {"name": "Nabha City Medical Store", "location_lat": 30.3762, "location_lng": 76.1560, "contact": "9876502002", "address": "Main Bazaar, Nabha"},
    {"name": "Patiala Road Pharma",      "location_lat": 30.3740, "location_lng": 76.1520, "contact": "9876502003", "address": "Patiala Road, Nabha"},
]

MEDICINES = [
    ("Paracetamol 500mg", "Analgesic",     "available", 240, 2.5),
    ("Amoxicillin 250mg", "Antibiotic",    "available", 180, 8.0),
    ("Metformin 500mg",   "Antidiabetic",  "low",       30,  5.0),
    ("Amlodipine 5mg",    "Antihypertensive","available",120, 4.5),
    ("Omeprazole 20mg",   "Antacid",       "available", 200, 3.5),
    ("Azithromycin 500mg","Antibiotic",    "low",       20,  25.0),
    ("Ibuprofen 400mg",   "NSAID",         "available", 150, 3.0),
    ("Cetirizine 10mg",   "Antihistamine", "available", 100, 2.0),
    ("Insulin (Regular)", "Antidiabetic",  "out",       0,   85.0),
    ("Dolo 650mg",        "Analgesic",     "available", 300, 3.0),
]


def already_seeded(db: Session) -> bool:
    return db.query(Doctor).count() > 0


def run_seed(db: Session):
    if already_seeded(db):
        return

    # Seed doctors
    doctor_objs = []
    for d in DOCTORS:
        doc = Doctor(**d)
        db.add(doc)
        doctor_objs.append(doc)
    db.commit()
    for doc in doctor_objs:
        db.refresh(doc)

    # Seed patients + users
    patient_objs = []
    for p_data in PATIENTS:
        qr_id = f"QR-{uuid.uuid4().hex[:8].upper()}"
        patient = Patient(**p_data, qr_id=qr_id, language_pref="pa")
        db.add(patient)
        patient_objs.append(patient)
    db.commit()
    for p in patient_objs:
        db.refresh(p)

    # Create users for each patient
    patient_users = []
    for p in patient_objs:
        u = User(phone=p.phone, role="patient", name=p.name, ref_id=p.id)
        db.add(u)
        patient_users.append(u)

    # Demo ASHA user
    asha_user = User(phone="9876503001", role="asha", name="Sunita ASHA Worker")
    db.add(asha_user)

    # Demo admin user
    admin_user = User(phone="9876503002", role="admin", name="Civil Hospital Admin")
    db.add(admin_user)

    # Demo pharmacy user
    pharma_user = User(phone="9876503003", role="pharmacy", name="Civil Hospital Pharmacy")
    db.add(pharma_user)

    # Demo doctor user (maps to doctor 1)
    doc_user = User(phone="9876501001", role="doctor", name="Dr. Rajesh Sharma", ref_id=doctor_objs[0].id)
    db.add(doc_user)

    db.commit()
    for u in patient_users:
        db.refresh(u)
    db.refresh(asha_user)
    db.refresh(admin_user)

    # Seed pharmacies + medicines
    pharma_objs = []
    for ph in PHARMACIES:
        pharmacy = Pharmacy(**ph)
        db.add(pharmacy)
        pharma_objs.append(pharmacy)
    db.commit()
    for ph in pharma_objs:
        db.refresh(ph)

    med_idx = 0
    for ph in pharma_objs:
        for i in range(3):
            if med_idx >= len(MEDICINES):
                break
            name, cat, stock, qty, price = MEDICINES[med_idx]
            med = Medicine(
                pharmacy_id=ph.id, name=name, category=cat,
                stock_status=stock, quantity=qty, price=price,
            )
            db.add(med)
            med_idx += 1
    # Add remaining to first pharmacy
    while med_idx < len(MEDICINES):
        name, cat, stock, qty, price = MEDICINES[med_idx]
        med = Medicine(
            pharmacy_id=pharma_objs[0].id, name=name, category=cat,
            stock_status=stock, quantity=qty, price=price,
        )
        db.add(med)
        med_idx += 1
    db.commit()

    # Seed appointments
    now = datetime.utcnow()
    appointment_data = [
        (patient_objs[0].id, doctor_objs[0].id, now + timedelta(hours=2),   "video",      "Scheduled",  "High"),
        (patient_objs[1].id, doctor_objs[1].id, now + timedelta(hours=5),   "in_person",  "Scheduled",  "Moderate"),
        (patient_objs[2].id, doctor_objs[2].id, now - timedelta(days=1),    "audio",      "Completed",  "Mild"),
        (patient_objs[3].id, doctor_objs[3].id, now - timedelta(days=2),    "in_person",  "Cancelled",  "Moderate"),
        (patient_objs[4].id, doctor_objs[4].id, now - timedelta(days=3),    "in_person",  "Missed",     "Mild"),
        (patient_objs[0].id, doctor_objs[2].id, now + timedelta(days=1),    "video",      "Scheduled",  "High"),
        (patient_objs[1].id, doctor_objs[5].id, now + timedelta(days=2),    "in_person",  "Scheduled",  "Mild"),
    ]
    appt_objs = []
    for pid, did, dt, mode, status, priority in appointment_data:
        a = Appointment(
            patient_id=pid, doctor_id=did, datetime=dt,
            mode=mode, status=status, priority_level=priority
        )
        db.add(a)
        appt_objs.append(a)
    db.commit()

    # Seed symptom logs
    symptom_data = [
        (patient_objs[0].id, "chest pain, shortness of breath, arm pain", "High", "Cardiologist"),
        (patient_objs[1].id, "fever, headache, vomiting", "Moderate", "General Physician"),
        (patient_objs[2].id, "mild cough, runny nose", "Mild", "General Physician"),
        (patient_objs[3].id, "severe abdominal pain, nausea", "Moderate", "Gastroenterologist"),
        (patient_objs[4].id, "mild headache, sneezing", "Mild", "General Physician"),
    ]
    for pid, symp, risk, spec in symptom_data:
        log = SymptomLog(patient_id=pid, symptoms=symp, risk_level=risk, suggested_specialization=spec,
                         recommendation="Book appointment with " + spec)
        db.add(log)
    db.commit()

    # Seed notifications for patient users
    notif_data = [
        (patient_users[0].id, "appointment_reminder", "Reminder: Your appointment with Dr. Rajesh Sharma is in 2 hours.", False),
        (patient_users[0].id, "medicine_refill",      "Your Metformin prescription is due for refill.", True),
        (patient_users[1].id, "appointment_reminder", "Your appointment with Dr. Priya Patel is scheduled for today.", False),
        (patient_users[1].id, "health_camp",          "Health Camp in Sanaur on Sunday. ASHA will assist you.", False),
        (patient_users[2].id, "appointment_update",   "Appointment #3 has been marked as Completed.", True),
    ]
    for uid, ntype, msg, is_read in notif_data:
        n = Notification(user_id=uid, type=ntype, message=msg, is_read=is_read)
        db.add(n)
    db.commit()

    print("✅ Demo data seeded successfully.")
