'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { registry } from '@/common/locales'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { createUser } from '@/lib/api/users'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'O nome é obrigatório.' })
    .min(2, { message: 'O nome deve ter no mínimo 2 caracteres.' }),

  email: z
    .string()
    .nonempty({ message: 'O email é obrigatório.' })
    .email({ message: 'Insira um email válido.' }),

  password: z
    .string()
    .nonempty({ message: 'A senha é obrigatória.' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),

  confirmPassword: z
    .string()
    .nonempty({ message: 'A confirmação de senha é obrigatória.' }),

  phone: z.string().optional(),

  role: z.enum(['volunteer', 'patient', 'sponsor'], {
    message: 'Selecione uma opção',
  }),
}).refine((data) => {
  return data.password === data.confirmPassword
}, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

function RegisterForm() {
  const { t } = useTranslation(registry)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const toast = useToast()
  const { login } = useAuth()
  const navigate = useNavigate()

  // Função para formatar telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      role: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || null,
        role: values.role,
      }
      
      const response = await createUser(userData)
      toast.success('Usuário criado com sucesso!', `Bem-vindo, ${response.name}!`)
      
      // Auto-login after successful registration
      try {
        await login(values.email, values.password)
        navigate('/dashboard')
      } catch (loginError) {
        console.error('Erro no login automático:', loginError)
        // If auto-login fails, just show success message
        toast.info('Usuário criado!', 'Faça login para continuar')
      }
      
      form.reset()
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      toast.error('Erro ao criar usuário', error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.usernameLabel')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.emailLabel')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('register.emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.passwordLabel')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Digite a senha novamente"
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.phoneLabel')}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="(11) 99999-9999"
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    field.onChange(formatted)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.roleLabel')}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('register.rolePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="volunteer">Voluntário</SelectItem>
                    <SelectItem value="patient">Paciente</SelectItem>
                    <SelectItem value="sponsor">Apoiador</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting} variant="default" size="default">
          {isSubmitting ? 'Criando usuário...' : t('signUp')}
        </Button>

        <Button variant="outline" className="w-full" size="default">
          {t('loginWithGoogle')}
        </Button>
      </form>
    </Form>
  )
}

export { RegisterForm }
