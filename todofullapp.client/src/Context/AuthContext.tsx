import React, { createContext, useState, useEffect, ReactNode } from 'react'
import {
  verify as verifyUser,
  login as loginUser,
  logout
} from '../helpers/auth'
import { succesfulRequest } from '../helpers/succesfulRequest'
import { AuthContextType, User } from '../types'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await verifyUser()

        if (succesfulRequest(res.status)) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  const login = async ({ username, password }: User) => {
    try {
      const res = await loginUser({ username, password })

      if (succesfulRequest(res.status)) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error en el login:', error)
      setIsAuthenticated(false)
    }
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
