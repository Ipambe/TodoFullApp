import {
  deleteMany,
  deleteOne,
  getTasks,
  createTask,
  toggleComplete,
  updateTitulo,
  updateCategoria
} from '@helpers/task'
import { CreateTask } from '@models/CreateTask.model'
import { Tasks } from '@models/Tasks.model'
import { UpdateCategoria } from '@models/UpdateCategoria.model'
import { UpdateTitulo } from '@models/UpdateTitulo.model'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Tasks>([])
  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const select = (ids: GridRowSelectionModel) => {
    setSelected(ids)
  }

  const getData = async () => {
    const tasks = await getTasks()
    setTasks(tasks)
  }

  const handleCreateTask = async (task: CreateTask) => {
    try {
      await createTask(task)
      await getData()
    } catch {
      console.log('Ocurrio un error al crear una task')
    }

    getData()
  }

  const handleDeleteOne = async (id: string) => {
    try {
      await deleteOne(id)
      await getData()
    } catch {
      console.log('Ocurrio un error al eliminar una task')
    }
  }

  const handleDeleteMany = async () => {
    try {
      await deleteMany(selected.map((e) => e.toString()))
      await getData()
    } catch {
      console.log('Ocurrio un error al eliminar multiples tareas')
    }
  }
  const handleToggleComplete = async (id: string) => {
    await toggleComplete(id)
    getData()
  }

  const handleEditTitulo = async (newTitulo: UpdateTitulo) => {
    await updateTitulo(newTitulo)
    getData()
  }

  const handleEditCategoria = async (newCategoria: UpdateCategoria) => {
    console.log(newCategoria)
    await updateCategoria(newCategoria)
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    handleCreateTask,
    handleDeleteMany,
    handleDeleteOne,
    select,
    selected: selected.length,
    tasks,
    handleToggleComplete,
    handleEditTitulo,
    handleEditCategoria
  }
}
