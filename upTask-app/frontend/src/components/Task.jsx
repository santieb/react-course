import formatDate from "../helpers/formatDate"

const Taks = ({ task }) => {
  const { name, description, deliveryDate, priority, status, id } = task

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500">{description}</p>
        <p className="mb-1 text-xl">{formatDate(deliveryDate)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {priority}</p>
      </div>
      <div className='flex gap-2'>
        <button className="bg-indigo-600 px-4 py-3 text-white text-sm rounded-lg uppercase font-bold">
          Editar
        </button>
        {status ? (
          <button className="bg-sky-600 px-4 py-3 text-white text-sm rounded-lg uppercase font-bold">
            Completa
          </button>
          ) : (
          <button className="bg-gray-600 px-4 py-3 text-white text-sm rounded-lg uppercase font-bold">
            Incompleta
          </button>
          )}
        <button className="bg-red-600 px-4 py-3 text-white text-sm rounded-lg uppercase font-bold">
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Taks