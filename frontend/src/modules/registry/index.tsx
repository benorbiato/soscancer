import { Card } from '@/components/ui/card'
import { RegisterForm } from './components'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Registry() {
  const { t } = useTranslation('auth')

  return (
    <Card className="w-full max-w-sm max-h-[90vh] overflow-hidden p-8 flex flex-col gap-4">
      <RegisterForm />
    </Card>
  )
}

export { Registry }
