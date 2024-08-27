import { Routes, Route } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Login from '../pages/Login'
import PrivateRoute from '../components/PrivateRoute'

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route
        path='/home'
        element={
          <PrivateRoute>
            <AppRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
