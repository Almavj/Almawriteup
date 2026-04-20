from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..core.security import create_access_token, verify_password, get_current_admin
from ..schemas.schemas import Token, LoginRequest, ResultOk, ClaimResponse
from ..services import admin_service

router = APIRouter()


@router.post("/login", response_model=Token)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    if not admin_service.verify_admin_password(request.password, db):
        raise HTTPException(status_code=401, detail="Invalid password")

    access_token = create_access_token(data={"admin": True})
    return Token(access_token=access_token, token_type="bearer")


@router.post("/claim", response_model=ClaimResponse)
async def claim_admin(db: Session = Depends(get_db)):
    if admin_service.has_admin(db):
        raise HTTPException(status_code=400, detail="Admin already claimed")

    admin_service.create_default_admin(db)
    access_token = create_access_token(data={"admin": True})
    return ClaimResponse(access_token=access_token, token_type="bearer")


@router.get("/status", response_model=dict)
async def admin_status(_: bool = Depends(get_current_admin)):
    return {"isAdmin": True}
