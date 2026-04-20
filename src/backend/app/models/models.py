from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from sqlalchemy.sql import func
from ..core.database import Base


class Writeup(Base):
    __tablename__ = "writeups"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, index=True)
    category = Column(String(50), nullable=False)
    difficulty = Column(String(50), nullable=False)
    date_solved = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    flag = Column(Text, default="")
    flag_hidden = Column(Boolean, default=True)
    tags = Column(JSON, default=list)
    draft = Column(Boolean, default=True)
    challenge_url = Column(String(1000), default="")
    challenge_files = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    filename = Column(String(500), unique=True, index=True)
    url = Column(String(1000), nullable=False)
    thumbnail_url = Column(String(1000), nullable=False)
    mime_type = Column(String(100), nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())


class ChallengeFile(Base):
    __tablename__ = "challenge_files"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    filename = Column(String(500), unique=True, index=True)
    original_name = Column(String(500), nullable=False)
    url = Column(String(1000), nullable=False)
    writeup_id = Column(Integer, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    password_hash = Column(String(500), nullable=False)
