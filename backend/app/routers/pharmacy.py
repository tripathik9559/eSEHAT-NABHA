from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.repositories import pharmacy_repo
from app.schemas.schemas import PharmacyOut, MedicineOut, MedicineStockUpdate
from typing import List, Optional

router = APIRouter(prefix="/api/pharmacy", tags=["pharmacy"])


@router.get("", response_model=List[PharmacyOut])
def list_pharmacies(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return pharmacy_repo.list_pharmacies(db)


@router.get("/medicines", response_model=List[MedicineOut])
def list_medicines(
    search: Optional[str] = None,
    pharmacy_id: Optional[int] = None,
    stock_status: Optional[str] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return pharmacy_repo.list_medicines(db, search, pharmacy_id, stock_status)


@router.put("/medicines/{medicine_id}/stock", response_model=MedicineOut)
def update_stock(
    medicine_id: int,
    data: MedicineStockUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    med = pharmacy_repo.update_stock(db, medicine_id, data)
    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return med
