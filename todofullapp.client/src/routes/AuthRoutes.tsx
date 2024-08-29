import Home from '@/pages/Home'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import Login from '../pages/Login'

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  )
}
