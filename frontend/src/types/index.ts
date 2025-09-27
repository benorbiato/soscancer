// User types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role?: string
  profileImage?: string
  created_at?: string
  updated_at?: string
}

export interface UserCreate {
  name: string
  email: string
  password: string
  phone?: string
  role?: string
}

export interface UserUpdate {
  name?: string
  password?: string
  phone?: string
  role?: string
}

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface RefreshTokenRequest {
  refresh_token: string
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user_id: string
  user_name: string
  user_email: string
  user_role: string
}

export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// API types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  status: number
  details?: any
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'select'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

// Toast types
export interface ToastOptions {
  title: string
  description?: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
}

// Component props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export interface InputProps extends BaseComponentProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
}
