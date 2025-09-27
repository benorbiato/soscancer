import { Event } from '../types'
import { getCurrentBrazilianDate, compareBrazilianDates } from '@/lib/date-utils'

export const EVENT_TYPES = {
  consultation: {
    label: 'Consulta',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    icon: '🩺',
  },
  examination: {
    label: 'Exame',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: '🔬',
  },
  treatment: {
    label: 'Tratamento',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    icon: '💊',
  },
  reminder: {
    label: 'Lembrete',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    icon: '⏰',
  },
} as const

export const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Leilão Beneficente',
    description: 'XX Leilão',
    date: '2025-10-08',
    time: '09:00',
    location: 'Pongaí - SP',
    type: 'reminder',
    status: 'scheduled',
  },
]

export const getUpcomingEvents = (events: Event[], limit: number = 5): Event[] => {
  const today = getCurrentBrazilianDate()

  return events
    .filter((event) => event.date >= today && event.status === 'scheduled')
    .sort((a, b) => compareBrazilianDates(a.date, b.date))
    .slice(0, limit)
}

export const getEventsByDate = (events: Event[], date: string): Event[] => {
  return events.filter((event) => event.date === date)
}

export const getEventDates = (events: Event[]): string[] => {
  const dates = events.filter((event) => event.status === 'scheduled').map((event) => event.date)

  return [...new Set(dates)].sort()
}
