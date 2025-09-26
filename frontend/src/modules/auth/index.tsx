import { Card } from '@/components/ui/card'
import { Headline } from './components/headline'
import { SocialMedias } from './components/social-medias'
import { LoginEmail } from './components/login-email'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Auth() {
  const { t } = useTranslation('auth')

  return (
    <Card className="w-full max-w-sm max-h-[90vh] overflow-hidden p-8 flex flex-col gap-4">
      <Headline />
      <LoginEmail />
      <SocialMedias />

      <p className="text-sm text-center text-gray-600">
        {t('goToSignUp.text')}{' '}
        <Link to="/register" className="text-brand-600 hover:underline font-medium">
          {t('goToSignUp.link')}
        </Link>
      </p>
    </Card>
  )
}

export { Auth }
