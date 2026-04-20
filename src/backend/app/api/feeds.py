from fastapi import APIRouter, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..services import writeup_service

router = APIRouter()


@router.get("/rss.xml")
async def get_rss_feed(
    db: Session = Depends(get_db)
):
    feed = writeup_service.build_rss_feed(db)
    return Response(content=feed, media_type="application/xml")


@router.get("/sitemap.xml")
async def get_sitemap(
    db: Session = Depends(get_db)
):
    sitemap = writeup_service.build_sitemap(db)
    return Response(content=sitemap, media_type="application/xml")
