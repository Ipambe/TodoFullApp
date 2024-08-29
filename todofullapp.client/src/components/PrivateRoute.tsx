import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated === null) return <h1>Cargando....</h1>

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}
