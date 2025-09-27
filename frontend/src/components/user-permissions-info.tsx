/**
 * Component to display user permissions information.
 * Useful for debugging and administration.
 */

import React, { useState } from 'react'
import { usePermissions } from '@/hooks/use-permissions'
import { Permission } from '@/lib/permissions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronRight, Shield, User, Settings } from 'lucide-react'

interface UserPermissionsInfoProps {
  showDetails?: boolean
  className?: string
}

export function UserPermissionsInfo({
  showDetails = false,
  className = '',
}: UserPermissionsInfoProps) {
  const [isExpanded, setIsExpanded] = useState(showDetails)
  const {
    user,
    userRole,
    getPermissions,
    getAccessibleRoutes,
    canViewDashboard,
    canViewAgenda,
    canCreateEvents,
    canViewSettings,
    isAdmin,
  } = usePermissions()

  const permissions = getPermissions()
  const accessibleRoutes = getAccessibleRoutes()

  const permissionGroups = {
    Dashboard: [
      {
        permission: Permission.VIEW_DASHBOARD,
        label: 'Ver Dashboard',
        hasPermission: canViewDashboard(),
      },
      {
        permission: Permission.VIEW_ANALYTICS,
        label: 'Ver Analytics',
        hasPermission: canViewAnalytics(),
      },
    ],
    Agenda: [
      { permission: Permission.VIEW_AGENDA, label: 'Ver Agenda', hasPermission: canViewAgenda() },
      {
        permission: Permission.CREATE_EVENTS,
        label: 'Criar Eventos',
        hasPermission: canCreateEvents(),
      },
      {
        permission: Permission.UPDATE_EVENTS,
        label: 'Editar Eventos',
        hasPermission: canUpdateEvents(),
      },
      {
        permission: Permission.DELETE_EVENTS,
        label: 'Deletar Eventos',
        hasPermission: canDeleteEvents(),
      },
      {
        permission: Permission.MANAGE_AGENDA,
        label: 'Gerenciar Agenda',
        hasPermission: canManageAgenda(),
      },
    ],
    Configurações: [
      {
        permission: Permission.VIEW_SETTINGS,
        label: 'Ver Configurações',
        hasPermission: canViewSettings(),
      },
      {
        permission: Permission.UPDATE_PROFILE,
        label: 'Atualizar Perfil',
        hasPermission: canUpdateProfile(),
      },
      {
        permission: Permission.DELETE_ACCOUNT,
        label: 'Deletar Conta',
        hasPermission: canDeleteAccount(),
      },
    ],
    Usuários: [
      { permission: Permission.VIEW_USERS, label: 'Ver Usuários', hasPermission: canViewUsers() },
      {
        permission: Permission.CREATE_USERS,
        label: 'Criar Usuários',
        hasPermission: canCreateUsers(),
      },
      {
        permission: Permission.UPDATE_USERS,
        label: 'Editar Usuários',
        hasPermission: canUpdateUsers(),
      },
      {
        permission: Permission.DELETE_USERS,
        label: 'Deletar Usuários',
        hasPermission: canDeleteUsers(),
      },
    ],
    Admin: [
      { permission: Permission.ADMIN_ACCESS, label: 'Acesso Admin', hasPermission: isAdmin() },
      {
        permission: Permission.SYSTEM_SETTINGS,
        label: 'Configurações do Sistema',
        hasPermission: canAccessSystemSettings(),
      },
    ],
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">Permissões do Usuário</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1"
        >
          {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          {isExpanded ? 'Ocultar' : 'Mostrar'}
        </Button>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
        <User className="size-4 text-muted-foreground" />
        <div>
          <p className="font-medium">{user?.name || 'Usuário'}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          {userRole}
        </Badge>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Permission Groups */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Settings className="size-4" />
              Permissões por Categoria
            </h4>
            <div className="space-y-3">
              {Object.entries(permissionGroups).map(([groupName, groupPermissions]) => (
                <div key={groupName} className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-2 text-muted-foreground">{groupName}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {groupPermissions.map(({ permission, label, hasPermission }) => (
                      <div key={permission} className="flex items-center gap-2 text-sm">
                        <Badge
                          variant={hasPermission ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {hasPermission ? 'Sim' : 'Não'}
                        </Badge>
                        <span
                          className={hasPermission ? 'text-foreground' : 'text-muted-foreground'}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessible Routes */}
          <div>
            <h4 className="font-medium mb-2">Rotas Acessíveis</h4>
            <div className="flex flex-wrap gap-2">
              {accessibleRoutes.map((route) => (
                <Badge key={route} variant="outline" className="text-xs">
                  {route}
                </Badge>
              ))}
            </div>
          </div>

          {/* Permission Count */}
          <div className="text-sm text-muted-foreground">
            Total de permissões: {permissions.length}
          </div>
        </div>
      )}
    </Card>
  )
}
