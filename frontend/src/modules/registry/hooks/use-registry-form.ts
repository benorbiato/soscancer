import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { createUser } from '@/lib/api/users'
import { RegistryFormData, RegistryState } from '../types'
import { REGISTRY_CONSTANTS } from '../constants'

const registrySchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: 'O nome é obrigatório.' })
      .min(REGISTRY_CONSTANTS.FORM_VALIDATION.MIN_NAME_LENGTH, {
        message: 'O nome deve ter no mínimo 2 caracteres.',
      }),
    email: z
      .string()
      .nonempty({ message: 'O email é obrigatório.' })
      .email({ message: 'Insira um email válido.' }),
    password: z
      .string()
      .nonempty({ message: 'A senha é obrigatória.' })
      .min(REGISTRY_CONSTANTS.FORM_VALIDATION.MIN_PASSWORD_LENGTH, {
        message: 'A senha deve ter no mínimo 6 caracteres.',
      }),
    confirmPassword: z.string().nonempty({ message: 'A confirmação de senha é obrigatória.' }),
    phone: z.string().optional(),
    role: z.enum(['volunteer', 'patient', 'sponsor'], {
      message: 'Selecione uma opção',
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      message: REGISTRY_CONSTANTS.MESSAGES.ERROR.PASSWORDS_DONT_MATCH,
      path: ['confirmPassword'],
    },
  )

export function useRegistryForm() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [state, setState] = useState<RegistryState>({
    isSubmitting: false,
    showPassword: false,
    showConfirmPassword: false,
  })

  const form = useForm<RegistryFormData>({
    resolver: zodResolver(registrySchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      role: undefined,
    },
  })

  const formatPhone = useCallback((value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }, [])

  const handleSubmit = useCallback(
    async (values: RegistryFormData) => {
      setState((prev) => ({ ...prev, isSubmitting: true }))

      try {
        const userData = {
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          role: values.role,
        }

        const response = await createUser(userData)
        toast.success(
          REGISTRY_CONSTANTS.MESSAGES.SUCCESS.USER_CREATED,
          `${REGISTRY_CONSTANTS.MESSAGES.SUCCESS.WELCOME}, ${response.name}!`,
        )

        // Auto-login after successful registration
        try {
          await login(values.email, values.password)
          navigate('/dashboard')
        } catch (loginError) {
          console.error('Erro no login automático:', loginError)
          toast.info('Usuário criado!', 'Faça login para continuar')
        }

        form.reset()
      } catch (error) {
        console.error('Erro ao criar usuário:', error)
        toast.error(
          REGISTRY_CONSTANTS.MESSAGES.ERROR.USER_CREATION_FAILED,
          error instanceof Error ? error.message : 'Erro desconhecido',
        )
      } finally {
        setState((prev) => ({ ...prev, isSubmitting: false }))
      }
    },
    [login, navigate, toast, form],
  )

  const togglePasswordVisibility = useCallback((field: 'password' | 'confirmPassword') => {
    setState((prev) => ({
      ...prev,
      [`show${field.charAt(0).toUpperCase() + field.slice(1)}`]:
        !prev[`show${field.charAt(0).toUpperCase() + field.slice(1)}` as keyof RegistryState],
    }))
  }, [])

  return {
    form,
    state,
    handleSubmit,
    formatPhone,
    togglePasswordVisibility,
  }
}
