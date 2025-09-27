import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.core.config import settings
from app.api.v1.routers import api_router
from app.middleware.security import (
    SecurityHeadersMiddleware,
    RateLimitMiddleware,
    RequestLoggingMiddleware
)

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper()),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)


def create_application() -> FastAPI:
    application = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        debug=settings.DEBUG,
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
    )
    
    # Include API router
    application.include_router(api_router, prefix=settings.API_V1_PREFIX)
    
    # Security middleware
    if settings.ENABLE_SECURITY_HEADERS:
        application.add_middleware(SecurityHeadersMiddleware)
    
    # Rate limiting
    application.add_middleware(
        RateLimitMiddleware,
        calls_per_minute=settings.RATE_LIMIT_PER_MINUTE
    )
    
    # Request logging
    application.add_middleware(RequestLoggingMiddleware)
    
    # Trusted host middleware
    application.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["localhost", "127.0.0.1", "*.localhost"]
    )
    
    # CORS middleware
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )
    
    return application


app = create_application()


