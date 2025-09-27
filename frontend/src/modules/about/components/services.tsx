import React from 'react'
import { useTranslation } from 'react-i18next'
import { about } from '@/common/locales'
import { SERVICES } from '../constants'

export function Services() {
  const { t } = useTranslation(about)

  return (
    <div className="mb-16 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-8 sm:mb-12">
        {t('howWeHelp')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-card p-6 rounded-lg shadow-md border text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={service.icon}
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2 text-card-foreground">{t(service.title)}</h3>
            <p className="text-sm text-muted-foreground">{t(service.description)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
