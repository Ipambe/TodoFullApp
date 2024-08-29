import axios from 'axios'
import { type User } from '../types'
import { succesfulRequest } from './succesfulRequest'

const axiosRequestConfig = {
  withCredentials: true,
  validateStatus: (status: number) => {
    return status < 500
  }
}

export const authenticate = async (user: User) => {
  try {
    const res = await axios.post('auth/login', user, axiosRequestConfig)
    return succesfulRequest(res)
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log('Error message:', e.message)
    } else {
      console.log('Unknown error:', e)
    }
  }
}
interface RegisterUser extends User {
  confirmPassword: string
}
export const register = async (user: RegisterUser) => {
  const res = await axios.post('auth/register', user, axiosRequestConfig)
  return res
}

export const logout = async () => {
  try {
    const res = await axios.post('auth/logout', axiosRequestConfig)
    return succesfulRequest(res)
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log('Error message:', e.message)
    } else {
      console.log('Unknown error:', e)
    }
  }
}

export const verify = async () => {
  try {
    const res = await axios.get('auth/verify', axiosRequestConfig)
    return succesfulRequest(res)
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log('Error message:', e.message)
    } else {
      console.log('Unknown error:', e)
    }
  }
}
