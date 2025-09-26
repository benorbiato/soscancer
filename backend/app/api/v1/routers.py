from fastapi import APIRouter

from app.api.v1.endpoints import health
from app.api.v1.endpoints.user import user as users_router


api_router = APIRouter()
api_router.include_router(users_router.router)


