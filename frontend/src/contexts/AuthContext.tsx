import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AuthState, User, TokenResponse } from '@/types'
import { loginUser, refreshToken } from '@/lib/api/auth'
import { useToast } from '@/hooks/use-toast'

// Auth actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: TokenResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_TOKEN'; payload: string }
  | { type: 'SET_USER'; payload: User }

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
      return {
        ...state,
        user: {
          id: action.payload.user_id,
          name: action.payload.user_name,
          email: action.payload.user_email,
        },
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
    default:
      return state
  }
}

// Auth context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshAuthToken: () => Promise<void>
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
    const token = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    const userStr = localStorage.getItem('user')

    if (token && refreshToken && userStr) {
      try {
        const user = JSON.parse(userStr)
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            access_token: token,
            refresh_token: refreshToken,
            user_id: user.id,
            user_name: user.name,
            user_email: user.email,
            token_type: 'bearer',
          },
        })
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
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
    } else {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }
  }, [state.isAuthenticated, state.user, state.token, state.refreshToken])

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOGIN_START' })
      const response = await loginUser({ email, password })
      dispatch({ type: 'LOGIN_SUCCESS', payload: response })
      toast.success('Login realizado com sucesso!', `Bem-vindo, ${response.user_name}`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage })
      toast.error('Erro no login', errorMessage)
      throw error
    }
  }

  const logout = () => {
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

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuthToken,
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
