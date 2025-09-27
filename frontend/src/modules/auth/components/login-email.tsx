'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { auth } from '@/common/locales'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { validateEmail, validatePassword } from '@/lib/validators'

const formSchema = z.object({
  email: z.string().min(1, {
    message: 'Email é obrigatório.',
  }).email({
    message: 'Insira um email válido.',
  }),
  password: z.string().min(1, {
    message: 'Senha é obrigatória.',
  }).min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
})

function LoginEmail() {
  const { t } = useTranslation(auth)
  const { login, isLoading } = useAuth()
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted with values:', { email: values.email, password: '***' })
      await login(values.email, values.password)
      // Redirect is handled by the auth context
    } catch (error) {
      // Error handling is done in the auth context
      console.error('Login error:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder={t('email')} {...field} />
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
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t('password')} 
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

        <Button type="submit" className="w-full" disabled={isLoading} variant="default" size="default">
          {isLoading ? 'Fazendo login...' : t('continueLogin')}
        </Button>
      </form>
    </Form>
  )
}

export { LoginEmail }
