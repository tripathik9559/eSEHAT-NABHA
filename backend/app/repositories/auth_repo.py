from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.models.models import OtpLog, User, Patient
from app.core.config import settings
import random
import uuid


def create_otp(db: Session, phone: str) -> str:
    if settings.USE_TWILIO:
        otp = str(random.randint(100000, 999999))
    else:
        otp = settings.DEMO_OTP

    # Invalidate old OTPs for this phone
    db.query(OtpLog).filter(
        OtpLog.phone == phone, OtpLog.used == False
    ).update({"used": True})

    expires_at = datetime.utcnow() + timedelta(minutes=5)
    otp_log = OtpLog(phone=phone, otp=otp, expires_at=expires_at)
    db.add(otp_log)
    db.commit()
    return otp


def verify_otp(db: Session, phone: str, otp: str) -> bool:
    record = (
        db.query(OtpLog)
        .filter(
            OtpLog.phone == phone,
            OtpLog.otp == otp,
            OtpLog.used == False,
            OtpLog.expires_at > datetime.utcnow(),
        )
        .order_by(OtpLog.created_at.desc())
        .first()
    )
    if not record:
        return False
    record.used = True
    db.commit()
    return True


def get_or_create_user(db: Session, phone: str, role: str, name: str = "") -> User:
    user = db.query(User).filter(User.phone == phone, User.role == role).first()
    if user:
        return user

    # Create patient record if role is patient
    ref_id = None
    if role == "patient":
        patient = db.query(Patient).filter(Patient.phone == phone).first()
        if not patient:
            qr_id = f"QR-{uuid.uuid4().hex[:8].upper()}"
            patient = Patient(
                name=name or f"Patient {phone[-4:]}",
                phone=phone,
                qr_id=qr_id,
            )
            db.add(patient)
            db.commit()
            db.refresh(patient)
        ref_id = patient.id

    user = User(phone=phone, role=role, name=name or phone, ref_id=ref_id)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_id(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()
