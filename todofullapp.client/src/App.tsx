import { useState } from 'react'
import axios from 'axios'
import './App.css'

interface Task {
  id: string
  titulo: string
  categoria: string
  completada: boolean
  usuarioId: string
}

type Tasks = Task[]

function App() {
  const [tasks, setTasks] = useState<Tasks>([])

  const logear = async () => {
    await axios.post('access/login', {
      username: 'b',
      password: 'b'
    })
  }
  const cargar = async () => {
    const { data } = await axios.get<Tasks>('api/task', {
      withCredentials: true
    })
    setTasks(data)
  }

  const crearRandom = async () => {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const tarea = {
      titulo: '',
      categoria: ''
    }
    const randomNumber = Math.floor(Math.random() * 100)
    for (let i = 0; i < randomNumber; i++) {
      const indiceAleatorio1 = Math.floor(Math.random() * caracteres.length)
      const indiceAleatorio2 = Math.floor(Math.random() * caracteres.length)
      tarea.titulo += caracteres.charAt(indiceAleatorio1)
      tarea.categoria += caracteres.charAt(indiceAleatorio2)
    }
    // console.log(randomNumber)
    // console.log(tarea)
    await axios.post('api/task', tarea)
    await cargar()
  }

  const borrar = async (id: string) => {
    await axios.delete(`api/task/${id}`)
  }

  const articleClick = async (id: string) => {
    await borrar(id)
    await cargar()
  }

  const borrarTodo = async () => {
    await axios.delete('api/task', {
      data: tasks.map(e => e.id)
    })
    await cargar()
  }
  console.log(document.cookie)
  return (
    <>
      <button onClick={logear.bind(null)}>Logear</button>
      <button onClick={crearRandom.bind(null)}>Crear random</button>
      <button onClick={borrarTodo.bind(null)}>Borrar todas</button>
      {tasks.map((e) => (
        <article key={e.id} onClick={articleClick.bind(null, e.id)}>
          <h1>{e.titulo}</h1>
          <h2>{e.categoria}</h2>
        </article>
      ))}
    </>
  )
}

export default App
