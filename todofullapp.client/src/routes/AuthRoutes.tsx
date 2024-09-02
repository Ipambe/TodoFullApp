import PrivateRoute from '@components/PrivateRoute'
import Home from '@pages/Home'
import Login from '@pages/Login'
import { Route, Routes } from 'react-router-dom'

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
