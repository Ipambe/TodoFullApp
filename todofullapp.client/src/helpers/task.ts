import { CreateTask } from '@models/CreateTask.model'
import { Tasks } from '@models/Tasks.model'
import axios from 'axios'
import { axiosRequestConfig } from './auth'
import { UpdateTitulo } from '@models/UpdateTitulo.model'
import { succesfulRequest } from './succesfulRequest'
import { UpdateCategoria } from '@models/UpdateCategoria.model'

const getTasks = async () => {
  const { data } = await axios.get<Tasks>('task', axiosRequestConfig)
  return data
}

const createTask = async (task: CreateTask) => {
  const res = await axios.post('task', task, axiosRequestConfig)
  return succesfulRequest(res)
}

const updateTitulo = async ({ id, titulo }: UpdateTitulo) => {
  const res = await axios.put(
    `task/titulo/${id}`,
    { payload: titulo },
    axiosRequestConfig
  )
  return succesfulRequest(res)
}

const updateCategoria = async ({ id, categoria }: UpdateCategoria) => {
  const res = await axios.put(
    `task/categoria/${id}`,
    { payload: categoria },
    axiosRequestConfig
  )
  return succesfulRequest(res)
}

const toggleComplete = async (id: string) => {
  const res = await axios.put(`task/complete/${id}`, null, axiosRequestConfig)
  return succesfulRequest(res)
}

const deleteOne = async (id: string) => {
  const res = await axios.delete(`task/${id}`, axiosRequestConfig)
  return succesfulRequest(res)
}

const deleteMany = async (ids: string[]) => {
  const res = await axios.delete('task', {
    ...axiosRequestConfig,
    data: ids
  })
  return succesfulRequest(res)
}

export {
  getTasks,
  createTask,
  updateTitulo,
  updateCategoria,
  toggleComplete,
  deleteOne,
  deleteMany
}
