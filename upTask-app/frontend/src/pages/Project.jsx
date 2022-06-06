import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import useAdmin from '../hooks/useAdmin'
import ModalTaskForm from  '../components/ModalTaskForm'
import ModalDeleteTask from  '../components/ModalDeleteTask'
import ModalDeleteCollaborator from  '../components/ModalDeleteCollaborator'
import Task from '../components/Task'
import Collaborator from '../components/Collaborator'
import io from 'socket.io-client'

let socket
const url = import.meta.env.VITE_BACKEND_URL.split('/api')[0]

const Project = () => {
  const params = useParams()

  const { getProject, project, loading, handleModalTask, submitTasksProject, deleteTaskProject, updateTaskProject, updateProjectState } = useProjects()

  const isAdmin = useAdmin()

  useEffect(() => {
    getProject(params.id)
  }, [])

  useEffect(() => {
    socket = io(url)
    socket.emit('open project', params.id)
  }, [])
  
  useEffect(() => {
    socket.on('task added', newTask => {
      if (newTask.project === project._id) submitTasksProject(newTask)
    })

    socket.on('task updated', taskUpdated => {
      if (taskUpdated.project._id === project._id) {
        updateTaskProject(taskUpdated)
      }
    })

    socket.on('task deleted', taskDeleted => {
      if (taskDeleted.project === project._id) {
        deleteTaskProject(taskDeleted)
      }
    })

    socket.on('state updated', newTaskState => {
      if (newTaskState.project._id === project._id) {
        updateProjectState(newTaskState)
      }
    })
  })

  const { name } = project

  if (loading) return 'cargando...'

  return (
      <>
        <div className="flex justify-between">
          <h1 className="font-black text-4xl">{name}</h1>

          {isAdmin && (
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <Link to={`/projects/edit/${params.id}`} className="uppercase font-bold">
                Editar
              </Link>
            </div>
          )}
        </div>
      
        {isAdmin && (
          <button onClick={handleModalTask} type="button" className='items-center justify-center flex gap-2 mt-5 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Nueva Tarea
          </button>
        )}

        <p className='font-bold text-xl mt-10'> Tareas del Proyecto</p>

        <div className='rounded-lg bg-white mt-10'>
          {project.tasks?.length ?
            project.tasks?.map(task => <Task key={task._id} task={task}/>)
            : <p className='text-center sm-5 p-10'>No hay tareas en este proyecto</p>}
        </div>

        {isAdmin && (
          <>
            <div className='flex item-center justify-between mt-10'>
              <p className='font-bold text-xl'> Colaboradores</p>
              <Link to={`/projects/new-collaborator/${project._id}`}
                className='text-gray-400 hover:text-black uppercase font-bold'>
                Añadir
            </Link>
            </div>
          
            <div className='rounded-lg bg-white mt-10'>
              {project.collaborators?.length ?
                project.collaborators?.map(collaborator => <Collaborator key={collaborator._id} collaborator={collaborator}/>)
                : <p className='text-center sm-5 p-10'>No Colaboradores en este proyecto</p>}
            </div>
          </>
        )}

        <ModalTaskForm/>
        <ModalDeleteTask/>
        <ModalDeleteCollaborator/>
      </>
  )
}

export default Project