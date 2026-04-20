from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from .core.database import engine, Base
from .core.config import get_settings
from .api import writeups, images, auth, feeds, challenge_files

settings = get_settings()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CTF Writeup Hub API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "thumbnails"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "files"), exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

app.include_router(writeups.router, prefix="/api/writeups", tags=["writeups"])
app.include_router(images.router, prefix="/api/images", tags=["images"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(auth.fix_router, prefix="/api/auth", tags=["fix"])
app.include_router(feeds.router, tags=["feeds"])
app.include_router(
    challenge_files.router, prefix="/api/challenge-files", tags=["challenge-files"]
)


@app.get("/")
async def root():
    return {"message": "CTF Writeup Hub API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
