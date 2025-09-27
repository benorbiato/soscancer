from datetime import timedelta
from typing import Optional
from uuid import UUID

from app.core.config import settings
from app.core.security import (
    verify_password, 
    create_access_token, 
    create_refresh_token,
    validate_password_strength
)
from app.schemas.auth import LoginRequest, TokenResponse, RefreshTokenRequest
from app.schemas.user import UserInDB
from app.services.user_service import user_service


def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
    """Authenticate a user by email and password."""
    # Find user by email
    user = None
    for existing_user in user_service._users.values():
        if existing_user.email.lower() == email.lower():
            user = existing_user
            break
    
    if not user:
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    
    return user


def login_user(login_data: LoginRequest) -> TokenResponse:
    """Authenticate user and return JWT tokens."""
    user = authenticate_user(login_data.email, login_data.password)
    
    if not user:
        raise ValueError("Invalid email or password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "name": user.name, "role": user.role},
        expires_delta=access_token_expires
    )
    
    refresh_token = create_refresh_token(
        data={"sub": str(user.id), "email": user.email}
    )
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user_id=str(user.id),
        user_name=user.name,
        user_email=user.email,
        user_role=user.role
    )


def refresh_access_token(refresh_data: RefreshTokenRequest) -> TokenResponse:
    """Refresh access token using refresh token."""
    from app.core.security import verify_token
    
    try:
        payload = verify_token(refresh_data.refresh_token, "refresh")
        user_id = UUID(payload.get("sub"))
        
        # Get user from database
        user = user_service.get_user(user_id)
        if not user:
            raise ValueError("User not found")
        
        # Create new access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id), "email": user.email, "name": user.name, "role": user.role},
            expires_delta=access_token_expires
        )
        
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_data.refresh_token,  # Keep same refresh token
            user_id=str(user.id),
            user_name=user.name,
            user_email=user.email,
            user_role=user.role
        )
        
    except Exception:
        raise ValueError("Invalid refresh token")
