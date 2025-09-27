/**
 * Hook for easy permission checking in components.
 */

import { useAuth } from '@/contexts/auth-context'
import { Permission } from '@/lib/permissions'

export function usePermissions() {
  const {
    user,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getPermissions,
    getAccessibleRoutes,
  } = useAuth()

  return {
    user,
    userRole: user?.role || 'user',
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getPermissions,
    getAccessibleRoutes,

    // Convenience methods for common permission checks
    canViewDashboard: () => hasPermission(Permission.VIEW_DASHBOARD),
    canViewAgenda: () => hasPermission(Permission.VIEW_AGENDA),
    canCreateEvents: () => hasPermission(Permission.CREATE_EVENTS),
    canUpdateEvents: () => hasPermission(Permission.UPDATE_EVENTS),
    canDeleteEvents: () => hasPermission(Permission.DELETE_EVENTS),
    canManageAgenda: () => hasPermission(Permission.MANAGE_AGENDA),
    canViewSettings: () => hasPermission(Permission.VIEW_SETTINGS),
    canUpdateProfile: () => hasPermission(Permission.UPDATE_PROFILE),
    canDeleteAccount: () => hasPermission(Permission.DELETE_ACCOUNT),
    canViewRegistry: () => hasPermission(Permission.VIEW_REGISTRY),
    canManageRegistry: () => hasPermission(Permission.MANAGE_REGISTRY),
    canViewUsers: () => hasPermission(Permission.VIEW_USERS),
    canCreateUsers: () => hasPermission(Permission.CREATE_USERS),
    canUpdateUsers: () => hasPermission(Permission.UPDATE_USERS),
    canDeleteUsers: () => hasPermission(Permission.DELETE_USERS),
    canViewAnalytics: () => hasPermission(Permission.VIEW_ANALYTICS),
    isAdmin: () => hasPermission(Permission.ADMIN_ACCESS),
    canAccessSystemSettings: () => hasPermission(Permission.SYSTEM_SETTINGS),
  }
}
