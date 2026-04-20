import os
import uuid
import io
import asyncio
from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from PIL import Image as PILImage
from ..models.models import Image as ImageModel
from ..core.config import get_settings

settings = get_settings()


def ensure_upload_dirs():
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    os.makedirs(os.path.join(settings.UPLOAD_DIR, "thumbnails"), exist_ok=True)


def process_image(file_data: bytes, filename: str) -> tuple[str, str, str]:
    ensure_upload_dirs()

    unique_id = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{uuid.uuid4().hex[:8]}"
    safe_filename = "".join(c if c.isalnum() or c in "._-" else "_" for c in filename)

    main_filename = f"{unique_id}_{safe_filename}"
    thumb_filename = f"{unique_id}_thumb_{safe_filename}"

    main_path = os.path.join(settings.UPLOAD_DIR, main_filename)
    thumb_path = os.path.join(settings.UPLOAD_DIR, "thumbnails", thumb_filename)

    with PILImage.open(io.BytesIO(file_data)) as img:
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        original_width = img.width

        img.save(main_path, format="JPEG", quality=85)

        img_for_thumb = img.copy()
        thumb_size = (settings.THUMBNAIL_SIZE, settings.THUMBNAIL_SIZE)
        img_for_thumb.thumbnail(thumb_size, PILImage.Resampling.LANCZOS)
        img_for_thumb.save(thumb_path, format="JPEG", quality=80)

    if original_width > settings.MAX_IMAGE_WIDTH:
        with PILImage.open(main_path) as img:
            ratio = settings.MAX_IMAGE_WIDTH / original_width
            new_height = int(img.height * ratio)
            img = img.resize(
                (settings.MAX_IMAGE_WIDTH, new_height), PILImage.Resampling.LANCZOS
            )
            img.save(main_path, format="JPEG", quality=85)

    return main_filename, main_path, thumb_path


def create_image_record(filename: str, mime_type: str, db: Session) -> ImageModel:
    unique_id = filename.split("_")[0]
    thumb_filename = f"{unique_id}_thumb_{'_'.join(filename.split('_')[2:])}"

    url = f"/uploads/{filename}"
    thumbnail_url = f"/uploads/thumbnails/{thumb_filename}"

    db_image = ImageModel(
        filename=filename,
        url=url,
        thumbnail_url=thumbnail_url,
        mime_type=mime_type,
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image


def list_images(db: Session) -> List[ImageModel]:
    return db.query(ImageModel).order_by(ImageModel.uploaded_at.desc()).all()


def find_by_filename(filename: str, db: Session) -> Optional[ImageModel]:
    return db.query(ImageModel).filter(ImageModel.filename == filename).first()


def delete_image(filename: str, db: Session) -> bool:
    image = find_by_filename(filename, db)
    if not image:
        return False

    main_path = os.path.join(settings.UPLOAD_DIR, image.filename)
    unique_id = filename.split("_")[0]
    thumb_filename = f"{unique_id}_thumb_{'_'.join(filename.split('_')[2:])}"
    thumb_path = os.path.join(settings.UPLOAD_DIR, "thumbnails", thumb_filename)

    try:
        if os.path.exists(main_path):
            os.remove(main_path)
    except OSError:
        pass
    try:
        if os.path.exists(thumb_path):
            os.remove(thumb_path)
    except OSError:
        pass

    db.delete(image)
    db.commit()
    return True
