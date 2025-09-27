import React, { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X, User, LogOut, Settings } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'

function isThemeSetToDark(): boolean {
  if (typeof window === 'undefined') return false

  return (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

function AuthenticatedHeader() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isThemeSetToDark)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="font-bold text-lg text-foreground hover:opacity-80 transition-opacity"
          >
            SOS Cancer
          </Link>
          <span className="text-sm text-muted-foreground hidden md:block">
            Olá, {user?.name || user?.email?.split('@')[0] || 'Usuário'}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          
          <Link
            to="/agenda"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Agenda
          </Link>

          <button 
            onClick={toggleTheme} 
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors" 
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Moon className="size-4 text-muted-foreground" />
            ) : (
              <Sun className="size-4 text-muted-foreground" />
            )}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 border-brand-300 text-brand-700 hover:bg-brand-50 hover:border-brand-400 hover:text-brand-800 dark:border-brand-600 dark:text-brand-300 dark:hover:bg-brand-900 dark:hover:border-brand-500 dark:hover:text-brand-200"
          >
            <LogOut className="size-4" />
            Sair
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={toggleTheme} 
            className="flex items-center p-2 rounded-md hover:bg-muted transition-colors" 
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Moon className="size-4 text-muted-foreground" />
            ) : (
              <Sun className="size-4 text-muted-foreground" />
            )}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="size-5 text-muted-foreground" />
            ) : (
              <Menu className="size-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border/50">
              <User className="size-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                Olá, {user?.name || user?.email?.split('@')[0] || 'Usuário'}
              </span>
            </div>
            
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              
              <Link
                to="/agenda"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Agenda
              </Link>
            </nav>

            <div className="pt-3 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 border-brand-300 text-brand-700 hover:bg-brand-50 hover:border-brand-400 hover:text-brand-800 dark:border-brand-600 dark:text-brand-300 dark:hover:bg-brand-900 dark:hover:border-brand-500 dark:hover:text-brand-200"
              >
                <LogOut className="size-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export { AuthenticatedHeader }
