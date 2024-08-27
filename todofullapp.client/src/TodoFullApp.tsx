import './App.css'
import { AuthProvider } from './Context/AuthContext'
import AuthRoutes from './routes/AuthRoutes'

function App() {
  return (
    <>
      <AuthProvider>
        <AuthRoutes />
      </AuthProvider>
    </>
  )
}

export default App
