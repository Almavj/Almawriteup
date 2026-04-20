from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os

from ..core.database import get_db
from ..core.security import get_current_admin
from ..core.config import get_settings
from ..schemas.schemas import (
    ChallengeFileResponse,
    ChallengeFileUploadResponse,
    ResultOk,
)
from ..services import challenge_file_service

settings = get_settings()
router = APIRouter()


@router.post("/upload/{writeup_id}", response_model=ChallengeFileUploadResponse)
async def upload_challenge_file(
    writeup_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _: bool = Depends(get_current_admin),
):
    """Upload a challenge file associated with a specific writeup"""
    from ..services import writeup_service

    writeup = writeup_service.find_by_id(writeup_id, db)
    if not writeup:
        raise HTTPException(status_code=404, detail="Writeup not found")

    contents = await file.read()

    if len(contents) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds maximum of {settings.MAX_FILE_SIZE} bytes",
        )

    try:
        filename, url = challenge_file_service.process_challenge_file(
            contents, file.filename
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to process file")

    db_file = challenge_file_service.create_challenge_file(
        filename, file.filename, url, writeup_id, db
    )

    return ChallengeFileUploadResponse(
        filename=db_file.filename,
        original_name=db_file.original_name,
        url=db_file.url,
    )


@router.get("/writeup/{writeup_id}", response_model=List[ChallengeFileResponse])
async def list_challenge_files(
    writeup_id: int,
    db: Session = Depends(get_db),
):
    """List all challenge files for a writeup"""
    return challenge_file_service.list_by_writeup(writeup_id, db)


@router.delete("/{file_id}", response_model=ResultOk)
async def delete_challenge_file(
    file_id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(get_current_admin),
):
    """Delete a challenge file"""
    if not challenge_file_service.delete_file(file_id, db):
        raise HTTPException(status_code=404, detail="File not found")
    return ResultOk(ok=None)
