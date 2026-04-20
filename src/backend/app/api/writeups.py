from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from typing import Optional
import re

from ..core.database import get_db
from ..core.security import get_current_admin, get_optional_admin
from ..core.config import get_settings
from ..schemas.schemas import (
    WriteupCreate,
    WriteupUpdate,
    WriteupResponse,
    PagedWriteups,
    ResultOk,
    ResultOkId,
    ResultErr,
)
from ..services import writeup_service

settings = get_settings()

router = APIRouter()
security = HTTPBearer(auto_error=False)


# Specific routes must come BEFORE /{id} to avoid path parameter conflicts
@router.get("/all", response_model=list[WriteupResponse])
async def list_all_writeups(
    db: Session = Depends(get_db), _: bool = Depends(get_current_admin)
):
    return writeup_service.list_all(db)


@router.get("/published", response_model=list[WriteupResponse])
async def list_all_published_writeups(db: Session = Depends(get_db)):
    return writeup_service.list_all_published(db)


@router.get("/search", response_model=list[WriteupResponse])
async def search_writeups(q: str, db: Session = Depends(get_db)):
    return writeup_service.search(q, db)


@router.get("/category/{category}", response_model=list[WriteupResponse])
async def get_writeups_by_category(category: str, db: Session = Depends(get_db)):
    return writeup_service.by_category(category, db)


@router.get("/tag/{tag}", response_model=list[WriteupResponse])
async def get_writeups_by_tag(tag: str, db: Session = Depends(get_db)):
    return writeup_service.by_tag(tag, db)


@router.get("/related/{id}", response_model=list[WriteupResponse])
async def get_related_writeups(id: int, limit: int = 5, db: Session = Depends(get_db)):
    return writeup_service.related(id, limit, db)


@router.get("/tags", response_model=list[str])
async def get_all_tags(db: Session = Depends(get_db)):
    return writeup_service.all_tags(db)


@router.post("", response_model=ResultOkId)
async def create_writeup(
    input: WriteupCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(get_current_admin),
):
    if not input.title:
        raise HTTPException(status_code=400, detail="Title is required")

    if len(input.content) > settings.MAX_CONTENT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Content exceeds maximum length of {settings.MAX_CONTENT_LENGTH}",
        )

    if input.slug:
        if not re.match(r"^[a-z0-9-]+$", input.slug):
            raise HTTPException(
                status_code=400,
                detail="Slug must contain only lowercase letters, numbers, and hyphens",
            )
        if writeup_service.slug_exists(input.slug, db):
            raise HTTPException(status_code=400, detail="Slug already exists")

    if input.tags and len(input.tags) > 20:
        raise HTTPException(status_code=400, detail="Maximum 20 tags allowed")

    writeup = writeup_service.create_writeup(input, db)
    return ResultOkId(ok=writeup.id)


@router.put("/{id}", response_model=ResultOk)
async def update_writeup(
    id: int,
    input: WriteupUpdate,
    db: Session = Depends(get_db),
    _: bool = Depends(get_current_admin),
):
    if input.slug and writeup_service.slug_exists(input.slug, db, exclude_id=id):
        raise HTTPException(status_code=400, detail="Slug already exists")

    writeup = writeup_service.update_writeup(id, input, db)
    if not writeup:
        raise HTTPException(status_code=404, detail="Writeup not found")
    return ResultOk(ok=None)


@router.delete("/{id}", response_model=ResultOk)
async def delete_writeup(
    id: int, db: Session = Depends(get_db), _: bool = Depends(get_current_admin)
):
    if not writeup_service.delete_writeup(id, db):
        raise HTTPException(status_code=404, detail="Writeup not found")
    return ResultOk(ok=None)


@router.get("/{id}", response_model=Optional[WriteupResponse])
async def get_writeup(
    id: int,
    db: Session = Depends(get_db),
    admin: Optional[bool] = Depends(get_optional_admin),
):
    writeup = writeup_service.find_by_id(id, db)
    if not writeup:
        raise HTTPException(status_code=404, detail="Writeup not found")
    if writeup.draft and not admin:
        raise HTTPException(status_code=404, detail="Writeup not found")
    return writeup


@router.get("/slug/{slug}", response_model=Optional[WriteupResponse])
async def get_writeup_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    admin: Optional[bool] = Depends(get_optional_admin),
):
    writeup = writeup_service.find_by_slug(slug, db)
    if not writeup:
        raise HTTPException(status_code=404, detail="Writeup not found")
    if writeup.draft and not admin:
        raise HTTPException(status_code=404, detail="Writeup not found")
    return writeup


@router.get("", response_model=PagedWriteups)
async def list_published_writeups(
    page: int = 1, page_size: int = 10, db: Session = Depends(get_db)
):
    writeups, total = writeup_service.list_published(page, page_size, db)
    return PagedWriteups(total=total, writeups=writeups)
