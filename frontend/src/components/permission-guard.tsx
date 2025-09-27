/**
 * Permission-based route and component protection.
 */

import React from 'react'
import { useAuth } from '../contexts/auth-context'
import { Permission, PermissionChecker } from '../lib/permissions'

interface PermissionGuardProps {
  children: React.ReactNode
  permission?: Permission
  permissions?: Permission[]
  requireAll?: boolean
  fallback?: React.ReactNode
  redirectTo?: string
}

/**
 * Component that conditionally renders children based on user permissions.
 */
export function PermissionGuard({
  children,
  permission,
  permissions = [],
  requireAll = false,
  fallback = null,
  redirectTo,
}: PermissionGuardProps) {
  const { user } = useAuth()
  const userRole = user?.role || 'user'

  // Determine which permissions to check
  const permissionsToCheck = permission ? [permission] : permissions

  if (permissionsToCheck.length === 0) {
    // No permissions specified, render children
    return <>{children}</>
  }

  // Check permissions
  const hasAccess = requireAll
    ? PermissionChecker.hasAllPermissions(userRole, permissionsToCheck)
    : PermissionChecker.hasAnyPermission(userRole, permissionsToCheck)

  if (!hasAccess) {
    if (redirectTo) {
      // Redirect to specified route
      window.location.href = redirectTo
      return null
    }

    // Render fallback or nothing
    return <>{fallback}</>
  }

  return <>{children}</>
}

/**
 * Higher-order component for protecting components with permissions.
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: Permission | Permission[],
  requireAll = false,
  fallback?: React.ReactNode,
) {
  return function PermissionWrappedComponent(props: P) {
    const permissions = Array.isArray(permission) ? permission : [permission]

    return (
      <PermissionGuard permissions={permissions} requireAll={requireAll} fallback={fallback}>
        <Component {...props} />
      </PermissionGuard>
    )
  }
}

/**
 * Hook for conditional rendering based on permissions.
 */
export function usePermissionGuard(
  permission?: Permission,
  permissions?: Permission[],
  requireAll = false,
) {
  const { user } = useAuth()
  const userRole = user?.role || 'user'

  const permissionsToCheck = permission ? [permission] : permissions || []

  if (permissionsToCheck.length === 0) {
    return true // No permissions specified, allow access
  }

  return requireAll
    ? PermissionChecker.hasAllPermissions(userRole, permissionsToCheck)
    : PermissionChecker.hasAnyPermission(userRole, permissionsToCheck)
}

/**
 * Component for showing different content based on user role.
 */
interface RoleBasedContentProps {
  children: React.ReactNode
  allowedRoles: string[]
  fallback?: React.ReactNode
}

export function RoleBasedContent({
  children,
  allowedRoles,
  fallback = null,
}: RoleBasedContentProps) {
  const { user } = useAuth()
  const userRole = user?.role || 'user'

  if (!allowedRoles.includes(userRole)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
