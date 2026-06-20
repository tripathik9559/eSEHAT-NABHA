from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.services.admin_service import get_analytics
from app.repositories.doctor_repo import get_doctor_workload
from app.repositories.notification_repo import list_health_camps, create_health_camp, update_camp_status
from app.schemas.schemas import HealthCampCreate, HealthCampOut
from typing import List, Optional

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get("/analytics")
def analytics(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_analytics(db)


@router.get("/doctors/workload")
def workload(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_doctor_workload(db)


@router.get("/village/stats")
def village_stats(db: Session = Depends(get_db), _=Depends(get_current_user)):
    data = get_analytics(db)
    return data.get("village_stats", [])


# Health Camps (ASHA + Admin shared)
@router.get("/camps", response_model=List[HealthCampOut])
def list_camps(
    asha_id: Optional[int] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return list_health_camps(db, asha_id)


@router.post("/camps", response_model=HealthCampOut)
def create_camp(
    data: HealthCampCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return create_health_camp(db, data)


@router.put("/camps/{camp_id}/status")
def update_camp(
    camp_id: int,
    status: str,
    attendees: Optional[int] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    camp = update_camp_status(db, camp_id, status, attendees)
    if not camp:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Camp not found")
    return camp
