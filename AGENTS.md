# Project Guidance

## User Preferences

[No preferences yet]

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`

**Backend** (run from `src/backend/`):

- **install**: `pip install -r requirements.txt`
- **run**: `uvicorn app.main:app --reload --port 8000`
- **env setup**: Copy `.env.example` to `.env` and set your admin password

**Development** (run from root):

- **start backend**: `pnpm dev:backend`
- **start frontend**: `pnpm dev:frontend`

## Backend API

The FastAPI backend runs on `http://localhost:8000` and provides:

- `POST /api/auth/login` - Login with password
- `POST /api/auth/claim` - Claim admin (first-time setup)
- `GET /api/writeups` - List published writeups (paginated)
- `GET /api/writeups/{id}` - Get writeup by ID
- `GET /api/writeups/slug/{slug}` - Get writeup by slug
- `POST /api/writeups` - Create writeup (admin only)
- `PUT /api/writeups/{id}` - Update writeup (admin only)
- `DELETE /api/writeups/{id}` - Delete writeup (admin only)
- `POST /api/images/upload` - Upload image (admin only)
- `GET /rss.xml` - RSS feed
- `GET /sitemap.xml` - Sitemap

## Learnings

[No learnings yet]
