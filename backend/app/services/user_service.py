from __future__ import annotations

from typing import Dict, List, Optional
from uuid import UUID, uuid4

from datetime import datetime
from app.schemas.user import UserCreate, UserInDB, UserPublic, UserUpdate, UserSummary, UserProfile
from app.repositories.json_repository import JsonRepository
from app.core.security import get_password_hash, verify_password
from pathlib import Path


class UserService:
    def __init__(self, repo: Optional[JsonRepository] = None) -> None:
        data_dir = Path(__file__).resolve().parents[2] / "data"
        self._repo = repo or JsonRepository(data_dir / "users.json")
        self._users: Dict[UUID, UserInDB] = {}
        self._load_from_disk()

    def _load_from_disk(self) -> None:
        users_raw = self._repo.read_users()
        self._users = {}
        for item in users_raw:
            try:
                user = UserInDB(**item)
                self._users[user.id] = user
            except Exception:
                # Skip malformed entries
                continue

    def _persist(self) -> None:
        # Use JSON mode so UUIDs and other types are JSON-serializable
        users_serialized = [u.model_dump(mode="json") for u in self._users.values()]
        self._repo.write_users(users_serialized)

    def list_users(self) -> List[UserPublic]:
        return [UserPublic(**user.model_dump()) for user in self._users.values()]

    def list_users_summary(self) -> List[UserSummary]:
        return [UserSummary(id=user.id, name=user.name) for user in self._users.values()]

    def get_user(self, user_id: UUID) -> Optional[UserPublic]:
        user = self._users.get(user_id)
        return UserPublic(**user.model_dump()) if user else None

    def create_user(self, payload: UserCreate) -> UserPublic:
        email_normalized = payload.email.lower()
        for existing_user in self._users.values():
            if existing_user.email.lower() == email_normalized:
                raise ValueError("email_already_exists")

        user_id = uuid4()
        now = datetime.utcnow().isoformat()
        
        user_in_db = UserInDB(
            id=user_id,
            name=payload.name,
            email=payload.email,
            phone=payload.phone,
            role=payload.role,
            hashed_password=get_password_hash(payload.password),
            created_at=now,
            updated_at=now,
        )
        self._users[user_id] = user_in_db
        self._persist()
        return UserPublic(**user_in_db.model_dump())

    def update_user(self, user_id: UUID, payload: UserUpdate) -> Optional[UserPublic]:
        existing = self._users.get(user_id)
        if not existing:
            return None
        
        update_data = payload.model_dump(exclude_unset=True)
        now = datetime.utcnow().isoformat()
        
        if "name" in update_data:
            existing.name = update_data["name"]
        if "password" in update_data and update_data["password"] is not None:
            existing.hashed_password = get_password_hash(update_data["password"])
        if "phone" in update_data:
            existing.phone = update_data["phone"]
        if "role" in update_data:
            existing.role = update_data["role"]
        
        existing.updated_at = now
        self._users[user_id] = existing
        self._persist()
        return UserPublic(**existing.model_dump())

    def delete_user(self, user_id: UUID) -> bool:
        removed = self._users.pop(user_id, None) is not None
        if removed:
            self._persist()
        return removed


# Singleton service instance for simplicity
user_service = UserService()


