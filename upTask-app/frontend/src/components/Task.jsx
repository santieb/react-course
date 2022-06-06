import formatDate from "../helpers/formatDate"
import useProjects from '../hooks/useProjects.jsx'
import useAdmin from '../hooks/useAdmin'

const Task = ({ task }) => {
  const { name, description, deliveryDate, priority, status, _id, completed } = task

  const { handleModalUpdateTask, handleModalDeleteTask, completeTask } = useProjects()
  const isAdmin = useAdmin()

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500">{description}</p>
        <p className="mb-1 text-xl">{formatDate(deliveryDate)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {priority}</p>
        {status && <p className="text-xs uppercase bg-green-600 p-2 rounded-lg text-white">Completado por: {completed.name} </p>}
      </div>

      <div className='flex flex-col lg:flex-row gap-2'>
      {isAdmin && (
        <button onClick={() => handleModalUpdateTask(task)} className="bg-indigo-600 px-4 py-3 text-white text-sm rounded-lg uppercase font-bold">
          Editar
        </button>
      )}
      <button onClick={() => completeTask(_id)} className={`${status ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white text-sm rounded-lg uppercase font-bold`}>
        {status ? 'Completa' : 'Incompleta'}
      </button>

        {isAdmin && (
          <button onClick={() => handleModalDeleteTask(task)} className="bg-red-600 px-4 py-3 text-white text-sm rounded-lg uppercase font-bold">
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default Task