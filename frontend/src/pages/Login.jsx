import { useTranslation } from 'react-i18next'

import { Auth } from '@/modules/auth'

function LoginView() {
  const { t } = useTranslation()

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <div className="w-full max-w-md text-center">
        <Auth />
      </div>
    </div>
  )
}

export { LoginView }
