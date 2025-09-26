from fastapi import APIRouter


router = APIRouter()


@router.get("/health", tags=["health"])  # simple readiness/liveness check
def healthcheck() -> dict:
    return {"status": "ok"}


