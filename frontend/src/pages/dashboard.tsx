import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import '../modules/dashboard/dashboard.css'
import { CardsList } from '@/modules/dashboard/components/cards-list'
import { UpcomingEvents } from '@/modules/dashboard/components/upcoming-events'
import { DonationQR } from '@/modules/dashboard/components/donation-qr'
import { BalanceSummary } from '@/modules/dashboard/components/balance-summary'
import { ProjectStats } from '@/modules/dashboard/components/project-stats'
import { LatestNews } from '@/modules/dashboard/components/latest-news'
import { QuickActions } from '@/modules/dashboard/components/quick-actions'
import { MainLayout } from '@/components/layouts/main-layout'
import { useDashboard } from '@/modules/dashboard/hooks/use-dashboard'
import { ProtectedRoute } from '@/components/protected-route'
import { Permission } from '@/lib/permissions'

function DashboardView() {
  const { t } = useTranslation(dashboard)
  const { state, user } = useDashboard()

  return (
    <ProtectedRoute requiredPermission={Permission.VIEW_DASHBOARD}>
      <MainLayout>
        <div className="mb-8 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Olá, {user?.name || user?.email || 'Usuário'}
          </h1>
          <p className="text-muted-foreground mt-2">{t('welcome.subtitle')}</p>
        </div>
        <div className="px-4 space-y-8 pb-8">
          {/* Seção de Ações Rápidas */}
          <QuickActions actions={state.quickActions as any} />

          {/* Seção de Doações */}
          <DonationQR />

          {/* Seção de Estatísticas */}
          <ProjectStats stats={state.stats} />

          {/* Seção de Resumo Financeiro */}
          <BalanceSummary data={state.balance} />

          {/* Seção de Próximos Eventos e Notícias */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UpcomingEvents events={state.events} />
            <LatestNews news={state.news} />
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}

export { DashboardView }
