import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props {
  children: JSX.Element
}

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if(isAuthenticated === null) return <></>

  if (!isAuthenticated) {
    console.log('holaaaaa')
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
