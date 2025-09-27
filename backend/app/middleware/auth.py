"""
Authentication middleware for extracting user information from JWT tokens.
"""

from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from typing import Optional
from jose import jwt
from app.core.config import settings
from app.schemas.user import UserPublic
import logging

logger = logging.getLogger(__name__)


class AuthMiddleware(BaseHTTPMiddleware):
    """Middleware to extract and validate user authentication."""
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
        self.secret_key = settings.SECRET_KEY
        self.algorithm = "HS256"
    
    async def dispatch(self, request: Request, call_next):
        """Process the request and extract user information."""
        
        # Skip auth for certain paths
        skip_paths = [
            "/api/v1/health",
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/api/v1/auth/refresh",
            "/docs",
            "/openapi.json",
            "/redoc",
        ]
        
        if request.url.path in skip_paths:
            return await call_next(request)
        
        # Extract token from Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Authentication required"}
            )
        
        token = auth_header.split(" ")[1]
        
        try:
            # Decode JWT token
            payload = jwt.decode(
                token, 
                self.secret_key, 
                algorithms=[self.algorithm]
            )
            
            # Extract user information
            user_id = payload.get("sub")
            user_email = payload.get("email")
            user_name = payload.get("name")
            user_role = payload.get("role", "user")
            
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token"
                )
            
            # Add user information to request state
            request.state.user_id = user_id
            request.state.user_email = user_email
            request.state.user_name = user_name
            request.state.user_role = user_role
            
            # Create user object for easy access
            user = UserPublic(
                id=user_id,
                name=user_name,
                email=user_email,
                role=user_role
            )
            request.state.current_user = user
            
            logger.info(f"Authenticated user: {user_email} with role: {user_role}")
            
        except jwt.ExpiredSignatureError:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Token has expired"}
            )
        except jwt.InvalidTokenError:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Invalid token"}
            )
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Authentication failed"}
            )
        
        return await call_next(request)


def create_auth_middleware():
    """Create and return an auth middleware instance."""
    return AuthMiddleware
