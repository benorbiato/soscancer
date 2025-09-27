import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'
import { Breadcrumb } from '@/common/components/breadcrumb'
import { NavigationMenu, MobileMenu, ThemeToggle, LogoutButton } from '@/common/components/header'
import { useBreadcrumb } from '@/hooks/use-breadcrumb'

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
  const { breadcrumbItems } = useBreadcrumb()

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
    <>
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="font-bold text-lg text-foreground hover:opacity-80 transition-opacity"
            >
              SOS Cancer
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu />
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            <LogoutButton onLogout={handleLogout} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
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
        <MobileMenu
          isOpen={isMenuOpen}
          user={user}
          onClose={() => setIsMenuOpen(false)}
          onLogout={handleLogout}
        />
      </header>

      {/* Breadcrumb */}
      {breadcrumbItems.length > 0 && (
        <div className="bg-muted/30 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      )}
    </>
  )
}

export { AuthenticatedHeader }
