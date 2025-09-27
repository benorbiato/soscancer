import React from 'react'
import { useTranslation } from 'react-i18next'
import { about } from '@/common/locales'

export function Hero() {
  const { t } = useTranslation(about)

  return (
    <div className="text-center mb-16 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6">
        {t('title')}
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
        {t('subtitle')}
      </p>
    </div>
  )
}
