import React from 'react'
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  isDarkMode: boolean
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ isDarkMode, onToggle, className = '' }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center p-2 rounded-md hover:bg-muted transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Moon className="size-4 text-muted-foreground" />
      ) : (
        <Sun className="size-4 text-muted-foreground" />
      )}
    </button>
  )
}
