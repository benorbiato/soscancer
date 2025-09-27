import { Card } from '@/components/ui/card'
import { Headline, RegisterForm } from './components'

import { useTranslation } from 'react-i18next'

function Registry() {
  const { t } = useTranslation('auth')

  return (
    <Card className="w-full max-w-sm max-h-[90vh] overflow-hidden p-8 flex flex-col gap-4">
      <Headline />
      <RegisterForm />
    </Card>
  )
}

export { Registry }
