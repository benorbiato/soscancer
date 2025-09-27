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
