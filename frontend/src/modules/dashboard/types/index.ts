export interface DashboardCard {
  id: string
  title: string
  subtitle: string
  url: string
  icon?: string
}

export interface DashboardState {
  isLoading: boolean
  cards: DashboardCard[]
}
