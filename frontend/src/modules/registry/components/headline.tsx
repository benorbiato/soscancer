'use client'

import { useTranslation } from 'react-i18next'
import { registry } from '@/common/locales'

function Headline() {
  const { t } = useTranslation(registry)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <h1 className="font-bold text-2xl">{t('registryTitle')}</h1>
          </div>
          <h1 className="text-gray-500 text-sm">{t('registrySubtitle')}</h1>
        </div>
      </div>
    </div>
  )
}

export { Headline }
