from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..core.security import create_access_token, verify_password, get_current_admin, get_password_hash
from ..schemas.schemas import Token, LoginRequest, ResultOk, ClaimResponse
from ..services import admin_service
from ..models.models import Admin

router = APIRouter()


@router.post("/login", response_model=Token)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    if not admin_service.verify_admin_password(request.password, db):
        raise HTTPException(status_code=401, detail="Invalid password")

    access_token = create_access_token(data={"admin": True})
    return Token(access_token=access_token, token_type="bearer")


@router.post("/claim", response_model=ClaimResponse)
async def claim_admin(request: LoginRequest, db: Session = Depends(get_db)):
    if admin_service.has_admin(db):
        raise HTTPException(status_code=400, detail="Admin already claimed")

    admin_service.create_admin(request.password, db)
    access_token = create_access_token(data={"admin": True})
    return ClaimResponse(access_token=access_token, token_type="bearer")


@router.get("/status", response_model=dict)
async def admin_status(_: bool = Depends(get_current_admin)):
    return {"isAdmin": True}

@router.get("/debug-password")
async def debug_password():
    from ..core.config import get_settings
    settings = get_settings()
    password = settings.ADMIN_PASSWORD
    return {
        "password_length": len(password),
        "password_first_10_chars": password[:10] if password else "None",
        "password_exists": bool(password),
        "password_from_env": password
    }


fix_router = APIRouter(prefix="/fix", tags=["fix"])

@fix_router.post("/reset-admin")
async def force_reset_admin(db: Session = Depends(get_db)):
    """
    FORCE RESET ADMIN - Deletes existing admin and creates a new one.
    Use this if you're locked out.
    """
    try:
        # 1. Delete any existing admin(s)
        db.query(Admin).delete()
        db.commit()

        # 2. Create a new admin with a known, simple password
        new_password = "admin123"  # Change this to a password you want
        hashed_pw = get_password_hash(new_password)

        new_admin = Admin(password_hash=hashed_pw)
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)

        return {
            "status": "success",
            "message": f"Admin account has been reset.",
            "new_password": new_password,
            "admin_id": new_admin.id
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Reset failed: {str(e)}")