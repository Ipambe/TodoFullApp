import axios from 'axios'
import { type User } from '../types'

export const login = async (user: User) => {
  const res = await axios.post('auth/login', user, {
    withCredentials: true,
  })
  return res
}

export const register = async (user: User) => {
  const response = await axios.post('auth/register', user, {
    withCredentials: true,
  })
  return response
}

export const logout = async () => {
  const response = await axios.post('auth/logout', {
    withCredentials: true,
  })
  return response
}

export const verify = async () => {
  const response = await axios.get('auth/verify', {
    withCredentials: true,
  })
  return response
}
