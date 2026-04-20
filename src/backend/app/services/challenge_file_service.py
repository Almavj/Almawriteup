import os
import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from ..models.models import ChallengeFile as ChallengeFileModel
from ..core.config import get_settings

settings = get_settings()


def ensure_challenge_file_dirs():
    os.makedirs(os.path.join(settings.UPLOAD_DIR, "files"), exist_ok=True)


def process_challenge_file(file_data: bytes, original_filename: str) -> tuple[str, str]:
    ensure_challenge_file_dirs()

    unique_id = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{uuid.uuid4().hex[:8]}"
    safe_filename = "".join(
        c if c.isalnum() or c in "._-" else "_" for c in original_filename
    )
    final_filename = f"{unique_id}_{safe_filename}"

    file_path = os.path.join(settings.UPLOAD_DIR, "files", final_filename)

    with open(file_path, "wb") as f:
        f.write(file_data)

    url = f"/uploads/files/{final_filename}"
    return final_filename, url


def create_challenge_file(
    filename: str, original_name: str, url: str, writeup_id: int, db: Session
) -> ChallengeFileModel:
    db_file = ChallengeFileModel(
        filename=filename,
        original_name=original_name,
        url=url,
        writeup_id=writeup_id,
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file


def list_by_writeup(writeup_id: int, db: Session) -> List[ChallengeFileModel]:
    return (
        db.query(ChallengeFileModel)
        .filter(ChallengeFileModel.writeup_id == writeup_id)
        .order_by(ChallengeFileModel.uploaded_at.desc())
        .all()
    )


def find_by_id(id: int, db: Session) -> Optional[ChallengeFileModel]:
    return db.query(ChallengeFileModel).filter(ChallengeFileModel.id == id).first()


def find_by_filename(filename: str, db: Session) -> Optional[ChallengeFileModel]:
    return (
        db.query(ChallengeFileModel)
        .filter(ChallengeFileModel.filename == filename)
        .first()
    )


def delete_file(id: int, db: Session) -> bool:
    file = find_by_id(id, db)
    if not file:
        return False

    file_path = os.path.join(settings.UPLOAD_DIR, "files", file.filename)

    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except OSError:
        pass

    db.delete(file)
    db.commit()
    return True


def delete_by_writeup(writeup_id: int, db: Session) -> bool:
    files = list_by_writeup(writeup_id, db)
    for file in files:
        delete_file(file.id, db)
    return True
