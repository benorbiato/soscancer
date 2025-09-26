import { Outlet } from 'react-router-dom'
import { ThemeToggle } from '@/common/hooks/theme-toogle'
import { Header } from '@/common/components/header/header'

export default function AppLayout() {
  const { theme, setTheme } = ThemeToggle()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors">
      <Header theme={theme} setTheme={setTheme} />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t bg-white dark:bg-gray-900 dark:text-gray-300 transition-colors">
        <div className="max-w-5xl mx-auto px-4 py-4 text-xs">
          © {new Date().getFullYear()} soscancer
        </div>
      </footer>
    </div>
  )
}
