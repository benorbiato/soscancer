'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const formSchema = z.object({
  username: z
    .string()
    .nonempty({ message: 'O nome de usuário é obrigatório.' })
    .min(2, { message: 'Username must be at least 2 characters.' }),

  email: z
    .string()
    .nonempty({ message: 'O email é obrigatório.' })
    .email({ message: 'Insira um email válido.' }),

  password: z
    .string()
    .nonempty({ message: 'A senha é obrigatória.' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),

  phone: z.string().nonempty({ message: 'O telefone é obrigatório.' }),

  role: z.enum(['volunteer', 'patient', 'sponsor'], {
    required_error: 'Selecione uma opção',
  }),
})

function RegisterForm() {
  const { t } = useTranslation(registry)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      role: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
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
                <Input type="password" {...field} />
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
                <Input {...field} />
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

        <Button type="submit" className="w-full">
          {t('signUp')}
        </Button>

        <Button variant="outline" className="w-full">
          {t('loginWithGoogle')}
        </Button>
      </form>
    </Form>
  )
}

export { RegisterForm }
