import { useState, useEffect, createContext} from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'
import io from 'socket.io-client'
import useAuth from '../hooks/useAuth'

let socket
const url = import.meta.env.VITE_BACKEND_URL.split('/api')[0]

const ProjectsContext = createContext()

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [alert, setAlert] = useState({})
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(false)
  const [modalTaskForm, setModalTaskForm] = useState(false)
  const [task, setTask] = useState({})
  const [modalDeleteTask, setModalDeleteTask] = useState(false)
  const [collaborator, setCollaborator] = useState({})
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false)
  const [searcher, setSearcher] = useState(false)

  const { auth } = useAuth()
  const navigate = useNavigate()

  const showAlert = alert => setAlert(alert)

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const url = '/projects'
        const { data } = await clientAxios(url, config)

        setProjects(data)
      } catch (err) {
        setAlert({ msg: err.response.data.msg, error: true })
      }
    } 
    getProjects()
  }, [auth])

  useEffect(() => {
    socket = io(url)
  }, [])

  const submitProject = async project => {
    if (project.id) return editProject(project)
    else newProject(project)
  }

  const newProject = async project => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const url = '/projects'
      const { data } = await clientAxios.post(url, project, config)

      setProjects([...projects, data.project])

      setAlert({ msg: 'Proyecto creado correctamente', error: false})

      setTimeout(() => {
        setAlert({})
        navigate('/projects')
      }, 2000)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const editProject = async project => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const url = `/projects/${project.id}`
      const { data } = await clientAxios.put(url, project, config)

      const projectsUpdated = projects.map(project => project._id === data._id ? data : project)

      setProjects(projectsUpdated)

      setAlert({ msg: 'Proyecto editado correctamente', error: false})

      setTimeout(() => {
        setAlert({})
        navigate('/projects')
      }, 2000)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const getProject = async id => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const url = `/projects/${id}`
      const { data } = await clientAxios(url, config)
      setProject(data)

      setTimeout(() => {
        setAlert({})
      }, 2000)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
      navigate('/projects')

      setTimeout(() => {
        setAlert({})
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const url = `/projects/${id}`
      const { data } = await clientAxios.delete(url, config)

      const projectsUpdated = projects.filter(project => project._id !== id)

      setProjects(projectsUpdated)

      setAlert({ msg: data.msg , error: false})

      setTimeout(() => {
        setAlert({})
        navigate('/projects')
      }, 2000)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const handleModalTask = () => {
    setModalTaskForm(!modalTaskForm)
    setTask('')
  }

  const submitTask = async task => {
    if (task?.id) await updateTask(task)
    else await createTask(task)
  }

  const createTask = async task => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const url = `/tasks`
      const { data } = await clientAxios.post(url, task , config)

      const projectUpdated = { ...project }
      projectUpdated.tasks = [...project.tasks, data]

      setProject(projectUpdated)
      setAlert({})
      handleModalTask()

      socket.emit('new task', data)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const updateTask = async task => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const url = `/tasks/${task.id}`
      const { data } = await clientAxios.put(url, task, config)

      setAlert({})
      handleModalTask()

      socket.emit('update task', data)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const handleModalUpdateTask = task => {
    setTask(task)
    setModalTaskForm(true)
  }

  const handleModalDeleteTask = task => {
    setTask(task)
    setModalDeleteTask(!modalDeleteTask)
  }

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const url = `/tasks/${task._id}`

      const { data } = await clientAxios.delete(url, config)
      setAlert({ msg: data, error: false })

      socket.emit('delete task', task)

      setModalDeleteTask(false)
      setTask({})
      setTimeout(() => {
        setAlert({})
      }, 3000)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const submitCollaborator = async email => {
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const url = '/projects/collaborators'
      const { data } = await clientAxios.post(url, { email }, config)

      setCollaborator(data.user)
      setAlert({})
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    } finally {
      setLoading(false)
    }
  }

  const addCollaborator = async email => {
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const url = `/projects/collaborators/${project._id}`
      const { data } = await clientAxios.post(url, { email }, config)

      setAlert({ msg: data.msg, error: false })
      setCollaborator({})

      setTimeout(() => {
        setAlert({})
      }, 1500)

    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
      setTimeout(() => {
        setAlert({})
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleModalDeleteCollaborator = collaborator => {
    setModalDeleteCollaborator(!modalDeleteCollaborator)
    setCollaborator(collaborator)
  }

  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const url = `/projects/collaborators/${project._id}/${collaborator._id}`
      const { data } = await clientAxios.delete(url, config)

      const projectUpdated = { ...project }
      projectUpdated.collaborators = projectUpdated.collaborators.filter(temporalCollaborator => temporalCollaborator._id !== collaborator._id)

      setProject(projectUpdated)

      setAlert({ msg: data.msg, error: false })
      setCollaborator({})
      setModalDeleteCollaborator(false)

      setTimeout(() => {
        setAlert({})
      }, 2000)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
      setTimeout(() => {
        setAlert({})
      }, 2000)
    }
  }

  const completeTask = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const url = `/tasks/status/${id}`
      const { data } = await clientAxios.post(url,{} , config)

      setAlert({})
      setTask({})

      socket.emit('update state', data)
      setTimeout(() => {
        setAlert({})
      }, 2000)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
      setTimeout(() => {
        setAlert({})
      }, 2000)
    }
  }

  const handleSearcher = () => setSearcher(!searcher)

  const submitTasksProject = task => {
    const projectUpdated = { ...project }
    projectUpdated.tasks = [...projectUpdated.tasks, task]

    setProject(projectUpdated)
  }

  const updateTaskProject = task => {
    const projectUpdated = { ...project }
    projectUpdated.tasks = projectUpdated.tasks.map(temporalTask => temporalTask._id === task._id ? task : temporalTask)

    setProject(projectUpdated)
  }

  const deleteTaskProject = task => {
    const projectUpdated = { ...project }
    projectUpdated.tasks = projectUpdated.tasks.filter(temporalTask => task._id !== temporalTask._id)

    setProject(projectUpdated)
  }

  const updateProjectState = task => {
    const projectUpdated = { ...project }
    projectUpdated.tasks = projectUpdated.tasks.map(temporalTask => temporalTask._id === task._id ? task : temporalTask)
  
    setProject(projectUpdated)
  }

  const signOutProjects = () => {
    setProjects([])
    setProject({})
    setAlert({})
  }

  return (
    <ProjectsContext.Provider 
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        handleModalTask,
        modalTaskForm,
        submitTask,
        handleModalUpdateTask,
        task,
        modalDeleteTask,
        handleModalDeleteTask,
        deleteTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        modalDeleteCollaborator,
        handleModalDeleteCollaborator,
        deleteCollaborator,
        completeTask,
        searcher,
        handleSearcher,
        submitTasksProject,
        deleteTaskProject,
        updateTaskProject,
        updateProjectState,
        signOutProjects
      }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export { ProjectsProvider }

export default ProjectsContext