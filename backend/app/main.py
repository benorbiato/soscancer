from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.routers import api_router


def create_application() -> FastAPI:
    application = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)
    application.include_router(api_router, prefix=settings.API_V1_PREFIX)
    # CORS for frontend dev
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return application


app = create_application()


