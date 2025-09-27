'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { auth } from '@/common/locales'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginUser } from '@/lib/api/users'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  email: z.string().email({
    message: 'Insira um email válido.',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
})

function LoginEmail() {
  const { t } = useTranslation(auth)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      const response = await loginUser({
        email: values.email,
        password: values.password,
      })
      
      // Store token and user info in localStorage
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('user_id', response.user_id)
      localStorage.setItem('user_name', response.user_name)
      localStorage.setItem('user_email', response.user_email)
      
      toast.success('Login realizado com sucesso!', `Bem-vindo, ${response.user_name}`)
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1500)
      
    } catch (error) {
      console.error('Erro no login:', error)
      toast.error('Erro no login', error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setIsSubmitting(false)
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
                <Input type="password" placeholder={t('password')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting} variant="default" size="default">
          {isSubmitting ? 'Fazendo login...' : t('continueLogin')}
        </Button>
      </form>
    </Form>
  )
}

export { LoginEmail }
