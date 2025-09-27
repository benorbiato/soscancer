/**
 * Permission system for role-based access control in the frontend.
 */

export enum Permission {
  // User management
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  UPDATE_USERS = 'update_users',
  DELETE_USERS = 'delete_users',

  // Agenda/Events
  VIEW_AGENDA = 'view_agenda',
  CREATE_EVENTS = 'create_events',
  UPDATE_EVENTS = 'update_events',
  DELETE_EVENTS = 'delete_events',
  MANAGE_AGENDA = 'manage_agenda',

  // Dashboard
  VIEW_DASHBOARD = 'view_dashboard',
  VIEW_ANALYTICS = 'view_analytics',

  // Settings
  VIEW_SETTINGS = 'view_settings',
  UPDATE_PROFILE = 'update_profile',
  DELETE_ACCOUNT = 'delete_account',

  // Registry
  VIEW_REGISTRY = 'view_registry',
  MANAGE_REGISTRY = 'manage_registry',

  // Admin permissions
  ADMIN_ACCESS = 'admin_access',
  SYSTEM_SETTINGS = 'system_settings',
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VOLUNTEER = 'volunteer',
  PATIENT = 'patient',
  SPONSOR = 'sponsor',
  SUPPORTER = 'supporter',
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // Admin has all permissions
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
  ],

  [UserRole.VOLUNTEER]: [
    // Volunteers can access agenda, dashboard, and basic settings
    Permission.VIEW_AGENDA,
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_SETTINGS,
    Permission.UPDATE_PROFILE,
    Permission.VIEW_REGISTRY,
  ],

  [UserRole.PATIENT]: [
    // Patients can view agenda and basic settings
    Permission.VIEW_AGENDA,
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_SETTINGS,
    Permission.UPDATE_PROFILE,
    Permission.VIEW_REGISTRY,
  ],

  [UserRole.SPONSOR]: [
    // Sponsors can access agenda, dashboard and settings
    Permission.VIEW_AGENDA,
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_SETTINGS,
    Permission.UPDATE_PROFILE,
    Permission.VIEW_REGISTRY,
  ],

  [UserRole.SUPPORTER]: [
    // Supporters have similar access to volunteers but no event management
    Permission.VIEW_AGENDA,
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_SETTINGS,
    Permission.UPDATE_PROFILE,
    Permission.VIEW_REGISTRY,
  ],

  [UserRole.USER]: [
    // Basic users have minimal access - now includes dashboard
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_SETTINGS,
    Permission.UPDATE_PROFILE,
    Permission.VIEW_REGISTRY,
  ],
}

export class PermissionChecker {
  /**
   * Get permissions for a given role.
   */
  static getPermissionsForRole(role: string): Permission[] {
    const userRole = role as UserRole
    return ROLE_PERMISSIONS[userRole] || []
  }

  /**
   * Check if a user role has a specific permission.
   */
  static hasPermission(userRole: string, permission: Permission): boolean {
    const permissions = this.getPermissionsForRole(userRole)
    return permissions.includes(permission)
  }

  /**
   * Check if a user role has any of the specified permissions.
   */
  static hasAnyPermission(userRole: string, permissions: Permission[]): boolean {
    const userPermissions = this.getPermissionsForRole(userRole)
    return permissions.some((permission) => userPermissions.includes(permission))
  }

  /**
   * Check if a user role has all of the specified permissions.
   */
  static hasAllPermissions(userRole: string, permissions: Permission[]): boolean {
    const userPermissions = this.getPermissionsForRole(userRole)
    return permissions.every((permission) => userPermissions.includes(permission))
  }

  /**
   * Get accessible routes for a user role.
   */
  static getAccessibleRoutes(userRole: string): string[] {
    const routes: string[] = []
    const permissions = this.getPermissionsForRole(userRole)

    if (permissions.includes(Permission.VIEW_AGENDA)) {
      routes.push('/agenda')
    }

    if (permissions.includes(Permission.VIEW_DASHBOARD)) {
      routes.push('/dashboard')
    }

    if (permissions.includes(Permission.VIEW_SETTINGS)) {
      routes.push('/settings')
    }

    if (permissions.includes(Permission.VIEW_REGISTRY)) {
      routes.push('/registry')
    }

    if (permissions.includes(Permission.ADMIN_ACCESS)) {
      routes.push('/admin')
    }

    return routes
  }
}

/**
 * Hook for checking permissions in React components.
 */
export function usePermissions(userRole?: string) {
  const role = userRole || 'user'

  return {
    hasPermission: (permission: Permission) => PermissionChecker.hasPermission(role, permission),

    hasAnyPermission: (permissions: Permission[]) =>
      PermissionChecker.hasAnyPermission(role, permissions),

    hasAllPermissions: (permissions: Permission[]) =>
      PermissionChecker.hasAllPermissions(role, permissions),

    getPermissions: () => PermissionChecker.getPermissionsForRole(role),
    getAccessibleRoutes: () => PermissionChecker.getAccessibleRoutes(role),
    userRole: role,
  }
}
