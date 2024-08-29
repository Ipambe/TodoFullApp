import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { verify, authenticate, logout as _logout } from '../helpers/auth'
import { AuthContextType, User } from '../types'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await verify()
      setIsAuthenticated(res || false)
    }
    checkAuth()
  }, [])

  const login = async ({ username, password }: User) => {
    try {
      const res = await authenticate({ username, password })
      setIsAuthenticated(res || false)
    } catch (error) {
      console.error('Error en el login:', error)
      setIsAuthenticated(false)
    }
  }

  const logout = async () => {
    const res = await _logout()
    setIsAuthenticated(!res || false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
