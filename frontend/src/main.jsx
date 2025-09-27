import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import './index.css'
import App from './App.jsx'
import RegisterPage from './pages/Register.jsx'
import AppLayout from './components/layouts/AppLayout.jsx'
import './lib/i18n'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
