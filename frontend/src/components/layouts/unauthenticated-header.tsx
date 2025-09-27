import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'

function isThemeSetToDark(): boolean {
  if (typeof window === 'undefined') return false

  return (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

function UnauthenticatedHeader() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isThemeSetToDark)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark'
    localStorage.theme = nextTheme
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold text-lg text-foreground hover:opacity-80 transition-opacity"
        >
          SOS Cancer
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/about"
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sobre
          </Link>

          <Link
            to="/login"
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cadastrar
          </Link>

          <button
            onClick={toggleTheme}
            className="flex items-center p-1.5 sm:p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Moon className="size-3.5 sm:size-4 text-muted-foreground" />
            ) : (
              <Sun className="size-3.5 sm:size-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export { UnauthenticatedHeader }
