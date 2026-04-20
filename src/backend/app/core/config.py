from pydantic_settings import BaseSettings
from pydantic import field_validator, model_validator
from functools import lru_cache
import json
import os


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./ctf_writeups.db"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ADMIN_PASSWORD: str = "admin"
    UPLOAD_DIR: str = "./uploads"
    MAX_IMAGE_WIDTH: int = 800
    THUMBNAIL_SIZE: int = 200
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    CORS_ORIGINS: str = '["http://localhost:5173", "http://localhost:3000"]'
    MAX_CONTENT_LENGTH: int = 100000
    MAX_FILE_SIZE: int = 5 * 1024 * 1024

    class Config:
        env_file = ".env"
        extra = "ignore"

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse CORS_ORIGINS from string to list"""
        try:
            return json.loads(self.CORS_ORIGINS)
        except (json.JSONDecodeError, TypeError):
            return ["http://localhost:5173", "http://localhost:3000"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v):
        """Handle CORS_ORIGINS from environment variable"""
        if isinstance(v, str):
            try:
                # Try to parse as JSON
                return json.dumps(json.loads(v))
            except (json.JSONDecodeError, TypeError):
                # If not valid JSON, wrap it as a JSON array
                return json.dumps([v])
        return v


@lru_cache()
def get_settings():
    return Settings()
