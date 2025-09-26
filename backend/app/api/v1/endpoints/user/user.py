from typing import List
from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app.schemas.user import UserCreate, UserPublic, UserUpdate, UserSummary
from app.services.user_service import user_service


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=List[UserSummary])
def list_users() -> List[UserSummary]:
    return user_service.list_users_summary()


@router.post("/", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate) -> UserPublic:
    try:
        return user_service.create_user(payload)
    except ValueError as exc:
        if str(exc) == "email_already_exists":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists")
        raise


@router.get("/{user_id}", response_model=UserPublic)
def get_user(user_id: UUID) -> UserPublic:
    user = user_service.get_user(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserPublic)
def update_user(user_id: UUID, payload: UserUpdate) -> UserPublic:
    user = user_service.update_user(user_id, payload)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: UUID) -> None:
    deleted = user_service.delete_user(user_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return None


