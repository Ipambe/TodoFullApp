import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { type AuthContextType } from '../models/AuthContext.model'

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider')
  return context
}
