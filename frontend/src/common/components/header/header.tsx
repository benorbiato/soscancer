'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

function isThemeSetToDark(): boolean {
  if (typeof window === 'undefined') return false

  return (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

function Header() {
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
    <header className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white shadow-md dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold tracking-wide text-lg hover:opacity-90 transition-opacity"
        >
          soscancer
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative pb-1 transition ${
                isActive
                  ? 'font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-white'
                  : 'hover:opacity-90'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `relative pb-1 transition ${
                isActive
                  ? 'font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-white'
                  : 'hover:opacity-90'
              }`
            }
          >
            Register
          </NavLink>

          <button onClick={toggleTheme} className="flex items-center" aria-label="Toggle theme">
            {isDarkMode ? (
              <Moon
                strokeWidth={1.4}
                className="size-5 fill-gray-700 transition-transform sm:hover:rotate-45"
              />
            ) : (
              <Sun
                strokeWidth={1.4}
                className="size-5 fill-yellow-300 transition-transform sm:hover:rotate-45"
              />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

export { Header }
