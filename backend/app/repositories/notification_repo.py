from sqlalchemy.orm import Session
from app.models.models import Notification, HealthCamp
from app.schemas.schemas import SendNotificationRequest, HealthCampCreate
from typing import List, Optional


def get_notifications(db: Session, user_id: int) -> List[Notification]:
    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .limit(50)
        .all()
    )


def mark_read(db: Session, notif_id: int, user_id: int) -> bool:
    notif = db.query(Notification).filter(
        Notification.id == notif_id, Notification.user_id == user_id
    ).first()
    if not notif:
        return False
    notif.is_read = True
    db.commit()
    return True


def mark_all_read(db: Session, user_id: int):
    db.query(Notification).filter(
        Notification.user_id == user_id, Notification.is_read == False
    ).update({"is_read": True})
    db.commit()


def send_notification(db: Session, data: SendNotificationRequest) -> Notification:
    notif = Notification(**data.model_dump())
    db.add(notif)
    db.commit()
    db.refresh(notif)
    return notif


def count_unread(db: Session, user_id: int) -> int:
    return db.query(Notification).filter(
        Notification.user_id == user_id, Notification.is_read == False
    ).count()


# Health Camps
def list_health_camps(db: Session, asha_id: Optional[int] = None) -> List[HealthCamp]:
    q = db.query(HealthCamp)
    if asha_id:
        q = q.filter(HealthCamp.asha_id == asha_id)
    return q.order_by(HealthCamp.scheduled_date.desc()).all()


def create_health_camp(db: Session, data: HealthCampCreate) -> HealthCamp:
    camp = HealthCamp(**data.model_dump())
    db.add(camp)
    db.commit()
    db.refresh(camp)
    return camp


def update_camp_status(db: Session, camp_id: int, status: str, attendees: Optional[int] = None) -> Optional[HealthCamp]:
    camp = db.query(HealthCamp).filter(HealthCamp.id == camp_id).first()
    if not camp:
        return None
    camp.status = status
    if attendees is not None:
        camp.attendees = attendees
    db.commit()
    db.refresh(camp)
    return camp
