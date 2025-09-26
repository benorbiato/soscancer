from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.routers import api_router


def create_application() -> FastAPI:
    application = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)
    application.include_router(api_router, prefix=settings.API_V1_PREFIX)
    return application


app = create_application()


