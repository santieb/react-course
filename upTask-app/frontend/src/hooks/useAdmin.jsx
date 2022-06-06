import useProjects from '../hooks/useProjects'
import useAuth from '../hooks/useAuth'

const useAdmin = () => {
  const { project } = useProjects()
  const { auth } = useAuth()

  return project.creator === auth.user._id
}

export default useAdmin