import React from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

interface LogoutButtonProps {
  onLogout: () => void
  className?: string
  variant?: 'default' | 'outline'
  size?: 'sm' | 'default' | 'lg'
}

export function LogoutButton({ 
  onLogout, 
  className = '', 
  variant = 'outline',
  size = 'sm' 
}: LogoutButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onLogout}
      className={`flex items-center gap-2 border-brand-300 text-brand-700 hover:bg-brand-50 hover:border-brand-400 hover:text-brand-800 dark:border-brand-600 dark:text-brand-300 dark:hover:bg-brand-900 dark:hover:border-brand-500 dark:hover:text-brand-200 ${className}`}
    >
      <LogOut className="size-4" />
      Sair
    </Button>
  )
}
