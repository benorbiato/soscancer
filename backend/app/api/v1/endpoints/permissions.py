"""
Permission endpoints for role-based access control.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.permissions import Permission, PermissionChecker, get_accessible_routes
from app.schemas.user import UserPublic
from app.middleware.auth import AuthMiddleware

router = APIRouter()


def get_current_user(request) -> UserPublic:
    """Get current user from request state."""
    user = getattr(request.state, 'current_user', None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    return user


@router.get("/permissions", response_model=List[str])
async def get_user_permissions(request):
    """Get permissions for the current user."""
    user = get_current_user(request)
    permissions = PermissionChecker.get_user_permissions(user.role or 'user')
    return [permission.value for permission in permissions]


@router.get("/permissions/check/{permission}")
async def check_permission(permission: str, request):
    """Check if the current user has a specific permission."""
    user = get_current_user(request)
    
    try:
        perm = Permission(permission)
        has_permission = PermissionChecker.has_permission(user.role or 'user', perm)
        return {
            "permission": permission,
            "has_permission": has_permission,
            "user_role": user.role
        }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid permission: {permission}"
        )


@router.get("/routes")
async def get_accessible_routes_for_user(request):
    """Get accessible routes for the current user."""
    user = get_current_user(request)
    routes = get_accessible_routes(user.role)
    return {
        "user_role": user.role,
        "accessible_routes": routes
    }


@router.get("/role-info")
async def get_role_info(request):
    """Get detailed role information for the current user."""
    user = get_current_user(request)
    permissions = PermissionChecker.get_user_permissions(user.role or 'user')
    routes = get_accessible_routes(user.role)
    
    return {
        "user_id": user.id,
        "user_name": user.name,
        "user_email": user.email,
        "user_role": user.role,
        "permissions": [permission.value for permission in permissions],
        "accessible_routes": routes,
        "permission_count": len(permissions)
    }
