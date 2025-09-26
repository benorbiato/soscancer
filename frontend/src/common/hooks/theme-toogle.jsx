import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'))

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

export { ThemeToggle }
