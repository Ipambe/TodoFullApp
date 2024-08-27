interface User {
  username: string,
  password: string
}

interface AuthContextType {
  isAuthenticated: boolean | null;
  login: ({username, password}: User) => Promise<void>;
  logout: () => void;
}
export type { User, AuthContextType }