import React from 'react'
import { Registry } from '@/modules/registry'

function RegisterView() {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <div className="w-full max-w-md text-center">
        <Registry />
      </div>
    </div>
  )
}

export { RegisterView }
