from sqlalchemy.orm import Session
from ..models.models import Admin
from ..core.security import get_password_hash, verify_password
from ..core.config import get_settings

settings = get_settings()


def get_admin(db: Session) -> Admin | None:
    return db.query(Admin).first()


def has_admin(db: Session) -> bool:
    return get_admin(db) is not None


def verify_admin_password(password: str, db: Session) -> bool:
    admin = get_admin(db)
    if not admin:
        return False
    return verify_password(password, admin.password_hash)


def create_default_admin(db: Session) -> Admin:
    admin = Admin(password_hash=get_password_hash(settings.ADMIN_PASSWORD))
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


def create_admin(password: str, db: Session) -> Admin:
    admin = Admin(password_hash=get_password_hash(password))
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin
