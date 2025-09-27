import React from 'react'
import { Registry } from '@/modules/registry'
import { UnauthenticatedHeader } from '@/components/layouts/unauthenticated-header'

function RegisterView() {
  return (
    <div className="min-h-screen bg-background">
      <UnauthenticatedHeader />
      <div className="flex h-[calc(100vh-73px)] items-center justify-center overflow-hidden">
        <div className="w-full max-w-md text-center">
          <Registry />
        </div>
      </div>
    </div>
  )
}

export { RegisterView }
