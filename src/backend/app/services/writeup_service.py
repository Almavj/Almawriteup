import os
import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from ..models.models import Writeup, Image
from ..schemas.schemas import WriteupCreate, WriteupUpdate
from ..core.config import get_settings

settings = get_settings()


def generate_slug(title: str, db: Session) -> str:
    slug = title.lower().replace(" ", "-").replace("_", "-")
    slug = "".join(c if c.isalnum() or c in "-_" else "" for c in slug)
    slug = slug.strip("-")

    counter = 1
    base_slug = slug
    while db.query(Writeup).filter(Writeup.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    return slug


def find_by_id(id: int, db: Session) -> Optional[Writeup]:
    return db.query(Writeup).filter(Writeup.id == id).first()


def find_by_slug(slug: str, db: Session) -> Optional[Writeup]:
    return db.query(Writeup).filter(Writeup.slug == slug).first()


def slug_exists(slug: str, db: Session, exclude_id: Optional[int] = None) -> bool:
    query = db.query(Writeup).filter(Writeup.slug == slug)
    if exclude_id:
        query = query.filter(Writeup.id != exclude_id)
    return query.first() is not None


def create_writeup(input: WriteupCreate, db: Session) -> Writeup:
    slug = input.slug if input.slug else generate_slug(input.title, db)

    db_writeup = Writeup(
        title=input.title,
        slug=slug,
        category=input.category.value,
        difficulty=input.difficulty.value,
        date_solved=input.date_solved,
        content=input.content,
        flag=input.flag,
        flag_hidden=input.flag_hidden,
        tags=input.tags,
        draft=input.draft,
        challenge_url=input.challenge_url,
        challenge_files=input.challenge_files,
    )
    db.add(db_writeup)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise
    db.refresh(db_writeup)
    return db_writeup


def update_writeup(id: int, input: WriteupUpdate, db: Session) -> Optional[Writeup]:
    writeup = find_by_id(id, db)
    if not writeup:
        return None

    slug = input.slug if input.slug else writeup.slug
    if slug != writeup.slug and slug_exists(slug, db, exclude_id=id):
        return None

    writeup.title = input.title
    writeup.slug = slug
    writeup.category = input.category.value
    writeup.difficulty = input.difficulty.value
    writeup.date_solved = input.date_solved
    writeup.content = input.content
    writeup.flag = input.flag
    writeup.flag_hidden = input.flag_hidden
    writeup.tags = input.tags
    writeup.draft = input.draft
    writeup.challenge_url = input.challenge_url
    writeup.challenge_files = input.challenge_files

    db.commit()
    db.refresh(writeup)
    return writeup


def delete_writeup(id: int, db: Session) -> bool:
    writeup = find_by_id(id, db)
    if not writeup:
        return False
    db.delete(writeup)
    db.commit()
    return True


def list_published(page: int, page_size: int, db: Session) -> tuple[List[Writeup], int]:
    query = (
        db.query(Writeup)
        .filter(Writeup.draft == False)
        .order_by(Writeup.created_at.desc())
    )
    total = query.count()
    writeups = query.offset((page - 1) * page_size).limit(page_size).all()
    return writeups, total


def list_all(db: Session) -> List[Writeup]:
    return db.query(Writeup).order_by(Writeup.created_at.desc()).all()


def list_all_published(db: Session) -> List[Writeup]:
    return (
        db.query(Writeup)
        .filter(Writeup.draft == False)
        .order_by(Writeup.created_at.desc())
        .all()
    )


def search(query_text: str, db: Session) -> List[Writeup]:
    pattern = f"%{query_text}%"
    return (
        db.query(Writeup)
        .filter(
            and_(
                Writeup.draft == False,
                or_(
                    Writeup.title.ilike(pattern),
                    Writeup.content.ilike(pattern),
                ),
            )
        )
        .all()
    )


def by_category(category: str, db: Session) -> List[Writeup]:
    return (
        db.query(Writeup)
        .filter(and_(Writeup.draft == False, Writeup.category == category))
        .order_by(Writeup.created_at.desc())
        .all()
    )


def by_tag(tag: str, db: Session) -> List[Writeup]:
    return (
        db.query(Writeup)
        .filter(and_(Writeup.draft == False, Writeup.tags.contains([tag])))
        .order_by(Writeup.created_at.desc())
        .all()
    )


def related(id: int, limit: int, db: Session) -> List[Writeup]:
    writeup = find_by_id(id, db)
    if not writeup:
        return []

    return (
        db.query(Writeup)
        .filter(
            and_(
                Writeup.draft == False,
                Writeup.id != id,
                or_(
                    Writeup.category == writeup.category,
                    Writeup.tags.contains(writeup.tags),
                ),
            )
        )
        .limit(limit)
        .all()
    )


def all_tags(db: Session) -> List[str]:
    writeups = db.query(Writeup.tags).filter(Writeup.draft == False).all()
    tags = set()
    for w_tags in writeups:
        if w_tags[0]:
            tags.update(w_tags[0])
    return sorted(list(tags))


def build_rss_feed(db: Session, base_url: str = "https://example.com") -> str:
    writeups = list_all_published(db)[:20]

    items = []
    for w in writeups:
        items.append(f"""
    <item>
        <title><![CDATA[{w.title}]]></title>
        <link>{base_url}/writeup/{w.slug}</link>
        <guid>{base_url}/writeup/{w.slug}</guid>
        <description><![CDATA[{w.content[:500]}...]]></description>
        <pubDate>{w.created_at.strftime("%a, %d %b %Y %H:%M:%S GMT")}</pubDate>
        <category>{w.category}</category>
    </item>""")

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>CTF Writeups</title>
        <link>{base_url}</link>
        <description>CTF Challenge Writeups</description>
        <language>en-us</language>
        {"".join(items)}
    </channel>
</rss>"""


def build_sitemap(db: Session, base_url: str = "https://example.com") -> str:
    writeups = list_all_published(db)

    urls = [
        f"<url><loc>{base_url}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>"
    ]

    for w in writeups:
        urls.append(f"""<url>
        <loc>{base_url}/writeup/{w.slug}</loc>
        <lastmod>{w.updated_at.strftime("%Y-%m-%d")}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>""")

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {"".join(urls)}
</urlset>"""
