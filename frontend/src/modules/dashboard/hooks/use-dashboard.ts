import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { DashboardState } from '../types'
import { DASHBOARD_CONSTANTS } from '../constants'

export function useDashboard() {
  const { user } = useAuth()
  
  const [state, setState] = useState<DashboardState>({
    isLoading: false,
    cards: DASHBOARD_CONSTANTS.CARDS,
  })

  useEffect(() => {
    // Aqui você poderia carregar dados específicos do dashboard
    // Por enquanto, usamos os dados estáticos das constantes
    setState(prev => ({ ...prev, cards: DASHBOARD_CONSTANTS.CARDS }))
  }, [])

  return {
    state,
    user,
  }
}
