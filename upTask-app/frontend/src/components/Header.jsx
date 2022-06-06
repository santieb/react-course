import { Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Searcher from './Searcher'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const { handleSearcher, signOutProjects } = useProjects()
  const { signOutAuth} = useAuth()

  const handleSignOut = () => {
    signOutAuth()
    signOutProjects()

    localStorage.removeItem('token')
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button 
            onClick={() => handleSearcher()} 
            type="button" 
            className="font-bold uppercase">
            Buscar Proyecto
          </button>

          <Link to="/projects" className="font-bold uppercase">
              Proyectos
          </Link>
          <button onClick={() => handleSignOut()}type="button" className="text-white text-s, bg-sky-600 p-3 rounded-md uppercase font-bold">
            Cerrar sesion
          </button>
          <Searcher/>
        </div>
      </div>
    </header>
  )
}

export default Header