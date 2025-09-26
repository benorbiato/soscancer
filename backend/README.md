## soscancer Backend (FastAPI)

FastAPI-based REST API serving the application. Data is stored locally in a JSON file for now.

### Requirements

- Python 3.12+
- Recommended: virtualenv (`python3-venv`) and `pip`

### Setup

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

### Run

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# or
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Data Persistence

- JSON file at `backend/data/users.json`
- Auto-created and updated by the API
- Ignored by git via `backend/.gitignore`

### API Endpoints

- Health
  - GET `/api/v1/health` → `{ "status": "ok" }`

- Users (JSON-backed)
  - GET `/api/v1/users/` → list of `{ id, name }`
  - POST `/api/v1/users/` → create user `{ name, email, password }`
  - GET `/api/v1/users/{user_id}` → user details `{ id, name, email }`
  - PUT `/api/v1/users/{user_id}` → update `{ name?, password? }`
  - DELETE `/api/v1/users/{user_id}` → 204 No Content

### Security Notes

- Passwords are hashed with `bcrypt` via `passlib`. Long passwords are safely truncated by configuration to avoid 72-byte bcrypt limits.
- This demo does not implement authentication or authorization yet.

### Troubleshooting

- Missing venv/pip on Ubuntu/Debian:
  ```bash
  sudo apt update && sudo apt install -y python3-venv python3-pip
  ```
- If `email-validator` or `bcrypt` errors occur, run:
  ```bash
  pip install -r requirements.txt
  ```
- If `users.json` becomes malformed, the app auto-resets to an empty structure.
