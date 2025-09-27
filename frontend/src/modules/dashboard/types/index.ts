export interface DashboardCard {
  id: string
  title: string
  subtitle: string
  url: string
  icon?: string
}

export interface UpcomingEvent {
  id: string
  title: string
  description: string
  date: string
  location?: string
  type: 'normal' | 'urgent'
}

export interface BalanceData {
  totalRaised: number
  monthlyGoal: number
  donorsCount: number
  growthRate: number
}

export interface ProjectStatsData {
  patientsHelped: number
  eventsHeld: number
  volunteers: number
  materialsDistributed: number
  supportCalls: number
  citiesReached: number
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  category: 'update' | 'event' | 'achievement' | 'announcement'
  readMoreUrl?: string
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  url: string
  variant: 'default' | 'secondary' | 'outline'
  isExternal?: boolean
}

export interface DashboardState {
  isLoading: boolean
  cards: DashboardCard[]
  events: UpcomingEvent[]
  balance: BalanceData
  stats: ProjectStatsData
  news: NewsItem[]
  quickActions: QuickAction[]
}
