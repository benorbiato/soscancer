export interface Value {
  id: string
  title: string
  description: string
  icon: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface AboutState {
  values: Value[]
  services: Service[]
  isLoading: boolean
  error: string | null
}
