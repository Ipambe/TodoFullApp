import { type User } from './User.model'

export interface AuthContextType {
  isAuthenticated: boolean | null
  login: ({ username, password }: User) => Promise<void>
  logout: () => void
}
