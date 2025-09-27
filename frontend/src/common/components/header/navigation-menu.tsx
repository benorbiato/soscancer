import React from 'react'
import { Link } from 'react-router-dom'
import { Permission } from '@/lib/permissions'
import { PermissionGuard } from '@/components/permission-guard'

interface NavigationMenuProps {
  className?: string
  onLinkClick?: () => void
}

export function NavigationMenu({ className = '', onLinkClick }: NavigationMenuProps) {
  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      <PermissionGuard permission={Permission.VIEW_DASHBOARD}>
        <Link
          to="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={onLinkClick}
        >
          Início
        </Link>
      </PermissionGuard>

      <PermissionGuard permission={Permission.VIEW_SETTINGS}>
        <Link
          to="/settings"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={onLinkClick}
        >
          Configurações
        </Link>
      </PermissionGuard>

      <PermissionGuard permission={Permission.ADMIN_ACCESS}>
        <Link
          to="/admin"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={onLinkClick}
        >
          Gerenciamento
        </Link>
      </PermissionGuard>
    </nav>
  )
}
