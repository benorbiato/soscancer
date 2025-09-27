from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, EmailStr, Field, validator
from app.core.validators import EmailValidator, PasswordValidator, PhoneValidator, InputSanitizer


class UserBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200, description="User's full name")
    email: EmailStr = Field(..., description="User's email address")
    phone: Optional[str] = Field(None, max_length=50, description="User's phone number")
    role: Optional[str] = Field(None, max_length=50, description="User's role in the system")
    
    @validator('name')
    def validate_name(cls, v):
        if not v or not v.strip():
            raise ValueError('Name cannot be empty')
        return InputSanitizer.sanitize_string(v)
    
    @validator('email')
    def validate_email(cls, v):
        if not EmailValidator.validate_email_format(v):
            raise ValueError('Invalid email format')
        if EmailValidator.is_disposable_email(v):
            raise ValueError('Disposable email addresses are not allowed')
        return InputSanitizer.sanitize_email(v)
    
    @validator('phone')
    def validate_phone(cls, v):
        if v is None:
            return v
        if not PhoneValidator.validate_phone(v):
            raise ValueError('Invalid phone number format')
        return PhoneValidator.format_phone(v)
    
    @validator('role')
    def validate_role(cls, v):
        if v is None:
            return v
        allowed_roles = {'admin', 'user', 'volunteer', 'patient', 'sponsor', 'supporter'}
        if v.lower() not in allowed_roles:
            raise ValueError(f'Role must be one of: {", ".join(allowed_roles)}')
        return v.lower()


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128, description="User's password")
    
    @validator('password')
    def validate_password(cls, v):
        feedback = PasswordValidator.validate_strength(v)
        if not feedback['is_valid']:
            raise ValueError(f"Password validation failed: {', '.join(feedback['issues'])}")
        return v


class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    password: Optional[str] = Field(None, min_length=8, max_length=128)
    phone: Optional[str] = Field(None, max_length=50)
    role: Optional[str] = Field(None, max_length=50)
    
    @validator('name')
    def validate_name(cls, v):
        if v is not None:
            if not v.strip():
                raise ValueError('Name cannot be empty')
            return InputSanitizer.sanitize_string(v)
        return v
    
    @validator('password')
    def validate_password(cls, v):
        if v is not None:
            feedback = PasswordValidator.validate_strength(v)
            if not feedback['is_valid']:
                raise ValueError(f"Password validation failed: {', '.join(feedback['issues'])}")
        return v
    
    @validator('phone')
    def validate_phone(cls, v):
        if v is not None:
            if not PhoneValidator.validate_phone(v):
                raise ValueError('Invalid phone number format')
            return PhoneValidator.format_phone(v)
        return v
    
    @validator('role')
    def validate_role(cls, v):
        if v is not None:
            allowed_roles = {'admin', 'user', 'volunteer', 'patient', 'sponsor', 'supporter'}
            if v.lower() not in allowed_roles:
                raise ValueError(f'Role must be one of: {", ".join(allowed_roles)}')
            return v.lower()
        return v


class UserPublic(UserBase):
    id: UUID = Field(default_factory=uuid4)
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class UserInDB(UserPublic):
    hashed_password: str


class UserSummary(BaseModel):
    id: UUID
    name: str
    email: str
    role: Optional[str] = None


class UserProfile(BaseModel):
    """User profile for detailed view."""
    id: UUID
    name: str
    email: str
    phone: Optional[str] = None
    role: Optional[str] = None
    created_at: Optional[str] = None
    last_login: Optional[str] = None


