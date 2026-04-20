from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import datetime
from enum import Enum


class Category(str, Enum):
    pwn = "pwn"
    web = "web"
    crypto = "crypto"
    forensics = "forensics"
    rev = "rev"
    misc = "misc"
    osint = "osint"


class Difficulty(str, Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"
    insane = "insane"


class WriteupBase(BaseModel):
    title: str
    slug: str = ""
    category: Category
    difficulty: Difficulty
    date_solved: str
    content: str
    flag: str = ""
    flag_hidden: bool = True
    tags: List[str] = []
    draft: bool = True
    challenge_url: str = ""
    challenge_files: List[dict] = []


class WriteupCreate(WriteupBase):
    pass


class WriteupUpdate(WriteupBase):
    pass


class WriteupResponse(BaseModel):
    id: int
    title: str
    slug: str
    category: Category
    difficulty: Difficulty
    date_solved: str
    content: str
    flag: str = ""
    flag_hidden: bool
    tags: List[str]
    draft: bool
    challenge_url: str = ""
    challenge_files: List[dict] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PagedWriteups(BaseModel):
    total: int
    writeups: List[WriteupResponse]


class ImageResponse(BaseModel):
    id: int
    filename: str
    url: str
    thumbnail_url: str
    mime_type: str
    uploaded_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginRequest(BaseModel):
    password: str


class ResultOk(BaseModel):
    ok: Optional[None] = None


class ResultOkId(BaseModel):
    ok: int


class ResultOkStr(BaseModel):
    ok: str


class ResultErr(BaseModel):
    err: str


class ClaimResponse(BaseModel):
    access_token: str
    token_type: str


class ImageUploadResponse(BaseModel):
    url: str


class ChallengeFileResponse(BaseModel):
    id: int
    filename: str
    original_name: str
    url: str
    writeup_id: int
    uploaded_at: datetime

    class Config:
        from_attributes = True


class ChallengeFileUploadResponse(BaseModel):
    filename: str
    original_name: str
    url: str
