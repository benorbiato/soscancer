import '../app/global.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import { ToastProvider } from './components/ui/toast.jsx'
import { HomeView, LoginView, RegisterView, DashboardView, AboutView } from './pages'
import Settings from './modules/settings'
import Agenda from './pages/agenda'
import { ProtectedRoute } from './components/protected-route'
import { Permission } from './lib/permissions'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredPermission={Permission.VIEW_DASHBOARD}>
                  <DashboardView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute requiredPermission={Permission.VIEW_SETTINGS}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agenda"
              element={
                <ProtectedRoute requiredPermission={Permission.VIEW_AGENDA}>
                  <Agenda />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <ToastProvider />
      </Router>
    </AuthProvider>
  )
}

export default App
