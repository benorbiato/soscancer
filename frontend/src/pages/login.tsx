import React from 'react'
import { useTranslation } from 'react-i18next'
import { Auth } from '@/modules/auth'
import { UnauthenticatedHeader } from '@/components/layouts/unauthenticated-header'

function LoginView() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      <UnauthenticatedHeader />
      <div className="flex h-[calc(100vh-73px)] items-center justify-center overflow-hidden">
        <div className="w-full max-w-md text-center">
          <Auth />
        </div>
      </div>
    </div>
  )
}

export { LoginView }
