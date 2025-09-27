import React from 'react'
import { User, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Permission } from '@/lib/permissions'
import { PermissionGuard } from '@/components/permission-guard'

interface MobileMenuProps {
  isOpen: boolean
  user: {
    name?: string
    email?: string
  } | null
  onClose: () => void
  onLogout: () => void
}

export function MobileMenu({ isOpen, user, onClose, onLogout }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="px-4 py-4 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-border/50">
          <User className="size-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            Olá, {user?.name || user?.email?.split('@')[0] || 'Usuário'}
          </span>
        </div>

        <nav className="space-y-2">
          <PermissionGuard permission={Permission.VIEW_DASHBOARD}>
            <Link
              to="/dashboard"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={onClose}
            >
              Dashboard
            </Link>
          </PermissionGuard>

          <PermissionGuard permission={Permission.VIEW_AGENDA}>
            <Link
              to="/agenda"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={onClose}
            >
              Agenda
            </Link>
          </PermissionGuard>

          <PermissionGuard permission={Permission.VIEW_SETTINGS}>
            <Link
              to="/settings"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={onClose}
            >
              Configurações
            </Link>
          </PermissionGuard>

          <PermissionGuard permission={Permission.ADMIN_ACCESS}>
            <Link
              to="/admin"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={onClose}
            >
              Gerenciamento
            </Link>
          </PermissionGuard>
        </nav>

        <div className="pt-3 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="w-full flex items-center gap-2 border-brand-300 text-brand-700 hover:bg-brand-50 hover:border-brand-400 hover:text-brand-800 dark:border-brand-600 dark:text-brand-300 dark:hover:bg-brand-900 dark:hover:border-brand-500 dark:hover:text-brand-200"
          >
            <LogOut className="size-4" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
}
