import { useTranslation } from 'react-i18next'
import { auth } from '@/common/locales'

import { Button } from '@/components/ui/button'

import { LogoGoogle, LogoFacebook } from 'geist-icons'

function SocialMedias() {
  const { t } = useTranslation(auth)

  return (
    <>
      <h1 className="text-gray-500 text-sm">{t('loginWithMedias')}</h1>
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => console.log('Login with Google')}
        >
          <LogoGoogle />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => console.log('Login with Facebook')}
        >
          <LogoFacebook />
        </Button>
      </div>
    </>
  )
}

export { SocialMedias }
