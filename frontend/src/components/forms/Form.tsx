import React, { ReactNode } from 'react'
import { BaseComponentProps } from '@/types'

interface FormProps extends BaseComponentProps {
  onSubmit: (e: React.FormEvent) => void
  children: ReactNode
  loading?: boolean
}

export function Form({ 
  onSubmit, 
  children, 
  loading = false, 
  className = '' 
}: FormProps) {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`space-y-6 ${className}`}
      noValidate
    >
      <fieldset disabled={loading}>
        {children}
      </fieldset>
    </form>
  )
}
