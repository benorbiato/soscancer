import { useTranslation } from 'react-i18next'
import { registry } from '@/common/locales'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx'
import { RegisterForm } from './form'

export function RegisterCard() {
  const { t } = useTranslation(registry)

  return (
    <Card className="w-full max-w-sm border-brand-500 dark:border-border">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  )
}
