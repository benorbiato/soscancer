import React from 'react'
import { useAuth } from '@/contexts/auth-context'
import { UnauthenticatedHeader } from './unauthenticated-header'
import { AuthenticatedHeader } from './authenticated-header'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className = '' }: MainLayoutProps) {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
        {children}
      </div>
    </div>
  )
}
