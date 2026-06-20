from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import create_access_token, get_current_user
from app.core.config import settings
from app.repositories import auth_repo
from app.schemas.schemas import SendOtpRequest, VerifyOtpRequest, TokenResponse, MessageResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/send-otp", response_model=MessageResponse)
def send_otp(request: SendOtpRequest, db: Session = Depends(get_db)):
    if len(request.phone) < 10:
        raise HTTPException(status_code=400, detail="Invalid phone number")

    otp = auth_repo.create_otp(db, request.phone)

    if settings.USE_TWILIO:
        try:
            from twilio.rest import Client
            client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            client.messages.create(
                body=f"eSEHAT Nabha OTP: {otp}. Valid for 5 minutes.",
                from_=settings.TWILIO_PHONE_NUMBER,
                to=f"+91{request.phone}",
            )
            return MessageResponse(message="OTP sent via SMS")
        except Exception as e:
            return MessageResponse(message=f"Demo mode — use OTP: {settings.DEMO_OTP}")
    else:
        return MessageResponse(message=f"Demo mode — use OTP: {settings.DEMO_OTP}")


@router.post("/verify-otp", response_model=TokenResponse)
def verify_otp(request: VerifyOtpRequest, db: Session = Depends(get_db)):
    valid = auth_repo.verify_otp(db, request.phone, request.otp)
    if not valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired OTP",
        )

    user = auth_repo.get_or_create_user(
        db, request.phone, request.role, request.name or ""
    )
    token_data = {
        "sub": str(user.id),
        "phone": user.phone,
        "role": user.role,
        "name": user.name,
        "ref_id": user.ref_id,
    }
    token = create_access_token(token_data)
    return TokenResponse(
        access_token=token,
        role=user.role,
        user_id=user.id,
        name=user.name,
        ref_id=user.ref_id,
    )


@router.post("/logout", response_model=MessageResponse)
def logout(current_user: dict = Depends(get_current_user)):
    # JWT is stateless; client discards token
    return MessageResponse(message="Logged out successfully")


@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
