import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { form, username, password, onInputChange } = useForm({
    username: '',
    password: ''
  })
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navigate('/home', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(form)
      navigate('/home', { replace: true })
    } catch (error) {
      console.error('Error en el login:', error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name='username'
          placeholder='Nombre de usuario'
          type='text'
          value={username}
          onChange={onInputChange}
        />
        <input
          name='password'
          placeholder='Contraseña'
          type='text'
          value={password}
          onChange={onInputChange}
        />
        <button>Iniciar sesion</button>
      </form>
    </>
  )
}
