import { useState, useEffect, createContext} from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'

const ProjectsContext = createContext()

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [alert, setAlert] = useState({})
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(false)
  const [modalTaskForm, setModalTaskForm] = useState(false)

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
    } catch (err) {
      console.log(err)
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

  const handleModalTask = () => setModalTaskForm(!modalTaskForm)

  const submitTask = async task => {
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
      const { data } = await clientAxios.post(url,task , config)

      const projectUpdated = { ...project }
      projectUpdated.tasks = [...project.tasks, data]
      setProject(projectUpdated)
      setAlert({})
      handleModalTask()

    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
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
        submitTask
      }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export { ProjectsProvider }

export default ProjectsContext