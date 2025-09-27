import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { DashboardState } from '../types'
import { DASHBOARD_CONSTANTS } from '../constants'

export function useDashboard() {
  const { user } = useAuth()

  const [state, setState] = useState<DashboardState>({
    isLoading: false,
    cards: DASHBOARD_CONSTANTS.CARDS,
    events: DASHBOARD_CONSTANTS.EVENTS,
    balance: DASHBOARD_CONSTANTS.BALANCE,
    stats: DASHBOARD_CONSTANTS.STATS,
    news: DASHBOARD_CONSTANTS.NEWS,
    quickActions: DASHBOARD_CONSTANTS.QUICK_ACTIONS,
  })

  useEffect(() => {
    // Aqui você poderia carregar dados específicos do dashboard
    // Por enquanto, usamos os dados estáticos das constantes
    setState((prev) => ({
      ...prev,
      cards: DASHBOARD_CONSTANTS.CARDS,
      events: DASHBOARD_CONSTANTS.EVENTS,
      balance: DASHBOARD_CONSTANTS.BALANCE,
      stats: DASHBOARD_CONSTANTS.STATS,
      news: DASHBOARD_CONSTANTS.NEWS,
      quickActions: DASHBOARD_CONSTANTS.QUICK_ACTIONS,
    }))
  }, [])

  return {
    state,
    user,
  }
}
