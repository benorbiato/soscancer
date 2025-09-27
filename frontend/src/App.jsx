import '../app/global.css'
import { LoginView } from './pages/Login'
import { ToastProvider } from './components/ui/toast'

function App() {
  return (
    <>
      <LoginView />
      <ToastProvider />
    </>
  )
}

export default App
