import React from 'react'
import { useTranslation } from 'react-i18next'
import { about } from '@/common/locales'
import { VALUES } from '../constants'

export function Values() {
  const { t } = useTranslation(about)

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center text-foreground mb-12">{t('ourValues')}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {VALUES.map((value) => (
          <div key={value.id} className="text-center p-6 bg-card rounded-lg shadow-md border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">{t(value.title)}</h3>
            <p className="text-muted-foreground">{t(value.description)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
