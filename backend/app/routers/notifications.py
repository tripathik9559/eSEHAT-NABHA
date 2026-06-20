from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.repositories import notification_repo
from app.schemas.schemas import NotificationOut, SendNotificationRequest, MessageResponse
from typing import List

router = APIRouter(prefix="/api/notifications", tags=["notifications"])


@router.get("", response_model=List[NotificationOut])
def get_notifications(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = int(current_user["sub"])
    return notification_repo.get_notifications(db, user_id)


@router.get("/unread-count")
def unread_count(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = int(current_user["sub"])
    return {"count": notification_repo.count_unread(db, user_id)}


@router.put("/{notif_id}/read", response_model=MessageResponse)
def mark_read(
    notif_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = int(current_user["sub"])
    notification_repo.mark_read(db, notif_id, user_id)
    return MessageResponse(message="Marked as read")


@router.put("/mark-all-read", response_model=MessageResponse)
def mark_all(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = int(current_user["sub"])
    notification_repo.mark_all_read(db, user_id)
    return MessageResponse(message="All notifications marked as read")


@router.post("/send", response_model=NotificationOut)
def send_notification(
    data: SendNotificationRequest,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return notification_repo.send_notification(db, data)
