import React from 'react'
import { useTranslation } from 'react-i18next'
import { about } from '@/common/locales'

export function Mission() {
  const { t } = useTranslation(about)

  return (
    <div className="mb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">{t('ourMission')}</h2>
          <p className="text-lg text-muted-foreground mb-4">{t('missionText1')}</p>
          <p className="text-lg text-muted-foreground">{t('missionText2')}</p>
        </div>
        <div className="bg-card p-8 rounded-lg shadow-lg border">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4 text-card-foreground">
            {t('careWithLove')}
          </h3>
          <p className="text-center text-muted-foreground">{t('careWithLoveText')}</p>
        </div>
      </div>
    </div>
  )
}
