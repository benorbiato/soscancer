import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { CardsList } from '@/modules/dashboard/components/cards-list'
import { MainLayout } from '@/components/layouts/main-layout'
import { useDashboard } from '@/modules/dashboard/hooks/use-dashboard'
import { ProtectedRoute } from '@/components/protected-route'
import { Permission } from '@/lib/permissions'

function DashboardView() {
  const { t } = useTranslation(dashboard)
  const { state } = useDashboard()

  return (
    <ProtectedRoute requiredPermission={Permission.VIEW_DASHBOARD}>
      <MainLayout>
        <div className="mb-8 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas atividades e acesse as funcionalidades
          </p>
        </div>
        <CardsList cards={state.cards} />
      </MainLayout>
    </ProtectedRoute>
  )
}

export { DashboardView }
