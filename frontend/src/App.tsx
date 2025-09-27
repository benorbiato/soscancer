import '../app/global.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import { ToastProvider } from './components/ui/toast'
import { HomeView, LoginView, RegisterView, DashboardView } from './pages'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <ToastProvider />
      </Router>
    </AuthProvider>
  )
}

export default App
