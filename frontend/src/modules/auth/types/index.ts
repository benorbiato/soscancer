export interface LoginFormData {
  email: string
  password: string
}

export interface AuthState {
  isLoading: boolean
  showPassword: boolean
}

export interface SocialProvider {
  name: string
  icon: string
  href: string
  color: string
}
