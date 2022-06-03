import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import ModalTaskForm from  '../components/ModalTaskForm'
import Task from '../components/Task'

const Project = () => {
  const [modal, setModal] = useState(false)

  const params = useParams()

  const { getProject, project, loading, handleModalTask } = useProjects()

  useEffect(() => {
    getProject(params.id)
  }, [])

  const { name } = project

  return (
    loading ? 'cargando' : (
      <>
        <div className="flex justify-between">
          <h1 className="font-black text-4xl">{name}</h1>

          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <Link to={`/projects/edit/${params.id}`} className="uppercase font-bold">
              Editar
            </Link>
          </div>
        </div>
        <button onClick={handleModalTask} type="button" className='items-center justify-center flex gap-2 mt-5 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Nueva Tarea
        </button>

        <p className='font-bold text-xl mt-10'> Tareas del Proyecto</p>
        <div className='rounded-lg bg-white mt-10'>
          {project.tasks?.length ?
            project.tasks?.map(task => <Task key={task._id} task={task}></Task>)
            : <p className='text-center sm-5 p-10'>No hay tareas en este proyecto</p>}
        </div>

        <ModalTaskForm modal={modal} setModal={setModal}/>
      </>
    )
  )
}

export default Project