from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=200)


class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    password: Optional[str] = Field(None, min_length=6, max_length=200)


class UserPublic(UserBase):
    id: UUID = Field(default_factory=uuid4)


class UserInDB(UserPublic):
    hashed_password: str


class UserSummary(BaseModel):
    id: UUID
    name: str


