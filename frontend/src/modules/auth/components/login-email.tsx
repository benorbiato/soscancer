'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { auth } from '@/common/locales'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useAuthForm } from '../hooks/use-auth-form'
import { useAuth } from '@/contexts/auth-context'

function LoginEmail() {
  const { t } = useTranslation(auth)
  const { form, state, handleSubmit, togglePasswordVisibility } = useAuthForm()
  const { isLoading: contextLoading } = useAuth()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                    type={state.showPassword ? 'text' : 'password'}
                    placeholder={t('password')}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {state.showPassword ? (
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

        <Button
          type="submit"
          className="w-full"
          disabled={state.isLoading || contextLoading}
          variant="default"
          size="default"
        >
          {state.isLoading || contextLoading ? 'Fazendo login...' : t('continueLogin')}
        </Button>
      </form>
    </Form>
  )
}

export { LoginEmail }
