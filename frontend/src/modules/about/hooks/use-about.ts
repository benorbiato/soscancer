import { useState, useEffect } from 'react'
import { AboutState } from '../types'
import { VALUES, SERVICES } from '../constants'

export function useAbout() {
  const [state, setState] = useState<AboutState>({
    values: [],
    services: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    try {
      setState({
        values: VALUES,
        services: SERVICES,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }))
    }
  }, [])

  return state
}
