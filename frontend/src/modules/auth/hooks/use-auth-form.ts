import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { LoginFormData, AuthState } from '../types'
import { AUTH_CONSTANTS } from '../constants'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email é obrigatório.',
    })
    .email({
      message: 'Insira um email válido.',
    }),
  password: z
    .string()
    .min(1, {
      message: 'Senha é obrigatória.',
    })
    .min(AUTH_CONSTANTS.FORM_VALIDATION.MIN_PASSWORD_LENGTH, {
      message: 'A senha deve ter no mínimo 6 caracteres.',
    }),
})

export function useAuthForm() {
  const { login, isLoading } = useAuth()
  const toast = useToast()

  const [state, setState] = useState<AuthState>({
    isLoading: false,
    showPassword: false,
  })

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = useCallback(
    async (values: LoginFormData) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }))
        await login(values.email, values.password)
      } catch (error) {
        toast.error('Erro no login', error instanceof Error ? error.message : 'Erro desconhecido')
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    },
    [login, toast],
  )

  const togglePasswordVisibility = useCallback(() => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }))
  }, [])

  return {
    form,
    state,
    handleSubmit,
    togglePasswordVisibility,
  }
}
