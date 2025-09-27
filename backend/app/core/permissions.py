"""
Permission system for role-based access control.
Defines permissions for different user roles and provides utilities for checking access.
"""

from enum import Enum
from typing import Dict, List, Set, Optional
from functools import wraps
from fastapi import HTTPException, status, Depends
from app.schemas.user import UserPublic


class Permission(Enum):
    """Available permissions in the system."""
    
    # User management
    VIEW_USERS = "view_users"
    CREATE_USERS = "create_users"
    UPDATE_USERS = "update_users"
    DELETE_USERS = "delete_users"
    
    # Agenda/Events
    VIEW_AGENDA = "view_agenda"
    CREATE_EVENTS = "create_events"
    UPDATE_EVENTS = "update_events"
    DELETE_EVENTS = "delete_events"
    MANAGE_AGENDA = "manage_agenda"
    
    # Dashboard
    VIEW_DASHBOARD = "view_dashboard"
    VIEW_ANALYTICS = "view_analytics"
    
    # Settings
    VIEW_SETTINGS = "view_settings"
    UPDATE_PROFILE = "update_profile"
    DELETE_ACCOUNT = "delete_account"
    
    # Registry
    VIEW_REGISTRY = "view_registry"
    MANAGE_REGISTRY = "manage_registry"
    
    # Admin permissions
    ADMIN_ACCESS = "admin_access"
    SYSTEM_SETTINGS = "system_settings"


class UserRole(Enum):
    """User roles in the system."""
    ADMIN = "admin"
    USER = "user"
    VOLUNTEER = "volunteer"
    PATIENT = "patient"
    SPONSOR = "sponsor"
    SUPPORTER = "supporter"


# Role-based permissions mapping
ROLE_PERMISSIONS: Dict[UserRole, Set[Permission]] = {
    UserRole.ADMIN: {
        # Admin has all permissions
        Permission.VIEW_USERS,
        Permission.CREATE_USERS,
        Permission.UPDATE_USERS,
        Permission.DELETE_USERS,
        Permission.VIEW_AGENDA,
        Permission.CREATE_EVENTS,
        Permission.UPDATE_EVENTS,
        Permission.DELETE_EVENTS,
        Permission.MANAGE_AGENDA,
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_ANALYTICS,
        Permission.VIEW_SETTINGS,
        Permission.UPDATE_PROFILE,
        Permission.DELETE_ACCOUNT,
        Permission.VIEW_REGISTRY,
        Permission.MANAGE_REGISTRY,
        Permission.ADMIN_ACCESS,
        Permission.SYSTEM_SETTINGS,
    },
    
    UserRole.VOLUNTEER: {
        # Volunteers can access agenda, dashboard, and basic settings
        Permission.VIEW_AGENDA,
        Permission.CREATE_EVENTS,
        Permission.UPDATE_EVENTS,
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_SETTINGS,
        Permission.UPDATE_PROFILE,
        Permission.VIEW_REGISTRY,
    },
    
    UserRole.PATIENT: {
        # Patients can view agenda and basic settings
        Permission.VIEW_AGENDA,
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_SETTINGS,
        Permission.UPDATE_PROFILE,
        Permission.VIEW_REGISTRY,
    },
    
    UserRole.SPONSOR: {
        # Sponsors can access agenda, dashboard and settings
        Permission.VIEW_AGENDA,
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_SETTINGS,
        Permission.UPDATE_PROFILE,
        Permission.VIEW_REGISTRY,
    },
    
    UserRole.SUPPORTER: {
        # Supporters have similar access to volunteers but no event management
        Permission.VIEW_AGENDA,
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_SETTINGS,
        Permission.UPDATE_PROFILE,
        Permission.VIEW_REGISTRY,
    },
    
    UserRole.USER: {
        # Basic users have minimal access - now includes dashboard
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_SETTINGS,
        Permission.UPDATE_PROFILE,
        Permission.VIEW_REGISTRY,
    },
}


class PermissionChecker:
    """Utility class for checking user permissions."""
    
    @staticmethod
    def get_user_permissions(role: str) -> Set[Permission]:
        """Get permissions for a given role."""
        try:
            user_role = UserRole(role.lower())
            return ROLE_PERMISSIONS.get(user_role, set())
        except ValueError:
            # Invalid role, return empty permissions
            return set()
    
    @staticmethod
    def has_permission(user_role: str, permission: Permission) -> bool:
        """Check if a user role has a specific permission."""
        user_permissions = PermissionChecker.get_user_permissions(user_role)
        return permission in user_permissions
    
    @staticmethod
    def has_any_permission(user_role: str, permissions: List[Permission]) -> bool:
        """Check if a user role has any of the specified permissions."""
        user_permissions = PermissionChecker.get_user_permissions(user_role)
        return any(permission in user_permissions for permission in permissions)
    
    @staticmethod
    def has_all_permissions(user_role: str, permissions: List[Permission]) -> bool:
        """Check if a user role has all of the specified permissions."""
        user_permissions = PermissionChecker.get_user_permissions(user_role)
        return all(permission in user_permissions for permission in permissions)


def require_permission(permission: Permission):
    """Decorator to require a specific permission for an endpoint."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract user from dependencies
            user = kwargs.get('current_user')
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )
            
            if not PermissionChecker.has_permission(user.role or 'user', permission):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Permission '{permission.value}' required"
                )
            
            return await func(*args, **kwargs)
        return wrapper
    return decorator


def require_any_permission(permissions: List[Permission]):
    """Decorator to require any of the specified permissions for an endpoint."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract user from dependencies
            user = kwargs.get('current_user')
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )
            
            if not PermissionChecker.has_any_permission(user.role or 'user', permissions):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"One of the following permissions required: {[p.value for p in permissions]}"
                )
            
            return await func(*args, **kwargs)
        return wrapper
    return decorator


def require_all_permissions(permissions: List[Permission]):
    """Decorator to require all of the specified permissions for an endpoint."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract user from dependencies
            user = kwargs.get('current_user')
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )
            
            if not PermissionChecker.has_all_permissions(user.role or 'user', permissions):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"All of the following permissions required: {[p.value for p in permissions]}"
                )
            
            return await func(*args, **kwargs)
        return wrapper
    return decorator


def check_permission(user_role: Optional[str], permission: Permission) -> bool:
    """Check if a user has a specific permission."""
    if not user_role:
        return False
    return PermissionChecker.has_permission(user_role, permission)


def get_accessible_routes(user_role: Optional[str]) -> List[str]:
    """Get list of routes accessible to a user role."""
    if not user_role:
        return []
    
    routes = []
    permissions = PermissionChecker.get_user_permissions(user_role)
    
    # Map permissions to routes
    if Permission.VIEW_AGENDA in permissions:
        routes.extend(['/agenda', '/agenda/*'])
    
    if Permission.VIEW_DASHBOARD in permissions:
        routes.extend(['/dashboard', '/dashboard/*'])
    
    if Permission.VIEW_SETTINGS in permissions:
        routes.extend(['/settings', '/settings/*'])
    
    if Permission.VIEW_REGISTRY in permissions:
        routes.extend(['/registry', '/registry/*'])
    
    if Permission.ADMIN_ACCESS in permissions:
        routes.extend(['/admin', '/admin/*'])
    
    return routes
