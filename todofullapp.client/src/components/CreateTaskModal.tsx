interface Props {
  showModal: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleCancelCreate: (e: React.FormEvent<HTMLButtonElement>) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  titulo: string
  categoria: string
}
export const CreateTaskModal = ({
  showModal,
  handleSubmit,
  handleCancelCreate,
  onInputChange,
  titulo,
  categoria
}: Props) => {
  return (
    <div
      className={`modal flex items-center justify-center fixed bg-[#0000003c] z-10 w-[100%] h-[100vh] inset-0 m-auto p-10 ${
        showModal ? 'show' : ''
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center gap-y-4 bg-white px-16 p-8 rounded-2xl opacity-100 w-[50vw]`}
      >
        <label className='w-full'>
          <span className='opacity-70'>Titulo</span>
          <input
            value={titulo}
            name='titulo'
            onChange={onInputChange}
            placeholder='Create a new react proyect....'
            type='text'
            className='border outline-none focus:border-blue-600 transition-all rounded-lg py-2 px-4 w-full'
          />
        </label>
        <label className='w-full'>
          <span className='opacity-70'>Categoria</span>
          <input
            value={categoria}
            name='categoria'
            onChange={onInputChange}
            placeholder='Programming'
            type='text'
            className='border outline-none focus:border-blue-600 transition-all rounded-lg py-2 px-4 w-full'
          />
        </label>
        <span className='flex justify-between w-full'>
          <button
            type='button'
            onClick={handleCancelCreate}
            className='py-4 px-8 bg-red-400 hover:bg-red-600 transition-all rounded-2xl'
          >
            Cancel
          </button>
          <button className='py-4 px-8 bg-green-400 hover:bg-green-600 transition-all rounded-2xl'>
            Add new task
          </button>
        </span>
      </form>
    </div>
  )
}
