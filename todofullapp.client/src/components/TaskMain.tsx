import '@/styles/TaskMain.css'
import { useForm } from '@hooks/useForm'
import { useTasks } from '@hooks/useTasks'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { SVGProps, useEffect, useState } from 'react'
import TaskMainHeader from './TaskMainHeader'
import { CreateTaskModal } from './CreateTaskModal'

export default function TaskMain() {
  const {
    handleDeleteMany,
    handleDeleteOne,
    select,
    selected,
    tasks,
    handleCreateTask,
    handleToggleComplete,
    handleEditCategoria,
    handleEditTitulo
  } = useTasks()
  const [showModal, setShowModal] = useState(false)
  const handleToggleModal = () => {
    setShowModal((e) => !e)
  }
  const {
    titulo,
    categoria,
    onInputChange,
    onResetForm,
    form: task
  } = useForm({
    titulo: '',
    categoria: ''
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleCreateTask(task)
    handleToggleModal()
    onResetForm(e)
  }
  const handleCancelCreate = (e: React.FormEvent<HTMLButtonElement>) => {
    onResetForm(e)
    handleToggleModal()
  }

  const columns: GridColDef[] = [
    {
      field: 'completada',
      type: 'actions',
      headerName: 'Completada',
      getActions: (params) => [
        <GridActionsCellItem
          icon={params.row.completada ? <Check color='green' /> : <PhXCircle color='red'/>}
          onClick={() => handleToggleComplete(params.id.toString())}
          label='delete'
        />
      ]
    },
    {
      field: 'categoria',
      headerName: 'Categoria',
      editable: true,
      width: 150
    },
    {
      field: 'titulo',
      headerName: 'Titulo',
      editable: true,
      flex: 1
    },

    {
      field: 'delete',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          className='deleteOne bg-red-500 hover:text-red-700 text-white rounded-md'
          icon={<IconoirTrash />}
          onClick={() => handleDeleteOne(params.id.toString())}
          label='delete'
        />
      ]
    }
  ]

  useEffect(() => {
    const toggle = ({ target }: MouseEvent) => {
      if (showModal === true && document.querySelector('.modal') === target)
        handleToggleModal()
    }
    if (showModal)
      document.querySelector<HTMLInputElement>('form input')?.focus()
    document.addEventListener('click', toggle)

    return () => {
      document.removeEventListener('click', toggle)
    }
  }, [showModal])

  return (
    <main className='bg-gray-100 min-h-screen flex flex-col justify-center py-10 px-24'>
      <TaskMainHeader
        handleDeleteMany={handleDeleteMany}
        selected={selected}
        onToggleModal={handleToggleModal}
      />
      <DataGrid
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
        rows={tasks}
        columns={columns}
        sx={{
          width: '100%',
          margin: 'auto',
          transition: 'all 1s ease'
        }}
        processRowUpdate={(newRow, oldRow) => {
          if (newRow.categoria !== oldRow.categoria) {
            const { id, categoria } = newRow
            handleEditCategoria({ id, categoria })
          } else {
            const { id, titulo } = newRow
            handleEditTitulo({ id, titulo })
          }
          return newRow
        }}
        onProcessRowUpdateError={(error) => {
          console.log(error)
        }}
        onRowSelectionModelChange={(rowSelectionModel) => {
          select(rowSelectionModel)
        }}
      />

      <CreateTaskModal
        showModal={showModal}
        handleSubmit={handleSubmit}
        handleCancelCreate={handleCancelCreate}
        onInputChange={onInputChange}
        titulo={titulo}
        categoria={categoria}
      />
    </main>
  )
}

function IconoirTrash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20px'
      height='20px'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75'
      />
    </svg>
  )
}
function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.25rem'
      height='1rem'
      viewBox='0 0 1600 1280'
      {...props}
    >
      <path
        fill='currentColor'
        d='M1575 310q0 40-28 68l-724 724l-136 136q-28 28-68 28t-68-28l-136-136L53 740q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295l656-657q28-28 68-28t68 28l136 136q28 28 28 68'
      />
    </svg>
  )
}
function PhXCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.25rem'
      height='1.25rem'
      viewBox='0 0 256 256'
      {...props}
    >
      <path
        fill='currentColor'
        d='M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88'
      />
    </svg>
  )
}
