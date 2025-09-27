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
    // Check for the actual keys in localStorage
    const userId = localStorage.getItem('user_id')
    const userName = localStorage.getItem('user_name')
    const userEmail = localStorage.getItem('user_email')

    if (userId && userName && userEmail) {
      const user = {
        id: userId,
        name: userName,
        email: userEmail,
      }
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          access_token: 'stored_token', // We don't have the actual token stored
          refresh_token: 'stored_refresh_token',
          user_id: userId,
          user_name: userName,
          user_email: userEmail,
          token_type: 'bearer',
        },
      })
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
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 100)
    } catch (error) {
      console.error('Login error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: (error as any)?.status,
        data: (error as any)?.data,
        fullError: error
      })
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

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuthToken,
    updateUser,
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
