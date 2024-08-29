import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { type Tasks } from '../models/Tasks.model'

export default function AppRoutes() {
  const { logout } = useAuth()
  const [task, setTask] = useState<Tasks>([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get<Tasks>('task')
      setTask(data)
    }
    getData()
  }, [])

  return (
    <>
      <h1>AppRoutes</h1>
      <button onClick={logout.bind(null)}>Log out</button>
      {task.map((t) => (
        <div key={t.id}>
          <h2>{t.title}</h2>
          <p>{t.description}</p>
        </div>
      ))}
    </>
  )
}
