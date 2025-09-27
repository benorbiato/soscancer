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
                <Input type="password" placeholder={t('password')} {...field} />
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
