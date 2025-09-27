from fastapi import APIRouter

from app.api.v1.endpoints import health
from app.api.v1.endpoints.user import user as users_router
from app.api.v1.endpoints import auth
from app.api.v1.endpoints import permissions


api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(users_router.router)
api_router.include_router(auth.router)
api_router.include_router(permissions.router, prefix="/permissions", tags=["permissions"])


