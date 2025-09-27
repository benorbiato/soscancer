export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'volunteer' | 'patient' | 'sponsor' | 'supporter' | 'user'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  lastLogin: string
  createdAt: string
  updatedAt?: string
  avatar?: string
  phone?: string
  address?: string
  bio?: string
}

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  volunteers: number
  patients: number
  sponsors: number
  supporters: number
  eventsCount: number
  engagementRate: number
  systemUptime: number
}

export interface SystemSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    timezone: string
    language: string
    maintenanceMode: boolean
  }
  users: {
    allowRegistration: boolean
    requireEmailVerification: boolean
    allowPasswordReset: boolean
    maxLoginAttempts: number
    sessionTimeout: number
    requireTwoFactor: boolean
  }
  email: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    smsNotifications: boolean
    eventReminders: boolean
    systemAlerts: boolean
    weeklyDigest: boolean
  }
  security: {
    passwordMinLength: number
    requireSpecialChars: boolean
    requireNumbers: boolean
    requireUppercase: boolean
    sessionTimeout: number
    maxConcurrentSessions: number
    enableAuditLog: boolean
  }
}

export interface ActivityLog {
  id: number
  user: string
  action: string
  time: string
  type: 'event' | 'profile' | 'registration' | 'login' | 'logout' | 'admin'
  details?: string
}

export interface AdminNavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
  permission?: string
}
