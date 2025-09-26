import { Link, NavLink, Outlet } from 'react-router-dom'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch.jsx'

export default function AppLayout() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gradient-to-r from-red-400 to-orange-400 text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-wide">
            soscancer
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) => `hover:underline ${isActive ? 'font-semibold' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => `hover:underline ${isActive ? 'font-semibold' : ''}`}
            >
              Register
            </NavLink>
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-90">Dark</span>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 text-xs text-gray-600">
          © {new Date().getFullYear()} soscancer
        </div>
      </footer>
    </div>
  )
}
