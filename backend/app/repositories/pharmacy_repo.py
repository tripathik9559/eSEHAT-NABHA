from sqlalchemy.orm import Session, joinedload
from app.models.models import Pharmacy, Medicine
from app.schemas.schemas import MedicineStockUpdate
from typing import Optional, List


def list_pharmacies(db: Session) -> List[Pharmacy]:
    return db.query(Pharmacy).all()


def get_pharmacy(db: Session, pharmacy_id: int) -> Optional[Pharmacy]:
    return db.query(Pharmacy).filter(Pharmacy.id == pharmacy_id).first()


def list_medicines(
    db: Session,
    search: Optional[str] = None,
    pharmacy_id: Optional[int] = None,
    stock_status: Optional[str] = None,
) -> List[Medicine]:
    q = db.query(Medicine).options(joinedload(Medicine.pharmacy))
    if pharmacy_id:
        q = q.filter(Medicine.pharmacy_id == pharmacy_id)
    if stock_status:
        q = q.filter(Medicine.stock_status == stock_status)
    if search:
        q = q.filter(Medicine.name.ilike(f"%{search}%"))
    return q.order_by(Medicine.name).all()


def update_stock(db: Session, medicine_id: int, data: MedicineStockUpdate) -> Optional[Medicine]:
    med = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not med:
        return None
    med.stock_status = data.stock_status
    med.quantity = data.quantity
    db.commit()
    db.refresh(med)
    return med
