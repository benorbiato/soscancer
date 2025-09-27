import { Permission } from '../enums/permission.enum';
import { UserRole } from '../enums/user-role.enum';

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
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
};

export class PermissionChecker {
  /**
   * Get permissions for a given role.
   */
  static getPermissionsForRole(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
  }

  /**
   * Check if a user role has a specific permission.
   */
  static hasPermission(userRole: UserRole, permission: Permission): boolean {
    const permissions = this.getPermissionsForRole(userRole);
    return permissions.includes(permission);
  }

  /**
   * Check if a user role has any of the specified permissions.
   */
  static hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
    const userPermissions = this.getPermissionsForRole(userRole);
    return permissions.some((permission) => userPermissions.includes(permission));
  }

  /**
   * Check if a user role has all of the specified permissions.
   */
  static hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
    const userPermissions = this.getPermissionsForRole(userRole);
    return permissions.every((permission) => userPermissions.includes(permission));
  }

  /**
   * Get accessible routes for a user role.
   */
  static getAccessibleRoutes(userRole: UserRole): string[] {
    const routes: string[] = [];
    const permissions = this.getPermissionsForRole(userRole);

    if (permissions.includes(Permission.VIEW_AGENDA)) {
      routes.push('/agenda');
    }

    if (permissions.includes(Permission.VIEW_DASHBOARD)) {
      routes.push('/dashboard');
    }

    if (permissions.includes(Permission.VIEW_SETTINGS)) {
      routes.push('/settings');
    }

    if (permissions.includes(Permission.VIEW_REGISTRY)) {
      routes.push('/registry');
    }

    if (permissions.includes(Permission.ADMIN_ACCESS)) {
      routes.push('/admin');
    }

    return routes;
  }
}
