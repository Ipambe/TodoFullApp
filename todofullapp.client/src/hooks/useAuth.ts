// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { succesfulRequest } from '../helpers/succesfulRequest'
// function useAuth() {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
//   useEffect(() => {

import { useContext } from "react";
import { AuthContextType } from "../types";
import { AuthContext } from "../Context/AuthContext";

//     const checkAuth = async () => {
//       try {
//         const res = await axios.get('auth/verify', {
//           withCredentials: true
//         })
//         if (succesfulRequest(res.status)) {
//           setIsAuthenticated(true)
//         } else {
//           setIsAuthenticated(false)
//         }
//       } catch (error) {
//         console.error('Error al verificar autenticación:', error)
//         setIsAuthenticated(false)
//       }
//     }

//     checkAuth()
//   }, [])
//   return isAuthenticated
// }

// export default useAuth

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
