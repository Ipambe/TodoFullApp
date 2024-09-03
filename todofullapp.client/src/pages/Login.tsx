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
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(form)
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Error en el login:', error)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md w-1/2 mx-auto mt-10'
      >
        <label className='w-full'>
          <span className='block text-sm font-medium text-gray-700 mb-1'>
            Nombre de usuario
          </span>
          <input
            name='username'
            type='text'
            value={username}
            onChange={onInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
        <label className='w-full'>
          <span className='block text-sm font-medium text-gray-700 mb-1'>
            Contraseña
          </span>
          <input
            name='password'
            type='password'
            value={password}
            onChange={onInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
        <button className='w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300'>
          Iniciar sesión
        </button>
      </form>
    </>
  )
}
