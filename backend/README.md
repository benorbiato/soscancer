## soscancer Backend (FastAPI)

### Setup

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

### Run

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Endpoints

- GET `/api/v1/health` → `{ "status": "ok" }`


