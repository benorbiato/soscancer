"""
Permission middleware for automatic route protection.
"""

from typing import List, Optional
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from app.core.permissions import Permission, PermissionChecker, get_accessible_routes


class PermissionMiddleware:
    """Middleware to automatically check permissions for routes."""
    
    def __init__(self):
        # Define route-to-permission mappings
        self.route_permissions = {
            # User management routes
            "/api/v1/users": [Permission.VIEW_USERS],
            "/api/v1/users/": [Permission.VIEW_USERS],
            "/api/v1/users/create": [Permission.CREATE_USERS],
            "/api/v1/users/update": [Permission.UPDATE_USERS],
            "/api/v1/users/delete": [Permission.DELETE_USERS],
            
            # Agenda routes
            "/api/v1/agenda": [Permission.VIEW_AGENDA],
            "/api/v1/agenda/": [Permission.VIEW_AGENDA],
            "/api/v1/agenda/create": [Permission.CREATE_EVENTS],
            "/api/v1/agenda/update": [Permission.UPDATE_EVENTS],
            "/api/v1/agenda/delete": [Permission.DELETE_EVENTS],
            
            # Dashboard routes
            "/api/v1/dashboard": [Permission.VIEW_DASHBOARD],
            "/api/v1/dashboard/": [Permission.VIEW_DASHBOARD],
            "/api/v1/analytics": [Permission.VIEW_ANALYTICS],
            
            # Settings routes
            "/api/v1/settings": [Permission.VIEW_SETTINGS],
            "/api/v1/settings/": [Permission.VIEW_SETTINGS],
            "/api/v1/settings/profile": [Permission.UPDATE_PROFILE],
            "/api/v1/settings/delete-account": [Permission.DELETE_ACCOUNT],
            
            # Registry routes
            "/api/v1/registry": [Permission.VIEW_REGISTRY],
            "/api/v1/registry/": [Permission.VIEW_REGISTRY],
        }
    
    def get_required_permissions(self, path: str) -> List[Permission]:
        """Get required permissions for a given path."""
        # Check exact match first
        if path in self.route_permissions:
            return self.route_permissions[path]
        
        # Check for path prefixes
        for route, permissions in self.route_permissions.items():
            if path.startswith(route.rstrip('/')):
                return permissions
        
        # Default: no specific permissions required
        return []
    
    async def __call__(self, request: Request, call_next):
        """Process the request and check permissions."""
        # Skip permission check for certain paths
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
        
        # Get required permissions for this route
        required_permissions = self.get_required_permissions(request.url.path)
        
        if not required_permissions:
            # No specific permissions required for this route
            return await call_next(request)
        
        # Get user from request (assuming it's set by auth middleware)
        user_role = getattr(request.state, 'user_role', None)
        
        if not user_role:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Authentication required"}
            )
        
        # Check if user has required permissions
        has_permission = PermissionChecker.has_any_permission(
            user_role, 
            required_permissions
        )
        
        if not has_permission:
            return JSONResponse(
                status_code=status.HTTP_403_FORBIDDEN,
                content={
                    "detail": f"Access denied. Required permissions: {[p.value for p in required_permissions]}",
                    "user_role": user_role,
                    "required_permissions": [p.value for p in required_permissions]
                }
            )
        
        return await call_next(request)


def create_permission_middleware():
    """Create and return a permission middleware instance."""
    return PermissionMiddleware()
