# soscancer

Mobile and web project supporting the Cancer Support Group of Pongaí, São Paulo, Brazil — aiming to improve care, communication, and community engagement for individuals facing cancer.

## Monorepo Structure

- `backend/` – FastAPI service providing public API endpoints
- `frontend/` – Web app (Vite + React)

## Quick Start

### Backend

1) Create and activate a virtual environment
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
```
2) Install dependencies
```bash
pip install -r requirements.txt
```
3) Run the API
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
4) Health check
```bash
curl http://localhost:8000/api/v1/health
```

### Frontend

See `frontend/README.md` for setup and development instructions.

## Licensing

This project may include third-party libraries with their own licenses in `frontend/` and `backend/`. Review those before distribution.
