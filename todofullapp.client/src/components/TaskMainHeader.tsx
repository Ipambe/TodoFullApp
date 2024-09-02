interface Props {
  selected: number
  handleDeleteMany: () => Promise<void>
  onToggleModal: () => void
}
export default function TaskMainHeader({
  selected,
  handleDeleteMany,
  onToggleModal
}: Props) {
  return (
    <div className='flex justify-between '>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>
        Task Main Component
      </h1>
      <span>
        <button
          className={`deleteMany bg-red-500 text-white px-4 py-2 rounded-md mr-2 ${
            selected > 0 ? 'active' : ''
          }`}
          onClick={() => handleDeleteMany()}
        >
          Delete {selected} {selected > 1 ? 'tasks' : 'task'}
        </button>
        <button
          onClick={onToggleModal}
          className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md'
        >
          Add task
        </button>
      </span>
    </div>
  )
}
