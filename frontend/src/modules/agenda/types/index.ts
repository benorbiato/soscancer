export interface Event {
  id: string
  title: string
  description?: string
  date: string // ISO date string
  time: string // HH:MM format
  location?: string
  type: 'consultation' | 'examination' | 'treatment' | 'reminder'
  status: 'scheduled' | 'completed' | 'cancelled'
  doctor?: string
  notes?: string
  displayDate?: string // Para lembretes, data de exibição
  originalDate?: string // Para lembretes, data original do evento
}

export interface EventDate {
  date: string // ISO date string
  hasEvents: boolean
  eventCount: number
}

export interface AgendaState {
  selectedDate: string | null
  events: Event[]
  upcomingEvents: Event[]
  isLoading: boolean
  error: string | null
}
