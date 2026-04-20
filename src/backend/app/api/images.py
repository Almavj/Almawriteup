from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os

from ..core.database import get_db
from ..core.security import get_current_admin
from ..schemas.schemas import ImageResponse, ResultOk
from ..services import image_service
from ..core.config import get_settings

settings = get_settings()
router = APIRouter()


@router.post("/upload", response_model=dict)
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _: bool = Depends(get_current_admin),
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    contents = await file.read()

    if len(contents) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds maximum of {settings.MAX_FILE_SIZE} bytes",
        )

    try:
        main_filename, main_path, thumb_path = image_service.process_image(
            contents, file.filename
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to process image")

    image = image_service.create_image_record(main_filename, file.content_type, db)

    return {"url": image.url}


@router.get("/", response_model=list[ImageResponse])
async def list_images(
    db: Session = Depends(get_db), _: bool = Depends(get_current_admin)
):
    return image_service.list_images(db)


@router.delete("/{filename}", response_model=ResultOk)
async def delete_image(
    filename: str, db: Session = Depends(get_db), _: bool = Depends(get_current_admin)
):
    if not image_service.delete_image(filename, db):
        raise HTTPException(status_code=404, detail="Image not found")
    return ResultOk(ok=None)


@router.post("/upload-file", response_model=dict)
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _: bool = Depends(get_current_admin),
):
    """Upload a challenge file (any file type - zip, binary, etc.)"""
    contents = await file.read()

    if len(contents) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds maximum of {settings.MAX_FILE_SIZE} bytes",
        )

    # Generate unique filename
    import uuid
    from datetime import datetime
    
    unique_id = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{uuid.uuid4().hex[:8]}"
    safe_filename = "".join(c if c.isalnum() or c in "._-" else "_" for c in file.filename)
    final_filename = f"{unique_id}_{safe_filename}"
    
    file_path = os.path.join(settings.UPLOAD_DIR, "files", final_filename)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, "wb") as f:
        f.write(contents)

    url = f"/uploads/files/{final_filename}"
    return {"url": url, "filename": final_filename}
