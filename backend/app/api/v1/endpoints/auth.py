from fastapi import APIRouter, HTTPException, status

from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.user import UserCreate
from app.services.auth_service import login_user
from app.services.user_service import user_service

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    """Authenticate user and return JWT token."""
    try:
        return login_user(payload)
    except ValueError as exc:
        if str(exc) == "Invalid email or password":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        raise


@router.post("/register", response_model=TokenResponse)
def register(user_data: UserCreate) -> TokenResponse:
    """Register a new user and return JWT token."""
    try:
        # Create user
        user = user_service.create_user(user_data)
        
        # Login the new user
        login_data = LoginRequest(email=user_data.email, password=user_data.password)
        return login_user(login_data)
        
    except ValueError as exc:
        if "already exists" in str(exc):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        )
