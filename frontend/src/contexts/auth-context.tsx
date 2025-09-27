import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AuthState, User, TokenResponse } from '@/types'
import { loginUser, refreshToken } from '@/lib/api/auth'
import { useToast } from '@/hooks/use-toast'
import { Permission, PermissionChecker } from '@/lib/permissions'

// Auth actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: TokenResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_TOKEN'; payload: string }
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
}

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      }
    case 'LOGIN_SUCCESS':
      const newUser = {
        id: action.payload.user_id,
        name: action.payload.user_name,
        email: action.payload.user_email,
        role: action.payload.user_role,
      }
      return {
        ...state,
        user: newUser,
        token: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        isAuthenticated: true,
        isLoading: false,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'REFRESH_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
    default:
      return state
  }
}

// Auth context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshAuthToken: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  // Permission methods
  hasPermission: (permission: Permission) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
  getPermissions: () => Permission[]
  getAccessibleRoutes: () => string[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const toast = useToast()

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const accessToken = localStorage.getItem('access_token')

    if (storedUser && accessToken) {
      try {
        const user = JSON.parse(storedUser)
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            access_token: accessToken,
            refresh_token: localStorage.getItem('refresh_token') || '',
            user_id: user.id,
            user_name: user.name,
            user_email: user.email,
            user_role: user.role,
            token_type: 'bearer',
          },
        })
      } catch (error) {
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        dispatch({ type: 'LOGOUT' })
      }
    } else {
      dispatch({ type: 'LOGOUT' })
    }
  }, [])

  // Save auth state to localStorage when it changes
  useEffect(() => {
    if (state.isAuthenticated && state.user && state.token) {
      localStorage.setItem('access_token', state.token)
      localStorage.setItem('refresh_token', state.refreshToken || '')
      localStorage.setItem('user', JSON.stringify(state.user))
    } else if (state.isAuthenticated === false && !state.isLoading) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }
  }, [state.isAuthenticated, state.user, state.token, state.refreshToken])

  const login = async (email: string, password: string) => {
    try {
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_name')
      localStorage.removeItem('user_email')

      dispatch({ type: 'LOGIN_START' })
      const response = await loginUser({ email, password })

      dispatch({ type: 'LOGIN_SUCCESS', payload: response })
      toast.success('Login realizado com sucesso!', `Bem-vindo, ${response.user_name}`)

      setTimeout(() => {
        window.location.replace('/dashboard')
      }, 500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage })
      toast.error('Erro no login', errorMessage)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_email')

    dispatch({ type: 'LOGOUT' })
    toast.info('Logout realizado', 'Você foi desconectado com sucesso')
  }

  const refreshAuthToken = async () => {
    if (!state.refreshToken) {
      dispatch({ type: 'LOGOUT' })
      return
    }

    try {
      const response = await refreshToken({ refresh_token: state.refreshToken })
      dispatch({ type: 'REFRESH_TOKEN', payload: response.access_token })
    } catch (error) {
      dispatch({ type: 'LOGOUT' })
      toast.error('Sessão expirada', 'Faça login novamente')
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    try {
      // Aqui você implementaria a chamada para a API de atualização
      // Por enquanto, apenas atualizamos o estado local
      dispatch({ type: 'UPDATE_USER', payload: userData })

      // Atualizar localStorage se necessário
      if (userData.name) {
        localStorage.setItem('user_name', userData.name)
      }
      if (userData.email) {
        localStorage.setItem('user_email', userData.email)
      }

      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil', 'Tente novamente mais tarde')
      throw error
    }
  }

  // Permission methods
  const hasPermission = (permission: Permission): boolean => {
    const userRole = state.user?.role || 'user'
    return PermissionChecker.hasPermission(userRole, permission)
  }

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    const userRole = state.user?.role || 'user'
    return PermissionChecker.hasAnyPermission(userRole, permissions)
  }

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    const userRole = state.user?.role || 'user'
    return PermissionChecker.hasAllPermissions(userRole, permissions)
  }

  const getPermissions = (): Permission[] => {
    const userRole = state.user?.role || 'user'
    return PermissionChecker.getPermissionsForRole(userRole)
  }

  const getAccessibleRoutes = (): string[] => {
    const userRole = state.user?.role || 'user'
    return PermissionChecker.getAccessibleRoutes(userRole)
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuthToken,
    updateUser,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getPermissions,
    getAccessibleRoutes,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Auth hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
