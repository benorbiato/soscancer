from __future__ import annotations

from typing import Dict, List, Optional
from uuid import UUID, uuid4

from app.schemas.user import UserCreate, UserInDB, UserPublic, UserUpdate, UserSummary
from app.repositories.json_repository import JsonRepository
from pathlib import Path
from passlib.context import CryptContext


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__truncate_error=False,  # silently truncate >72B to avoid ValueError
)


def _hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)


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
        user_id = uuid4()
        user_in_db = UserInDB(
            id=user_id,
            name=payload.name,
            email=payload.email,
            hashed_password=_hash_password(payload.password),
        )
        self._users[user_id] = user_in_db
        self._persist()
        return UserPublic(**user_in_db.model_dump())

    def update_user(self, user_id: UUID, payload: UserUpdate) -> Optional[UserPublic]:
        existing = self._users.get(user_id)
        if not existing:
            return None
        update_data = payload.model_dump(exclude_unset=True)
        if "name" in update_data:
            existing.name = update_data["name"]
        if "password" in update_data and update_data["password"] is not None:
            existing.hashed_password = _hash_password(update_data["password"])
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


