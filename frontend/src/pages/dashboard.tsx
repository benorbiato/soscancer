import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { CardsList } from '@/modules/dashboard/components/cards-list'
import { AuthenticatedHeader } from '@/components/layouts/authenticated-header'
import { useDashboard } from '@/modules/dashboard/hooks/use-dashboard'
import { ProtectedRoute } from '@/components/protected-route'
import { Permission } from '@/lib/permissions'

function DashboardView() {
  const { t } = useTranslation(dashboard)
  const { state } = useDashboard()

  return (
    <ProtectedRoute requiredPermission={Permission.VIEW_DASHBOARD}>
      <div className="min-h-screen bg-background">
        <AuthenticatedHeader />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas atividades e acesse as funcionalidades
            </p>
          </div>
          <CardsList cards={state.cards} />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export { DashboardView }
